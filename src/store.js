import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {Stitch, RemoteMongoClient, AnonymousCredential} from 'mongodb-stitch-browser-sdk'

const client = Stitch.initializeDefaultAppClient('trivia-uleiu')
const mongodb = client.getServiceClient(RemoteMongoClient.factory, "maurodev-trivia")
const db = mongodb.db("trivia")

client.auth.loginWithCredential(new AnonymousCredential()).catch(err => {console.log(err)})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    profiles: [],
    activeProfile: null,
    categories: [],
    activeCategory: null,
    activeQuestion: null,
    token: ''
  },
  mutations: {
    setProFiles (state, profiles) {
      state.profiles.push(...profiles)
    },
    newProfile (state, profile) {
      state.profiles.push(profile)
    },
    setActiveProfile (state, profile) {
      state.activeProfile = profile
    },
    setCategories (state, categories) {
      state.categories = categories
    },
    setActiveCategory (state, category) {
      state.activeCategory = category
    },
    setApiToken (state, token) {
      state.token = token
    },
    setQuestion (state, question) {
      state.activeQuestion = question
    },
    setNewAnswer(state, answer) {
      if (state.activeProfile.result.hasOwnProperty(state.activeCategory.id)) {
        state.activeProfile.result[state.activeCategory.id].push(answer)
      } else {
        Vue.set(state.activeProfile.result, state.activeCategory.id, [answer])
      }
    }
  },
  actions: {
    loadProfiles ({commit}) {
      console.log('loading profiles')
      return db.collection("profile").find().toArray().then(profiles => {
        commit('setProFiles', profiles)
      })
    },
    newProfile ({commit}, name) {
      const profile = {
        owner_id: client.auth.user.id,
        name: name,
        result: {}
      }
      return db.collection("profile").insertOne(profile).then(() => {
        commit('newProfile', profile)
      })
    },
    selectProfile ({commit}, profile) {
      return new Promise(resolve => {
        commit('setActiveProfile', profile)
        resolve()
      })
    },
    loadCategories ({commit}) {
      return axios.get('https://opentdb.com/api_category.php').then(res => {
        if (res.data.response_code === 0) {
          localStorage.setItem('categories', JSON.stringify(res.data.trivia_categories))
          commit('setCategories', res.data.trivia_categories)
        }
      })
    },
    selectCategory ({commit, dispatch}, {category, fetchQuestion}) {
      commit('setActiveCategory', category)
      if (fetchQuestion) {
        return dispatch('loadQuestion', 'medium')
      }
    },
    retriveApiToken({commit}) {
      console.log('loading API session token')
      return axios.get('https://opentdb.com/api_token.php?command=request').then(res => {
        if (res.data.response_code === 0) {
          commit('setApiToken', res.data.token)
        }
      })
    },
    loadQuestion ({commit, state}, difficulty) {
      console.log('loading question ['+state.activeCategory.name+'] ['+difficulty+']')
      return axios.get(`https://opentdb.com/api.php?type=multiple&amount=1&token=${state.token}&category=${state.activeCategory.id}&difficulty=${difficulty}`).then(res => {
        if (res.data.response_code === 0) {
          commit('setQuestion', res.data.results[0])
        }
      })
    },
    sendAnswer ({commit, state}, answer) {
      let updateObj = {'$push': {}}
      updateObj['$push']['result.' + state.activeCategory.id] = answer
      return db.collection("profile").updateOne(
        { _id: state.activeProfile._id },
        updateObj
      ).then(() => {
        commit('setNewAnswer', answer)
      })
    }
  }
})

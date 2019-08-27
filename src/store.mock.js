import Vue from 'vue'
import Vuex from 'vuex'

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
    connectToDb () {
      return new Promise(resolve => {resolve()})
    },
    loadProfiles ({commit}) {
      return new Promise(resolve => {
        commit('setProFiles', [{
          name: "Perfil 1",
          result: {}
        }, {
          name: "Perfil 2",
          result: {}
        }, {
          name: "Perfil 3",
          result: {}
        }])
        resolve()
      })
    },
    newProfile ({commit}, name) {
      return new Promise(resolve => {
        commit('newProfile', {
          name: name,
          result: {}
        })
        resolve()
      })
    },
    selectProfile ({commit}, profile) {
      return new Promise(resolve => {
        commit('setActiveProfile', profile)
        resolve()
      })
    },
    loadCategories ({commit}) {
      return new Promise(resolve => {
        commit('setCategories', [{
          id: 1,
          name: "Category 1"
        }, {
          id: 2,
          name: "Category 2"
        }, {
          id: 3,
          name: "Category 3"
        }, {
          id: 4,
          name: "Category 4"
        }, {
          id: 5,
          name: "Category 5"
        }])
        resolve()
      })
    },
    selectCategory ({commit, dispatch}, {category, fetchQuestion}) {
      commit('setActiveCategory', category)
      if (fetchQuestion) {
        return dispatch('loadQuestion', 'medium')
      }
    },
    retriveApiToken() {
      return new Promise(resolve => {resolve()})
    },
    loadQuestion ({commit, state}, difficulty) {
      return new Promise(resolve => {
        commit('setQuestion', {
          "category": state.activeCategory.name,
          "difficulty": difficulty,
          "type": "multiple",
          "question": "Question Text?",
          "correct_answer": "Correct",
          "incorrect_answers": ["Wrong 1", "Wrong 2", "Wrong 3"]
        })
        resolve()
      })
    },
    sendAnswer ({commit}, answer) {
      new Promise(resolve => {
        commit('setNewAnswer', answer)
        resolve()
      })
    }
  }
})

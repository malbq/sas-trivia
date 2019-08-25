<template>
  <div id="app">
    <header class="app-header">
      <h1>
        Teste Dev Frontend
      </h1>
    </header>
    <transition>
      <component :is="view" class="content" @goto="changeView">
      </component>
    </transition>
  </div>
</template>

<script>
import Profiles from '@/components/Profiles.vue'
import Categories from '@/components/Categories.vue'
import Question from '@/components/Question.vue'
import Result from '@/components/Result.vue'
export default {
  name: 'app',
  components: {
    Profiles,
    Categories,
    Question,
    Result
  },
  data () {
    return {
      view: ''
    }
  },
  created () {
    this.$store.dispatch('connectToDb').then(() => {
      this.$store.dispatch('loadCategories')
      this.$store.dispatch('retriveApiToken')
      this.$store.dispatch('loadProfiles').then(() => {
        this.view = 'profiles'
      })
    }).catch(err => {console.log(err)})
  },
  methods: {
    changeView (name) {
      this.view = name
    }
  }
}
</script>

<style lang="scss">
@import "./assets/style.scss";
</style>

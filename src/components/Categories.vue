<template>
  <div class="categories">
    <header>
      <h2>Categories</h2>
    </header>
    <ul class="categories-list grid">
      <li v-for="category in categories" :key="category.id">
        <div class="category box" @click="selectCategory(category)"><span v-html="category.name"></span></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      categories: 'categories',
      profile: 'activeProfile'
    })
  },
  methods: {
    selectCategory (category) {
      var completed = this.profile.result.hasOwnProperty(category.id) && this.profile.result[category.id].length === 10
      this.$store.dispatch('selectCategory', {category: category, fetchQuestion: !completed}).then(() => {
        if (completed) {
          this.$emit('goto', 'result')
        } else {
          this.$emit('goto', 'question')
        }
      })
    }
  }
}
</script>

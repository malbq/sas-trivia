<template>
  <div class="profiles">
    <header>
      <h2>Who are you?</h2>
    </header>
    <ul class="profiles-list grid">
      <li v-for="profile in profiles" :key="profile.id">
        <div class="profile box" @click="selectProfile(profile)" v-html="profile.name"></div>
      </li>
      <li @click="createNewProfile = true; $refs.newProfileName.focus()">
        <div class="profile profile-new box">+</div>
      </li>
    </ul>
    <transition>
      <lightbox classes="profiles-new-form" v-show="createNewProfile" @clickOutside="createNewProfile = false">
        <form @submit.prevent="newProfile">
          <input ref="newProfileName" type="text" v-model="newProfileName" placeholder="Type your name" autofocus />
        </form>
      </lightbox>
    </transition>
  </div>
</template>

<script>
import Lightbox from "@/components/Lightbox"
export default {
  components: {
    Lightbox
  },
  data () {
    return {
      createNewProfile: false,
      newProfileName: ''
    }
  },
  computed: {
    profiles () {
      return this.$store.state.profiles
    }
  },
  created () {
    window.addEventListener('keydown', e => {
      if (this.createNewProfile && e.key == 'Escape') {
        this.createNewProfile = false
      }
    })
  },
  methods: {
    newProfile () {
      this.$store.dispatch('newProfile', this.newProfileName).then(() => {
        this.createNewProfile = false
      })
    },
    selectProfile (profile) {
      this.$store.dispatch('selectProfile', profile).then(() => {
        this.$emit('goto', 'categories')
      })
    }
  }
}
</script>
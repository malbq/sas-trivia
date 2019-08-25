<template>
  <div class="lightbox">
      <div class="lightbox-overlay" @click="$emit('clickOutside')"></div>
      <div class="lightbox-content" :class="classes">
        <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    classes: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.lightbox {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  
}
.lightbox-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5)
}
.lightbox-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 1em;
  box-shadow: 0px 3px 6px rgba(52, 60, 88, 0.4);
  border-radius: 8px;
}
</style>
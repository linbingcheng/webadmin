<template>
  <div class="navicon">
    <i class="fa fa-bars fa-2x" :class="{'fa-rotate-90':isCollapse}"  @click="toggleClick"></i>
  </div>
</template>

<script>
export default {
  name: 'hamBurger',
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleClick() {
      this.$store.commit('TOGGLE_SIDEBAR');
    },
  },
};
</script>

<style lang="scss"  scoped>

</style>

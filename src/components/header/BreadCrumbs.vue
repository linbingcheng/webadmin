<template>
  <div class="bread-crumbs" >
    <el-breadcrumb separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          v-for="item in levelList"
          :key="item.title">
        <span v-if="item.redirect==='noredirect'" class="no-redirect">
          {{item.title}}
        </span>
          <router-link v-else :to="item.path">{{item.title}}</router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'breadCrumbs',
  props: {
    levelList: Array,
  },
};
</script>

<style lang="scss"  scoped>

</style>

<template>
  <div class="shrinkable-menu">
    <slot name="top"></slot>
    <el-menu default-active="1" active="$route.path" :collapse="isCollapse"
             :router="true"
             background-color="#304156"
             text-color="#fff"
             active-text-color="#409EFF">
      <template v-for="item in menuList" >
        <el-submenu v-if="item.children.length >= 1"
                    :key="'menuitem' +item.index"
                    :index="item.name">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </template>
          <el-menu-item-group v-for="child in item.children" :key="child.index">
            <el-menu-item  :index="child.name">{{ child.title }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-if="item.children.length < 1"
                      :key="'menuitem' +item.index"
                      :index="item.name">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: 'shrinkableMenu',
  components: {},
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
    menuList: {
      type: Array,
      required: true,
    },
    defaultOptions: {
      type: Array,
    },
    beforePush: {
      type: Function,
    },
  },
};
</script>
<style lang="scss" scoped>

</style>

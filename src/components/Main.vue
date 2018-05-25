<template>
  <!-- 64px 是 element-ui 的左侧菜单 collapse 时定的 -->
  <div class="main" :class="{'main-hide-text': isCollapse}">
      <div class="sidebar-menu"
           :style="{width: isCollapse?'64px':'200px', overflow: isCollapse ? 'visible' : 'auto'}">
        <shrinkable-menu :menuList="menuList" :isCollapse="isCollapse">
          <div slot="top" class="logo">
            <img v-show="!isCollapse"  src="../assets/images/logo.jpg" class="max-logo"/>
            <img v-show="isCollapse" src="../assets/images/logo-min.jpg" class="min-logo"/>
          </div>
        </shrinkable-menu>
      </div>
      <div class="header" :style="{paddingLeft: isCollapse?'64px':'200px'}">
        <div class="main-header">
          <hamBurger :isCollapse="isCollapse"></hamBurger>
          <breadCrumbs :levelList="levelList"></breadCrumbs>
          <toolMenu :messages="messages"></toolMenu>
          <userCol :name="name" :avatarPath="avatarPath"></userCol>
        </div>
        <tagBar :tags="tagsList"></tagBar>
      </div>
      <div class="page-content"
           @DOMMouseScroll="handleScroll"
           @mousewheel="handleScroll"
           ref="scrollCon"
           :style="{left: isCollapse?'64px':'200px'}">
        <div class="single-page" ref="scrollBody" :style="{top: pageBodyTop + 'px'}">
          <router-view></router-view>
        </div>
      </div>
  </div>
</template>
<script>
import shrinkableMenu from './menu/ShrinkableMenu';
import hamBurger from './header/HamBurger';
import breadCrumbs from './header/BreadCrumbs';
import toolMenu from './header/ToolMenu';
import userCol from './header/UserCol';
import tagBar from './header/TagBar';


export default{
  name: 'Main',
  components: {
    shrinkableMenu,
    hamBurger,
    breadCrumbs,
    toolMenu,
    userCol,
    tagBar,
  },
  computed: {
    menuList() {
      return this.$store.state.app.menuList;
    },
    isCollapse() {
      return this.$store.state.app.isCollapse;
    },
    levelList() {
      return this.$store.state.app.levelList;
    },
    tagsList() {
      return this.$store.state.app.tagsList;
    },
    name() {
      return this.$store.state.user.name;
    },
    avatarPath() {
      return this.$store.state.user.avatar;
    },
    messages() {
      return this.$store.state.user.messages;
    },
    bgColor() {
      return this.theme === 'dark' ? '#304156' : '#fff';
    },
    shrinkIconColor() {
      return this.theme === 'dark' ? '#fff' : '#304156';
    },
  },
  methods: {
    handleScroll(event) {
      const type = event.type;
      let delta = 0;
      let top = -10;
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = (event.wheelDelta) ? event.wheelDelta : -(event.detail || 0) * 40;
      }
      if (delta > 0) {
        top = Math.min(0, this.pageBodyTop + delta);
      } else if (this.$refs.scrollCon.offsetHeight - 100 < this.$refs.scrollBody.offsetHeight) {
        if (this.pageBodyTop <
          -((this.$refs.scrollBody.offsetHeight - this.$refs.scrollCon.offsetHeight) + 100)) {
          top = this.pageBodyTop;
        } else {
          top = Math.max(this.pageBodyTop + delta, this.$refs.scrollCon.offsetHeight
            - this.$refs.scrollBody.offsetHeight);
        }
      } else {
        this.pageBodyTop = -10;
      }
      this.pageBodyTop = top;
    },
  },
  data() {
    return {
      userName: '',
      pageBodyTop: -10,
      isFullScreen: false,
    };
  },
};
</script>
<style  lang="scss" scoped>

</style>

<template>
  <div class="tags">
    <div class="tags-outer-scroll-bar"
         ref="scrollCon"
         @DOMMouseScroll="handleScroll"
         @mousewheel="handleScroll">
      <div class="tags-inner-scroll-body"
           ref="scrollBody"
           :style="{left: tagBodyLeft + 'px'}">
        <el-tag
          v-for="(tag, index) in tags"
          :key="tag.index"
          type="info"
          size="medium"
          @close="closeTag(index,lastSelectIndex())"
          @click.native="selectTag(index, lastSelectIndex())"
          :closable="!isHome(tag.name)">
          <i class="fa fa-circle" :class="{selected: tag.isSelect}" aria-hidden="true"></i>
          <span class="tag-title">{{tag.title}}</span>
        </el-tag>
      </div>
      <div class="close-tag-menu">
        <el-dropdown  @command="closeTags">
          <el-button size="mini" type="primary">
            标签选项<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from '@/lib/Utils';

export default {
  name: 'tagBar',
  data() {
    return {
      tagBodyLeft: 0,
    };
  },
  props: {
    tags: {
      type: Array,
      required: true,
    },
    afterCloseAllTags: Function,
    afterCloseOtherTags: Function,
    afterCloseTag: Function,
    afterSelectTag: Function,

  },
  methods: {
    isHome(name) {
      return name === 'home_index';
    },
    lastSelectIndex() {
      for (let index = 0; index < this.tags.length; index += 1) {
        if (this.tags[index].isSelect) {
          return index;
        }
      }
      return 0;
    },
    handleScroll(e) {
      const type = e.type;
      let delta = 0;
      let left = 0;
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40;
      }
      if (delta > 0) {
        left = Math.min(0, this.tagBodyLeft + delta);
      } else if (this.$refs.scrollCon.offsetWidth - 120 < this.$refs.scrollBody.offsetWidth) {
        if (this.tagBodyLeft <
            -((this.$refs.scrollBody.offsetWidth - this.$refs.scrollCon.offsetWidth) + 120)) {
          left = this.tagBodyLeft;
        } else {
          left = Math.max(this.tagBodyLeft + delta, this.$refs.scrollCon.offsetWidth
              - this.$refs.scrollBody.offsetWidth - 120);
        }
      } else {
        this.tagBodyLeft = 0;
      }
      this.tagBodyLeft = left;
    },
    closeTag(index, lastSecelct) {
      if (index === lastSecelct) {
        this.tags[0].isSelect = true;
        Utils.gotoIndex(this);
      }
      this.tags.splice(index, 1);
    },
    selectTag(index, lastSecelct) {
      this.tags[lastSecelct].isSelect = false;
      this.tags[index].isSelect = true;
      this.$store.commit('PUSH_LEVEL_LIST', this.tags[index].name);
      this.$router.push({
        name: this.tags[index].name,
      });
    },
    closeTags(command) {
      let selectIndex = 0;
      this.tags.some((item, index) => {
        if (item.isSelect) {
          selectIndex = index;
          return true;
        }
        return false;
      });
      if (selectIndex === 0) {
        this.tags.splice(1, this.tags.length - 1);
        if (this.afterCloseAllTags instanceof Function) {
          this.afterCloseAllTags();
        }
        return;
      }
      if (command === 'all') {
        this.tags.splice(1, this.tags.length - 1);
        this.tags[0].isSelect = true;
        Utils.gotoIndex(this);
      } else {
        const tag = this.tags[selectIndex];
        this.tags.splice(1, this.tags.length - 1);
        this.tags.push(tag);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>

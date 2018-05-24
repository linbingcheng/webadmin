<template>
  <div class="toolmenu">
    <span class="menu-item" v-show="!toSearch"
          @click="searchMenuClick">
      <el-badge :hidden=true>
        <el-tooltip effect="dark" content="搜索" placement="right">
          <i class="fa fa-search"></i>
        </el-tooltip>
      </el-badge>
    </span>
    <el-input v-show="toSearch"
              placeholder=""
              @keyup.enter.native="searchAll"
              v-model="searchKey">
      <i slot="suffix" class="el-input__icon fa fa-search"
         @click="searchAll"></i>
    </el-input>
    <span class="menu-item">
      <el-badge :value="messageCount" :max="99" :hidden="isHideBadge">
        <el-tooltip effect="dark" content="消息" placement="right">
          <i class="fa fa-bell-o"></i>
        </el-tooltip>
      </el-badge>
    </span>
    <span class="menu-item">
      <el-dropdown>
          <el-tooltip effect="dark" content="风格" placement="right">
            <i class="fa fa-paint-brush"></i>
          </el-tooltip>
         <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="fa fa-user-circle dropdown-icon" style="padding-right: 10px;"></i>
            黑底白字
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="fa fa-user-circle-o dropdown-icon" style="padding-right: 10px;"></i>
            白底黑字
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
  </div>
</template>

<script>
export default {
  name: 'toolMenu',
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
  computed: {
    messageCount() {
      return this.messages.length;
    },
    isHideBadge() {
      return this.messageCount === 0;
    },
  },
  methods: {
    searchMenuClick() {
      this.toSearch = !this.toSearch;
    },
    searchAll() {
      this.toSearch = !this.toSearch;
      this.searchKey = '';
    },
  },
  data() {
    return {
      toSearch: false,
      searchKey: '',
      // TODO
    };
  },
};
</script>
<!--
  去除 scope 原因
  https://segmentfault.com/q/1010000009105809
-->
<style lang="scss">

</style>

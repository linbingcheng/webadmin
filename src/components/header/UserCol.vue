<template>
    <div class="user-col">
      <div class="username">
        <span>{{name}}</span>
        <el-dropdown @command="commandHandler">
          <i class="fa fa-caret-down"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">
              <i class="fa fa-address-card" style="padding-right: 10px;"></i>
              个人中心
            </el-dropdown-item>
            <el-dropdown-item command="1">
              <i class="fa fa-power-off" style="padding-right: 10px;"></i>
              注销登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <img class="user-image" width="40px" height="40px" :src="avatarPath"/>
    </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  name: 'userCol',
  props: {
    name: {
      type: String,
      required: true,
    },
    avatarPath: {
      type: String,
      required: true,
    },
  },
  methods: {
    commandHandler(command) {
      if (command === '0') {
        console.log(0);
      }
      if (command === '1') {
        Cookies.remove('user');
        this.$router.push({
          name: 'login',
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>

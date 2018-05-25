<template>
  <div class="index">
    <el-card class="box-card">
      <div slot="header">
        <span class="title">中午好,欢迎回来 !</span>
      </div>
      <div v-for="o in 4" :key="o">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      username: '',
    };
  },
};
</script>

<style lang="scss" scoped>
.index{
  width: 100%;
  .title{
    font-size: 14px;
    color: grey;
  }
}
</style>

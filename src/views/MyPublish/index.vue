<template>
  <div class="container">
    <div class="main">
      <el-tabs class="tab-item" v-model="activeName">
        <el-tab-pane label="我的发贴" name="myPublish">
          <b class="title">我的发贴</b>
          <el-divider />

        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      activeName: 'myPublish'
    }
  }
}
</script>

<style>

</style>
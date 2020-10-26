<template>
  <div>
    <el-dialog
        title="用户登录"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>

        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['centerDialogVisible'],
  data: function(){
    return {
      formLabelWidth: '120px',
      form: {
        userName: ''
      }
    }
  },
  methods: {
    close(){
      this.centerDialogVisible = false
    },
    submit(){
      this.centerDialogVisible = this.loginVisible
    }
  }
}
</script>

<style>

</style>
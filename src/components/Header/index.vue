<template>
  <div class="header">
    <div class="header-container">
      <a href="/">
        <img src="//s3.pstatp.com/toutiao/xitu_juejin_web/img/logo.a7995ad.svg" alt="">
      </a>

      <ul @click="routeTo($event)" class="nav-list">
        <li>
          <a :class="routeHash == '#/' ? 'nav-active' : ''" href="#/">首页</a>
        </li>
        <li>
          <a :class="routeHash == '#/boilingPoint' ? 'nav-active' : ''" href="#/boilingPoint">沸点</a>
        </li>
        <li>
          <a href="">话题</a>
        </li>
        <li>
          <a href="">小册</a>
        </li>
        <li>
          <a href="">活动</a>
        </li>
      </ul>

      <el-input placeholder="探索掘金" maxlength="32" v-model="search" class="search">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>

      <el-button v-show="!user.system_id" @click="openLogin" size="small" type="primary">登&nbsp;录</el-button>

      <el-button v-show="user.system_id" @click="write" size="small" type="primary">发&nbsp;布</el-button>

      <el-dropdown v-show="user.system_id" @command="handleCommand">
        <span class="el-dropdown-link">
          <a slot="reference">
            <el-avatar :size="40" :src="user.user_avatar && user.user_avatar.avatar_small_url || circleUrl"></el-avatar>
          </a>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="my">我的资料</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>


      <el-dialog
        :visible="centerDialogVisible"
        width="410px"
        :before-close="beforeClose"
        title="登  录"
        center>

        <el-form :model="loginForm" ref="ruleForm1" label-width="22%" class="login-form">
            <el-form-item label="用户名：" prop="userName">
              <el-input v-model="loginForm.userName" placeholder="请输入用户名"></el-input>
            </el-form-item>

            <el-form-item label="密  码：" prop="password">
              <el-input v-model="loginForm.password" placeholder="请输入密码" show-password></el-input>
            </el-form-item>

            
              <span class="register-link">
                新用户
                <a href="#/register">
                  点击这里
                </a>
                注册
              </span>

            <div class="alert-button-wrapper">
              <el-button class="submit-button" type="primary" @click="login('ruleForm1')">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
            </div>
          </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { Http } from '@/utils/http'
import { Utils } from '@/utils/utils'
import { mapGetters, mapActions } from 'vuex'

export default {
  data(){
    return {
      routeHash: '#/',
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      search: '',
      centerDialogVisible: false,
      loginForm: {
        userName: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  mounted(){
  },
  methods: {
    routeTo($ev){
      if($ev.target.tagName == 'A') {
        this.routeHash = $ev.target.hash
      }
    },
    // 打开登录窗口
    openLogin(){
      this.centerDialogVisible = true
    },
    // 关闭窗口前执行
    beforeClose(){
      this.resetForm()
      this.centerDialogVisible = false
    },
    // 登录
    async login(){
      if(!this.loginForm.userName){
        this.$message({
          message: '请输入用户名',
          type: 'warning'
        })
        return
      }
      if(!this.loginForm.password){
        this.$message({
          message: '请输入密码',
          type: 'warning'
        })
        return
      }

      const params = {
        'authentication': JSON.stringify({
          'username': this.loginForm.userName,
          'password': this.loginForm.password
        }),
        'authorization': JSON.stringify({
          'system_id': '',
          'mobile': '',
          'sms_pin': '',
          'transaction': 'Sign In'
        })
      }
      const data = await Http.request({
        url: '/Community/User',
        data: params,
        method: 'POST'
      })
      
      console.log(data)
      
      if (data.data2.user && data.data) {
        localStorage.setItem('_userSess', data.data2.system_id)
        this.saveUserData(data.data)
        window.location.href = '/'
        this.centerDialogVisible = false
      } else {
        this.$message({
          message: '登录失败，请检查用户名/密码',
          type: 'error'
        })
      }
    },
    // 发布
    write(){
      this.$router.push('/publish')
    },
    // 头像选择菜单
    handleCommand(command) {
      const url = this.$route.fullPath
      if(command == 'exit'){
        this.clearUserData()
        window.location.href = '/'
      } else if(command == 'my') {
        if (url == '/my') return
        this.$router.push('/my')
      }
    },
    // 重置表单
    resetForm(){
      this.$refs['ruleForm1'].resetFields()
    },
    ...mapActions([
      'saveUserData',
      'clearUserData'
    ])
  }
}
</script>

<style lang="css" scoped>
.header {
  background: #fff;
  height: 62px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
  color: #909090;
}
.header-container {
  max-width: 960px;
  width: 96%;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  align-items: center;
}
.search {
  width: 228px;
  margin-left: 100px;
  background: #cccccc;
}
.nav-list {
  display: flex;
  flex-direction: row;
  color: #007fff;
  align-items: center;
  font-size: 20px;
  flex-wrap: wrap;
}
.nav-list li {
  padding: 0 20px;
}
.nav-list a:hover {
  color: #007fff;
}
.login-form .el-input{
  width: 260px;
}
.login-form {
  margin: 10px auto 0 auto;
}
.login-form .el-form-item {
  margin-bottom: 18px;
}
.alert-button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.el-tabs {
  margin-top: -20px;
}
.register-link a {
  font-weight: 600;
  color: #007fff;
}
</style>
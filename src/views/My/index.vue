<template>
  <div class="container">
    <div class="main">
      <el-tabs class="tab-item" v-model="activeName">
        <el-tab-pane label="个人资料" name="my">
          <b class="title">个人资料</b>
          <el-divider />
          <div class="edit-box">
            <span class="edit-left">头像</span>
            <span class="edit-right">
              <img src="https://sf1-ttcdn-tos.pstatp.com/img/mosaic-legacy/3791/5035712059~120x256.image" alt="">
              
              <span class="edit-desc">
                支持 jpg、png、jpeg 格式大小 5M 以内的图片
                <el-upload
                  action="/Community/User"
                  :show-file-list="false"
                  :http-request="httpUpload"
                >
                  <el-button class="upload" size="small" type="primary">点击上传</el-button>
                </el-upload>
              </span>
            </span>
          </div>

          <el-divider />

          <div class="edit-box">
            <span class="edit-left">用户名</span>
            <span class="edit-right">
              <input type="text" class="edit-ipt" v-model="user.username" readonly placeholder="请输入用户名">
              <!-- <el-button type="primary" icon="el-icon-edit" size="small">修改</el-button> -->
            </span>
          </div>

          <el-divider />

          <div class="edit-box">
            <span class="edit-left">手机</span>
            <span class="edit-right">
              <input type="text" class="edit-ipt" v-model="user.mobile" readonly placeholder="请输入手机号">
              <!-- <el-button type="primary" icon="el-icon-edit" size="small">修改</el-button> -->
            </span>
          </div>

          <el-divider />

          <div class="edit-box">
            <span class="edit-left">Email</span>
            <span class="edit-right">
              <input type="text" class="edit-ipt" v-model="user.email" readonly placeholder="">
              <!-- <el-button type="primary" icon="el-icon-edit" size="small">修改</el-button> -->
            </span>
          </div>

          <el-divider />

          <!-- <div class="edit-box">
            <span class="edit-left">密码</span>
            <span class="edit-right">
              <input type="text" class="edit-ipt" v-model="user.password" placeholder="请输入密码">
              <el-button type="primary" @click="update('password')" icon="el-icon-edit" size="small">修改</el-button>
            </span>
          </div>

          <el-divider /> -->

          <div class="edit-box">
            <span class="edit-left">姓</span>
            <span class="edit-right">
              <input type="text" class="edit-ipt" v-model="user.first_name" placeholder="请输入姓">
              <el-button type="primary" icon="el-icon-edit" @click="update('first_name')" size="small">修改</el-button>
            </span>
          </div>

          <el-divider />

          <div class="edit-box">
            <span class="edit-left">名</span>
            <span class="edit-right">
              <input type="text" class="edit-ipt" v-model="user.last_name" placeholder="请输入名">
              <el-button type="primary" icon="el-icon-edit" @click="update('last_name')" size="small">修改</el-button>
            </span>
          </div>

          <el-divider />

          <div class="edit-box">
            <span class="edit-left">性别</span>
            <span class="edit-right">
              <el-radio-group class="edit-ipt" v-model="user.gender">
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
              <el-button type="primary" icon="el-icon-edit" @click="update('gender')" size="small">修改</el-button>
            </span>
          </div>

          <el-divider />

          <div class="edit-box">
            <span class="edit-left">年龄</span>
            <span class="edit-right">
              <input type="text" class="edit-ipt" v-model="user.age" placeholder="请输入年龄">
              <el-button type="primary" icon="el-icon-edit" @click="update('age')" size="small">修改</el-button>
            </span>
          </div>


        </el-tab-pane>
        <!-- <el-tab-pane label="账号设置" name="account">账号设置</el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { Http } from '@/utils/http'
import { Utils } from '@/utils/utils'

export default {
  data() {
    return {
      activeName: 'my',
      user: {
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        gender: '',
        age: '',
        mobile: '',
        email: ''
      }
    }
  },
  mounted () {
    const user = localStorage.getItem('_user')
    if(user){
      this.user = JSON.parse(user)
    }
    if (!window.FileReader) {
      console.error('Your browser does not support FileReader API!')
    }
    this.fileReader = new FileReader()
  },
  methods: {
    async update(key){
      if(!key) return
      const session = localStorage.getItem('_userSess')
      const user = JSON.parse(localStorage.getItem('_user'))
      user[key] = this.user[key]
      const params = {
        'authentication_session': JSON.stringify({
          'system_id': session
        }),
        'user': JSON.stringify(user),
        'authorization': JSON.stringify({
          'system_id': '',
          'mobile': '',
          'sms_pin': '',
          'transaction': 'Update User Info'
        })
      }
      const data = await Http.request({
        url: '/Community/User',
        data: params,
        method: 'POST'
      })
      if(data.data && data.data.system_id){
        localStorage.setItem('_user', JSON.stringify(data.data))
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: `修改失败, ${data.message}`,
          type: 'error'
        })
      }
    },
    httpUpload(options){
      debugger
      let file = options.file
      let filename = file.name
      if (file) {
        this.fileReader.readAsDataURL(file)
      }
      this.fileReader.onload = async () => {
        let base64Str = this.fileReader.result
        console.log(base64Str)

        const session = localStorage.getItem('_userSess')
        const user = JSON.parse(localStorage.getItem('_user'))
        const params = {
          'authentication_session': JSON.stringify({
            'system_id': session
          }),
          'user_avatar': JSON.stringify({
            'system_id': '',
            'user': user.system_id,
            'avatar': base64Str
          }),
          'authorization': JSON.stringify({
            'system_id': '',
            'mobile': '',
            'sms_pin': '',
            'transaction': 'Update User Avatar'
          })
        }

        const data = await Http.request({
          url: options.action,
          data: params,
          method: 'POST'
        })

        debugger
        // let config = {
        //   url: '/api/file/upload/base64',
        //   method: 'post',
        //   // file: file,
        //   data: {
        //     base64Str: base64Str.split(',')[1],
        //     name: filename
        //   },
        //   timeout: 10000,
        //   onUploadProgress: function (progressEvent) {
        //     // console.log(progressEvent)
        //     progressEvent.percent = progressEvent.loaded / progressEvent.total * 100
        //     options.onProgress(progressEvent, file)
        //   },
        // }
        // axios(config)
        //   .then(res => {
        //     options.onSuccess(res, file)
        //   })
        //   .catch(err => {
        //     options.onError(err)
        //   })
      }
    },
    beforeUpload (file) {
      const isLt5M = file.size < 5 * 1024 * 1024
      if (this.fileList.length >= 3) {
        alert('At most 3 files')
        return false
      }
      if (!isLt5M) {
        alert('The max size is 5MB')
        return false
      }
    },
    uploadSuccess (res, file, fileList) {
      let data = res.data
      console.log('upload result:', res, file)
      file.key = data.key
      this.fileList.push(data.key)
    }
  }
}
</script>

<style scoped>
.container {
  min-height: calc(100vh - 83px);
}
.main {
  padding: 10px 40px;
  max-width: 600px;
}
.tab-item {
  font-size: 14px;
}
.title {
  font-size: 20px;
  margin-top: 20px;
}
.edit-box {
  display: flex;
  align-items: center;
  font-size: 16px;
}
.edit-left {
  display: block;
  width: 100px;
}
.edit-right {
  display: flex;
  font-size: 12px;
  color: #9c9c9c;
  align-items: center;
}
.edit-desc {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.edit-right img {
  width: 72px;
  height: 72px;
  margin-right: 40px;
}
.upload {
  width: 100px;
  margin-top: 20px;
}
.edit-ipt {
  height: 28px;
  border: 0;
  font-size: 16px;
  color: #9c9c9c;
  width: 400px;
  padding: 0;
  margin-right: 10px;
}
.el-divider--horizontal {
  margin: 18px 0;
}
</style>
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
              <img class="avator" @click="handlePictureCardPreview" :src="user.user_avatar && baseUrl + user.user_avatar.avatar_small_url" alt="">
              
              <span class="edit-desc">
                仅支持jpg和png格式，大小500K以内的图片
                <el-upload
                  action="/Community/User"
                  :show-file-list="false"
                  :http-request="httpUpload"
                  :before-upload="beforeUpload"
                >
                  <el-button class="upload" size="small" type="primary">点击上传</el-button>
                </el-upload>

                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="user.user_avatar && baseUrl + user.user_avatar.avatar_url" alt="">
                </el-dialog>
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

          <!-- <div class="edit-box">
            <span class="edit-left">年龄</span>
            <span class="edit-right">
              <input type="text" class="edit-ipt" v-model="user.age" placeholder="请输入年龄">
              <el-button type="primary" icon="el-icon-edit" @click="update('dob')" size="small">修改</el-button>
            </span>
          </div>

          <el-divider /> -->

          <!-- <div class="edit-box">
            <span class="edit-left">密码</span>
            <span class="edit-right">
              <input type="text" class="edit-ipt" v-model="user.password" placeholder="请输入密码">
              <el-button type="primary" @click="update('password')" icon="el-icon-edit" size="small">修改</el-button>
            </span>
          </div>

          <el-divider /> -->

          <!-- <div class="edit-box">
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
          </div> -->

          <!-- <el-divider /> -->

          <div class="edit-box">
            <span class="edit-left">性别</span>
            <span class="edit-right">
              <el-radio-group class="edit-ipt" v-model="user.gender">
                <el-radio label="male">男</el-radio>
                <el-radio label=female>女</el-radio>
              </el-radio-group>
              <el-button type="primary" icon="el-icon-edit" @click="update('gender')" size="small">修改</el-button>
            </span>
          </div>

          <el-divider />

          <div class="edit-box">
            <span class="edit-left">生日</span>
            <span class="edit-right">
              <!-- <input type="text" class="edit-ipt" v-model="user.age" placeholder="请输入年龄"> -->
              <el-date-picker
                class="edit-ipt date-ipt"
                v-model="user.dob"
                size="small"
                type="date"
                value-format="yyyy-MM-dd">
              </el-date-picker>
              <el-button type="primary" icon="el-icon-edit" @click="update('dob')" size="small">修改</el-button>
            </span>
          </div>


        </el-tab-pane>
        <el-tab-pane label="账号安全" name="account">
          <b class="title">账号安全</b>
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
            <span class="edit-left">邮箱</span>
            <span class="edit-right">
              <input type="text" class="edit-ipt" v-model="user.email" readonly placeholder="">
              <!-- <el-button type="primary" icon="el-icon-edit" size="small">修改</el-button> -->
            </span>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { Http } from '@/utils/http'
import { Utils } from '@/utils/utils'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      dialogVisible: false,
      activeName: 'my'
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'baseUrl'
    ])
  },
  mounted () {
    if (!window.FileReader) {
      console.error('Your browser does not support FileReader API!')
    }
    this.fileReader = new FileReader()
  },
  methods: {
    async update(key){
      if(!key || !this.user.system_id) return
      const session = localStorage.getItem('_userSess')
      const user = JSON.parse(localStorage.getItem('_user'))
      user[key] = this.user[key]

      const params = {
        'authentication': JSON.stringify({
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
        // localStorage.setItem('_user', JSON.stringify(data.data))
        this.saveUserData(data.data)
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
      if (!this.user.system_id) return
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
          'authentication': JSON.stringify({
            'system_id': session
          }),
          'user_avatar': JSON.stringify({
            'system_id': user.user_avatar ? user.user_avatar.system_id : '',
            'user': user.system_id,
            'avatar': base64Str
          }),
          'authorization': JSON.stringify({
            'transaction': 'Update User Avatar'
          })
        }

        // return

        const data = await Http.request({
          url: options.action,
          data: params,
          method: 'POST'
        })

        if(data.message_no == 100){
          this.$message({
            message: '您长时间未操作，请重新登录',
            type: 'error'
          })
          // this.clearUserData()
          // this.$router.push('/')
          return
        }

        this.user.user_avatar = data.data
        localStorage.setItem('_user', JSON.stringify(this.user))

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
    // 预览大图
    handlePictureCardPreview(file) {
      // this.dialogImageUrl = this.target.currentSrc
      this.dialogVisible = true
    },
    beforeUpload (file) {
      const isLt5M = file.size < 500 * 1024
      const type = file.type

      if(type != 'image/png' && type != 'image/jpeg' && type != 'image/jpg'){
        this.$message({
          message: '仅支持 jpg、png、jpeg 格式的图片',
          type: 'error'
        })
        return false
      }
      if (!isLt5M) {
        this.$message({
          message: '仅支持 500k 以内的图片',
          type: 'error'
        })
        return false
      }
    },
    uploadSuccess (res, file, fileList) {
      let data = res.data
      console.log('upload result:', res, file)
      file.key = data.key
      this.fileList.push(data.key)
    },
    ...mapActions([
      'saveUserData',
      'clearUserData'
    ])
  }
}
</script>

<style scoped>
.container {
  min-height: calc(100vh - 83px);
}
.tab-item {
  font-size: 14px;
}
.edit-desc {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.avator {
  width: 72px;
  height: 72px;
  margin-right: 40px;
}
.upload {
  width: 100px;
  margin-top: 20px;
}
.el-divider--horizontal {
  margin: 18px 0;
}
.date-ipt>>>input {
  color: #9c9c9c;
  border: none;
}

</style>
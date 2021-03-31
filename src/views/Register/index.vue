<template>
  <div>
    <el-dialog
      :visible="true"
      title="注  册"
      width="410px"
      :show-close="false"
      center
    >
      <el-form
        :model="registForm"
        :rules="rules"
        ref="registForm"
        label-width="22%"
        class="login-form"
      >
        <el-form-item label="用户名" prop="userName">
          <el-popover
            ref="userNamePopover"
            placement="right"
            width="100"
            trigger="focus"
            :content="userNameRule"
          ></el-popover>
          <el-input
            v-popover:userNamePopover
            v-model="registForm.userName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <el-form-item label="密  码" prop="password">
          <el-popover
            ref="pwdPopover"
            placement="right"
            width="100"
            trigger="focus"
            :content="passwordRule"
          ></el-popover>
          <el-input
            v-popover:pwdPopover
            v-model="registForm.password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-popover
            ref="genderPopover"
            placement="right"
            width="100"
            trigger="focus"
            content="注册后性别无法修改"
          ></el-popover>
          <el-radio-group v-model="registForm.gender" v-popover:genderPopover>
            <el-radio label="male">男</el-radio>
            <el-radio label="female">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="手机号"
          prop="mobile"
          :class="flag ? 'sms-form' : ''"
        >
          <el-input v-model="registForm.mobile" placeholder="请输入手机号">
            <el-button
              class="sendBtn"
              @click="subSMS"
              size="small"
              slot="append"
              type="primary"
              >{{ SMSText }}</el-button
            >
          </el-input>
        </el-form-item>

        <el-form-item v-show="verCodeVisible" label="验证码" prop="verCode">
          <el-input
            v-model="registForm.verCode"
            placeholder="请输入验证码"
          ></el-input>
        </el-form-item>

        <slide-verify
          v-show="verifyVisible"
          :l="42"
          :r="10"
          :w="310"
          :h="155"
          ref="slideblock"
          @success="onSuccess"
          @fail="onFail"
          @refresh="onRefresh"
          :slider-text="text"
        ></slide-verify>

        <div class="alert-button-wrapper">
          <el-button class="submit-button" type="primary" @click="regist()"
            >注 册</el-button
          >
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { Http } from '@/utils/http'
import { Utils } from '@/utils/utils'
import { Time } from '@/utils/time'
import {
  messageError,
  messageSuccsess,
  messageWarning,
} from '@/utils/elementTools'

export default {
  data: function() {
    const userNameCheck = (rule, value, callback) => {
      setTimeout(async () => {
        if ((await this.checkUserName()) == 'yes') {
          callback(new Error('用户名已存在，请重新输入'))
        } else {
          callback()
        }
      }, 1000)
    }

    const mobileCheck = (rule, value, callback) => {
      setTimeout(async () => {
        const phone = this.registForm.mobile
        if (!phone) {
          callback(new Error('请输入手机号'))
        } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(phone)) {
          callback(new Error('手机号码有误，请重新输入'))
        } else {
          callback()
        }
      }, 1000)
    }

    return {
      userNameRule: '8-16位，只允许中英文，数字和_，中文最多8个',
      passwordRule: '8-16位，只允许数字，英文，部分特殊字符',
      rules: {
        // userName: [
        //   { validator: userNameCheck, trigger: 'blur' }
        // ],
        mobile: [{ validator: mobileCheck, trigger: 'blur' }],
      },
      flag: true,
      userNameTip: false,
      text: '向右滑动至空缺处',
      msg: '',
      verifyVisible: false,
      verCodeVisible: false,
      SMSText: '获取验证码',
      registForm: {
        userName: '',
        password: '',
        mobile: '',
        system_id: '',
        first_name: '',
        last_name: '',
        male: '',
        gender: 'male',
        age: 0,
        mobile: '',
        email: '',
        verCode: '',
      },
    }
  },
  mounted() {
    document.querySelector('.v-modal').style.zIndex = 111
    this.userNameTip = true

    this.getConfig()
  },
  methods: {
    // 获取注册配置
    async getConfig() {
      const params = {
        authorization: JSON.stringify({
          system_id: this.registForm.system_id,
          mobile: this.registForm.mobile,
          sms_pin: this.registForm.verCode,
          transaction: 'Check Username Password',
        }),
      }
      const data = await Http.request({
        url: '/Community/Authentication',
        data: params,
        method: 'POST',
      })
      const res = data.data
      if (data.message_no == 200 && res) {
        this.userNameRule = res.username_rule
        this.passwordRule = res.password_rule
      } else {
        messageError('注册配置获取失败')
      }
    },
    regist() {
      if (!this.registForm.userName) {
        messageWarning('请输入用户名')
        return
      }
      if (!this.registForm.password) {
        messageWarning('请输入密码')
        return
      }
      if (!this.registForm.mobile) {
        messageWarning('请输入手机号')
        return
      }
      if (!this.registForm.verCode) {
        messageWarning('请输入验证码')
        return
      }

      this.$refs['registForm'].validate(async (valid) => {
        if (valid) {
          const params = {
            user: JSON.stringify({
              system_id: this.registForm.system_id,
              username: this.registForm.userName,
              password: this.registForm.password,
              user_id: '',
              first_name: this.registForm.first_name,
              last_name: this.registForm.last_name,
              gender: this.registForm.gender,
              age: this.registForm.age,
              mobile: this.registForm.mobile,
              email: this.registForm.email,
            }),
            authorization: JSON.stringify({
              system_id: this.registForm.system_id,
              mobile: this.registForm.mobile,
              sms_pin: this.registForm.verCode,
              transaction: 'Create Account',
            }),
          }

          const data = await Http.request({
            url: '/Community/User',
            data: params,
            method: 'POST',
          })

          if (data.data && data.data2 && data.data2.user) {
            localStorage.setItem('_userSess', data.data2.system_id)
            localStorage.setItem('_user', Utils.jsonToString(data.data))
            this.resetForm()
            this.centerDialogVisible = false
            window.location.href = '/'
          } else {
            messageError('登录失败，请检查用户名/密码/验证码')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 检查用户名
    async checkUserName() {
      const params = {
        user: Utils.jsonToString({ username: this.registForm.userName }),
        authorization: Utils.jsonToString({ transaction: 'Check Username' }),
      }
      const data = await Http.request({
        url: '/Community/User',
        data: params,
        method: 'POST',
      })

      return data.message_text
    },
    // 点击获取验证码
    subSMS() {
      const mobile = this.registForm.mobile
      if (!mobile) {
        messageWarning('请输入手机号')
        return
      }
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(mobile)) {
        messageWarning('请输入正确的手机号')
        return
      }
      if (this.flag) {
        this.flag = false
        this.verifyVisible = true
        // 开始倒计时
        this.countTime()
      }
    },
    // 倒计时
    countTime() {
      new Time(65, this)
    },
    // 验证码成功回调
    onSuccess() {
      this.$refs.slideblock.reset()
      this.verCodeVisible = true
      this.verifyVisible = false
      this.sendSms()
    },
    async sendSms() {
      const params = {
        authorization: JSON.stringify({
          system_id: '',
          mobile: this.registForm.mobile,
          sms_pin: '',
          transaction: 'Create Account',
        }),
      }
      const data = await Http.request({
        url: '/Community/Authorization',
        data: params,
        method: 'POST',
      })
      this.registForm.system_id = data.data.system_id
      messageSuccsess('验证码已经发送，请注意查看手机短信')
    },
    onFail() {
      this.msg = ''
      this.verCodeVisible = false
    },
    onRefresh() {
      this.msg = ''
      this.verCodeVisible = false
    },
    // 重置表单
    resetForm() {
      this.$refs.slideblock.reset()
      this.verifyVisible = false
      this.verCodeVisible = false
      this.$refs['registForm'].resetFields()
    },
  },
}
</script>

<style lang="css" scoped>
.submit-button {
  width: 100%;
}
.slide-verify {
  left: 24px;
}
.slide-verify-slider {
  margin-bottom: 10px;
}
.alert-button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.sms-form >>> .el-input-group__append {
  background-color: coral;
  color: #fff;
}
/* .sendBtn {
  border-color: rgb(251, 255, 0) !important;
  background-color: rgb(251, 255, 0) !important;
  color: #000 !important;
} */
</style>

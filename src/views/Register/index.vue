<template>
  <div>
    <el-dialog
        :visible="true"
        title="注  册"
        width="410px"
        :show-close="false"
        center>
        <el-form :model="registForm" :rules="rules" ref="registForm" label-width="22%" class="login-form">
            <el-form-item label="用户名：" prop="userName">
              <el-popover
                ref="userNamePopover"
                placement="right"
                width="100"
                trigger="focus"
                content="8-16位，只允许中英文，数字和_，中文最多8个">
              </el-popover>
              <el-input v-popover:userNamePopover v-model="registForm.userName" placeholder="请输入用户名"></el-input>
            </el-form-item>

            <el-form-item label="密  码：" prop="password">
              <el-popover
                ref="pwdPopover"
                placement="right"
                width="100"
                trigger="focus"
                content="8-16位，只允许数字，英文，部分特殊字符">
              </el-popover>
              <el-input v-popover:pwdPopover v-model="registForm.password" placeholder="请输入密码" show-password></el-input>
            </el-form-item>

            <el-form-item label="手机号：" prop="mobile">
              <el-input v-model="registForm.mobile" placeholder="请输入手机号">
                <el-button @click="subSMS" size="small" slot="append" type="primary">{{SMSText}}</el-button>
              </el-input>
            </el-form-item>

            <el-form-item v-show="verCodeVisible" label="验证码：" prop="verCode">
              <el-input v-model="registForm.verCode" placeholder="请输入验证码"></el-input>
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
              <el-button class="submit-button" type="primary" @click="regist()">注 册</el-button>
            </div>

          </el-form>

    </el-dialog>
  </div>
</template>

<script>
import { Http } from '@/utils/http'
import { Utils } from '@/utils/utils'
import { Time } from '@/utils/time'

export default {
  data: function(){
    const userNameCheck = (rule, value, callback) => {
      setTimeout(async () => {
        if (await this.checkUserName() == 'yes') {
          callback(new Error('用户名已存在，请重新输入'))
        } else {
          callback()
        }
      }, 1000)
    }

    const mobileCheck = (rule, value, callback) => {
      setTimeout(async () => {
        const phone = this.registForm.mobile
        if(!phone){
          callback(new Error('请输入手机号'));
        }
        else if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(phone)){
          callback(new Error('手机号码有误，请重新输入'))
        } else {
          callback()
        }
      }, 1000)
    }

    return {
      rules: {
        userName: [
          { validator: userNameCheck, trigger: 'blur' }
        ],
        mobile: [
          { validator: mobileCheck, trigger: 'blur' }
        ],
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
        gender: '',
        age: 0,
        mobile: '',
        email: '',
        verCode: ''
      }
    }
  },
  mounted(){
    this.userNameTip = true
  },
  methods: {
    regist(){
      if(!this.registForm.userName){
        this.$message({
          message: '请输入用户名',
          type: 'warning'
        })
        return
      }
      if(!this.registForm.password){
        this.$message({
          message: '请输入密码',
          type: 'warning'
        })
        return
      }
      if(!this.registForm.mobile){
        this.$message({
          message: '请输入手机号',
          type: 'warning'
        })
        return
      }
      if(!this.registForm.verCode){
        this.$message({
          message: '请输入验证码',
          type: 'warning' 
        })
        return
      }

      this.$refs['registForm'].validate(async (valid) => {
        if (valid) {
          const params = {
            'user': JSON.stringify({
              'system_id': this.registForm.system_id,
              'username': this.registForm.userName,
              'password': this.registForm.password,
              'user_id': '',
              'first_name': this.registForm.first_name,
              'last_name': this.registForm.last_name,
              'gender': this.registForm.gender,
              'age': this.registForm.age,
              'mobile': this.registForm.mobile,
              'email': this.registForm.email
            }),
            'authorization': JSON.stringify({
              'system_id': this.registForm.system_id,
              'mobile': this.registForm.mobile,
              'sms_pin': this.registForm.verCode,
              'transaction': 'Create Account'
            })
          }

          const data = await Http.request({
            url: '/Community/User',
            data: params,
            method: 'POST'
          })

  //         const data = {
  //           'system_id': '69b666ce75284cfa8005e769bb557e7a',
	// 'username': 'whq123456',
	// 'user_id': '',
	// 'first_name': 'WSA',
	// 'last_name': 'OK',
	// 'gender': '1',
	// 'age': 21,
	// 'mobile': '15821467817',
	// 'email': '',
	// 'user_avatar': {
	// 	'system_id': '3619a8b8d41c42e4808894577121210b',
	// 	'user': '69b666ce75284cfa8005e769bb557e7a',
	// 	'avatar': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeAAAAHgCAYAAAB91L6VAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAET2SURBVHhe7d0JvMzVG8fxI0u2QvtCKEJIRYkoZamUypZC2iRLKqmk5U9aFCUlLaRQSKiIbCUhJWVJRNqjhVYqS+r+fc+cyW9m7r3uZe785jfzeb9e99WcM9f/7y7mmXPOc54nX8ZOBgAAJNQ+7r8AACCBCMAAAPiAAAwAgA8IwAAA+IAADACADwjAAAD4gAAMAIAPCMAAAPiAAAwAgA8IwAAA+IAADACADwjAAAD4gAAMAIAPCMAAAPiAAAwAgA8IwAAA+IAADACADwjAAAD4gAAMAIAPCMAAAPiAAAwAgA8IwAAA+IAADACADwjAAAD4gAAMAIAPCMAAAPiAAAwAgA8IwAAA+IAADACADwjAAAD4gAAMAIAPCMAAAPiAAAwAgA8IwAAA+IAADACADwjAAAD4gAAMAIAPCMAAAPiAAAwAgA8IwAAA+IAADACADwjAAAD4gAAMAIAPCMAAAPiAAAwAgA8IwAAA+IAADACADwjAAAD4gAAMAIAPCMAAAPiAAAwAgA8IwAAA+IAADACADwjAAAD4gAAMAIAPCMAAAPiAAAwAgA8IwAAA+IAADACADwjAAAD4gAAMAIAPCMAAAPiAAAwAgA8IwAAA+IAADACADwjAAAD4gAAMAIAPCMAAAPiAAAwAgA8IwAAA+IAADACADwjAAAD4gAAMAIAPCMAAAPiAAAwAgA8IwAAA+IAADACADwjAAAD4gAAMAIAPCMAAAPiAAAwAgA8IwAAA+IAADACADwjAQC6sWbPGfP311+bff/91MwCwZwjAQA7NmTPHVK5c2ZQrV87cc889bhYA9ky+jJ3cYwDZ2G+//cwff/xhH9eoUcN8+OGHJn/+/HYMALnFChjIoWrVqrlHxixfvtzcdtttbgQAuccKGMiFfPnyuUchq1atMlWqVHEjAMg5VsBALnTs2NE9Cnn88cfdIwDIHVbAQC61bdvWjBs3zj4uWrSoWb16tSlTpowdA0BOsQIGcqlFixb/JV/99ddfpl27dubHH3+0YwDIKQIwkEvNmjUzjRo1ciNj5s+fb8aMGeNGAJAzBGAgl/bdd19z8803m/Lly7sZYwYNGvTfFSUAyAkCMLAHtAJu0qSJGxmzfv168/zzz7sRAOweSVjAHtq+fbspWbKk2bJli5sxZsaMGebss892IwDIGitgYA8VKlTIHHXUUW4UMnv2bPcIALLHChjYS9WrVzcff/yxfVygQAHz3nvvmZo1a9oxAGSFFTCwl5SQFbZjxw7zyiuvuBEAZI0VMBAHupo0depUNwplRffo0cONACAWK2AgDtQdyWvZsmWG97YAssMKGIgTbUU//PDDbmTMkiVLzIknnuhGABCJAAzEia4lqUhHmLokqVsSAGSGLWggTnQtqWvXrm5kzCeffGLOOOMMNwKASARgII5atmxpihUr5kahbWh1SwKAaARgII7OPPNMc84557iRsfWhBw4c6EYAsAsBGIijfPnymd69e0ckX7322mtm7NixbgQAIQRgIM5UBevkk092I2M2btxoRo8ezbUkABHIggbyyKGHHmo2bNjgRsY8/fTTplOnTm4EIN2xAgbySMeOHd2jEEpUAvAiAAN55L777otY8apV4Q033OBGANIdW9BAHlqzZo2pXLmyGxlTunRp8+2337oRgHTGCjhB/v33X5shq48pU6a4WaS6SpUqRZSnXLdunb0rDAAE4ATxvuheddVVtmcs0oNWvd4Sld988435/vvv3QhAuiIA++Dnn382F110kfnxxx/dDFLZxRdfbJ544gnbrF8++OAD8/bbb9vHANIXZ8AJom9z4cKFbcF+L7796WHp0qWmVq1a9igibPPmzaZ48eJuBCDdsAJOEJ39btu27b9VUJjm//zzTzdCqlJlrCFDhrhRyH777eceAUhHBOAEW7FihTniiCPcKKR27drmu+++cyOkqsaNG5uDDz7YjUJvvtSsAUB6IgAnmK6kjBkzxhxwwAFuxpiVK1eatm3bshJOcRUrVoyoCa3jh8cee8yNAKQbArAPGjRoYMaNG+dGIUrKOffcc90IqapevXqmbt26bmTM+PHjCcJAmiIA+6RJkyZm7dq1bhQyf/58gnCKUyLerbfe6kbGbN261YwYMYIjCCANEYB9VKFCBfP8889H3BFVucJ27dqZHTt2uBmkmrPPPtt069bNjYz56KOPzMyZM90IQLrgGlISGD58uOnatWtE0O3cubN58skn3QipRtfRlAcQPvdX+8L333/fPgaQHlgBJ4FrrrnG9OvXz41CnnrqKdOz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',
	// 	'avatar_url': '',
	// 	'avatar_medium': '',
	// 	'avatar_medium_url': '',
	// 	'avatar_small': 'data:image/png;base64,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',
	// 	'avatar_small_url': ''
  // }
  //         }
          if (data.data && data.data2 && data.data2.user) {
            localStorage.setItem('_userSess', data.data2.user)
            localStorage.setItem('_user', Utils.jsonToString(data.data))
            this.resetForm()
            this.centerDialogVisible = false
            window.location.href = '/'
          } else {
            this.$message({
              message: '登录失败，请检查用户名/密码/验证码',
              type: 'error'
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    // 检查用户名
    async checkUserName(){
      const params = {
        user: Utils.jsonToString({username: this.registForm.userName}),
        authorization: Utils.jsonToString({transaction: 'Check Username'})
      }
      const data = await Http.request({
        url: '/Community/User',
        data: params,
        method: 'POST'
      })

      return data.message_text
    },
    // 点击获取验证码
    subSMS() {
      const mobile = this.registForm.mobile
      if(!mobile){
        this.$message({
          message: '请输入手机号',
          type: 'warning'
        })
        return
      }
      if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(mobile)){
        this.$message({
          message: '请输入正确的手机号',
          type: 'warning'
        })
        return
      }
      if(this.flag){
        this.flag = false
        this.verifyVisible = true
        // 开始倒计时
        this.countTime()
      }
    },
    // 倒计时
    countTime(){
      new Time(65, this)
    },
    // 验证码成功回调
    onSuccess(){
      this.$refs.slideblock.reset()
      this.verCodeVisible = true
      this.verifyVisible = false
      this.sendSms()
    },
    async sendSms(){
      const params = {
        'authorization': JSON.stringify({
          'system_id': '',
          'mobile': this.registForm.mobile,
          'sms_pin': '',
          'transaction': 'Create Account'
        })
      }
      const url = '/Community/Authorization'
      const data = await Http.request({
        url,
        data: params,
        method: 'POST'
      })
      this.registForm.system_id = data.data.system_id
      this.$message({
        message: '验证码已经发送，请注意查看手机短信',
        type: 'success'
      })
    },
    onFail(){
      this.msg = ''
      this.verCodeVisible = false
    },
    onRefresh(){
      this.msg = ''
      this.verCodeVisible = false
    },
    // 重置表单
    resetForm(){
      this.$refs.slideblock.reset()
      this.verifyVisible = false
      this.verCodeVisible = false
      this.$refs['registForm'].resetFields()
    }
  }
}
</script>

<style lang="css" scoped>
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
</style>
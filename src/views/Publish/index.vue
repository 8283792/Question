<template>
  <div class="container">
    <div class="main">
      <el-tabs class="tab-item" v-model="activeName">
        <el-tab-pane label="文章发布" name="publish">
          <b class="title">文章发布</b>
          <el-divider />
          <div class="edit-box">
            <span class="edit-left">标题</span>
            <span class="edit-right">
              <input
                type="text"
                class="edit-ipt"
                v-model="document.title"
                placeholder="请输入标题"
              />
              <!-- <el-button type="primary" icon="el-icon-edit" size="small">修改</el-button> -->
            </span>
          </div>
          <el-divider />

          <div class="edit-box">
            <span class="edit-left">分类</span>
            <span class="edit-right">
              <el-select v-model="document.selectedValue" placeholder="请选择">
                <el-option
                  v-for="item in document.classify"
                  :key="item.system_id"
                  :label="item.display_name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
          </div>
          <el-divider />
          <!-- {{ msg }} -->
          <tinymce-editor
            ref="editor"
            :baseUrl="baseUrl"
            v-model="msg"
            :disabled="disabled"
            @input="onInput"
            @onClick="onClick"
          ></tinymce-editor>
          <div class="btn-wrapper">
            <el-button type="primary" @click="clear">清空</el-button>
            <el-button type="primary" :disabled="publishBtn" @click="pubilsh"
              >发布</el-button
            >
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import TinymceEditor from '@/components/tinymce-editor'
import { Http } from '@/utils/http'
import { mapGetters, mapActions } from 'vuex'
import {
  messageError,
  messageSuccsess,
  messageWarning,
} from '@/utils/elementTools'
import { mixParams } from '@/utils/mixParams'
import { Check } from '@/utils/check'

export default {
  components: {
    TinymceEditor,
  },
  mounted() {
    this.getArea()
  },
  data() {
    return {
      document: {
        title: '',
        classify: [
          {
            value: '后端',
            label: '后端',
          },
          {
            value: '前端',
            label: '前端',
          },
          {
            value: 'Android',
            label: 'Android',
          },
          {
            value: 'IOS',
            label: 'IOS',
          },
          {
            value: 'AI',
            label: '人工智能',
          },
          {
            value: '开发工具',
            label: '开发工具',
          },
        ],
        selectedValue: '',
      },
      activeName: 'publish',
      msg: '',
      disabled: false, // 禁用富文本
      publishBtn: false,
      max_words: 0, // 最大可输入字符数
    }
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    onInput() {
      const length = tinyMCE.activeEditor
        .getContent()
        .replace(/(<([^>]+)>)/gi, '').length
      if (length > this.max_words) {
        messageWarning('字符超出限制')
        this.publishBtn = true
      } else {
        this.publishBtn = false
      }
    },
    // 鼠标单击的事件
    onClick(e, editor) {
      // console.log('Element clicked')
      // console.log(e)
      // console.log(editor)
    },
    // 清空内容
    clear() {
      this.$refs.editor.clear()
    },
    // 获取文章分类配置
    async getArea() {
      const params = mixParams.mix('Get Topic Configuration')
      const data = await Http.request({
        url: '/Community/Topic_Configuration',
        data: params,
        method: 'POST',
      })
      console.log(data)
      this.document.classify = data.data.topic_area_choices
      this.document.selectedValue = this.document.classify[0]
      this.max_words = data.data.max_words
    },
    async pubilsh() {
      let params = {
        topic: JSON.stringify({
          system_id: '',
          author: '',
          user: this.user.system_id,
          tag1: '',
          tag2: '',
          sub_area: '',
          status: '',
          title: this.document.title,
          area: this.document.selectedValue.name,
          content: this.msg,
          created_on: '',
        }),
      }
      params = mixParams.mix('Create Topic', params)
      if (!this.document.title.length) {
        messageWarning('标题不能为空！')
        return
      }

      if (!Check.topicImg(this.msg)) return
      const data = await Http.request({
        url: '/Community/Topic',
        data: params,
        method: 'POST',
      })
      if (data) {
        alert('发布成功')
        window.location = '/'
      } else {
        messageError(`发布失败！${data.message_text}`)
      }
    },
  },
}
</script>

<style lang="css" scoped>
.btn-wrapper {
  margin: 20px auto;
  text-align: center;
}
::v-deep input::-webkit-input-placeholder {
  color: #ccc;
  font-size: 14px;
}
::v-deep input::-moz-input-placeholder {
  color: #ccc;
  font-size: 14px;
}
::v-deep input::-ms-input-placeholder {
  color: #ccc;
  font-size: 14px;
}
</style>

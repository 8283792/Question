<template>
  <div class="container">
    <template>
      <el-backtop target=".container">
        <div
          style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
        >
          UP
        </div>
      </el-backtop>
    </template>
    <div v-loading="loading" class="main">
      <div class="subtitle">
        <div>
          <div v-show="doc.author">
            <i style="color: #409EFF;" class="el-icon-user-solid"></i>
            {{ doc.author }}
          </div>
          <div v-show="docData.created_on" style="color: #909399;">
            发表于： {{ docData.created_on }}
          </div>
        </div>

        <div v-show="docData.user == user.system_id">
          <div>
            操作：
            <span>
              <el-button
                @click="editTopic"
                v-show="!isEdit"
                type="primary"
                icon="el-icon-edit"
                size="small"
                >编辑</el-button
              >
              <el-button
                @click="doEdit"
                v-show="isEdit"
                type="primary"
                icon="el-icon-edit"
                size="small"
                >保存</el-button
              >
              <el-button
                @click="cancelTopic"
                v-show="isEdit"
                type="primary"
                icon="el-icon-refresh-right"
                size="small"
                >取消</el-button
              >
              <el-button
                v-show="!isEdit"
                @click="delTopic"
                type="danger"
                icon="el-icon-delete"
                size="small"
                >删除</el-button
              >
            </span>
          </div>
        </div>
      </div>
      <h1 v-if="!isEdit" class="title">{{ docData.title }}</h1>
      <input
        v-else-if="isEdit"
        class="title"
        type="text"
        v-model="docData.title"
      />

      <el-divider />

      <div v-show="!isEdit" class="content" v-html="docData.content"></div>

      <tinymce-editor
        v-show="isEdit"
        ref="editor"
        :baseUrl="baseUrl"
        v-model="docData.content"
        @input="onInput"
        @clear="clear"
      ></tinymce-editor>

      <el-divider />
      <div v-show="doc.area_display_name">
        <div>分类：</div>
        <div class="tag">
          <el-tag tag="success">{{ doc.area_display_name }}</el-tag>
        </div>
      </div>

      <comment
        :avatar="user.user_avatar && user.user_avatar.avatar_url"
        :authorId="user.system_id && Number(user.system_id)"
        :commentList="commentList"
        :commentNum="commentList.length"
        @doSend="doSend"
        @doChidSend="doChidSend"
        @doUpdate="doUpdate"
        @doChildUpdate="doChildUpdate"
        ref="comment"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import comment from 'hbl-comment'
import comment from '@/components/Comment'
import { Http } from '@/utils/http'
import {
  messageError,
  messageSuccsess,
  messageWarning,
  confirmMessage,
} from '@/utils/elementTools'
import { mixParams } from '@/utils/mixParams'
import { Check } from '@/utils/check'
import TinymceEditor from '@/components/tinymce-editor'

export default {
  data() {
    return {
      hasConfig: false,
      loading: true,
      doc: {},
      docData: {},
      replayConfig: {
        max_picture_size: 0,
        max_pictures: 0,
        max_words: 0,
      },
      temp: '',
      isEdit: false,
      commentList: [
        // {
        //   id: 123,
        //   commentUser: {
        //     id: 31,
        //     nickName: 'mask',
        //     avatar: ''
        //   },
        //   targetUser: {
        //     id: 30,
        //     nickName: 'mask2',
        //     avatar: ''
        //   },
        //   content: 'wqeweqweqewqewq',
        //   createDate: '2020-1-1'
        // }
      ],
    }
  },
  computed: {
    ...mapGetters(['user']),
  },
  mounted() {
    const topicId = this.$route.params.topicId
    if (!topicId) window.location.href = '/'
    this.getTopic(topicId)
    // 关闭聚焦打开表情框
    this.$refs.comment.pBodyMap[0] = true
    this.getConfig()
    this.getReply(topicId)
  },
  methods: {
    //事件处理器
    onInput() {
      const length = tinyMCE.activeEditor
        .getContent()
        .replace(/(<([^>]+)>)/gi, '').length
      if (length > 10000) {
        this.$message({
          message: '字符超出限制',
          type: 'warning',
        })
        this.publishBtn = true
      } else {
        this.publishBtn = false
      }
    },
    clear() {
      this.$refs.editor.clear()
    },
    // 获取回复配置
    async getConfig() {
      const params = mixParams.mix('Get Reply Configuration')
      const data = await Http.request({
        url: '/Community/Reply_Configuration',
        data: params,
        method: 'POST',
      })
      if (data && data.data) {
        this.hasConfig = true
        this.replayConfig = data.data
      }
    },
    // 获取主题
    async getTopic(topicId) {
      let params = {
        topic: JSON.stringify({
          system_id: topicId,
        }),
      }
      // console.log(params)
      params = mixParams.mix('Get Topic', params)
      const data = await Http.request({
        url: '/Community/Topic',
        data: params,
        method: 'POST',
      })
      if (data) {
        this.doc = data.data
        this.docData = data.data.topic
        this.loading = false
      } else {
        alert('获取失败')
        window.location = '/'
      }
    },
    // 编辑主题
    async editTopic() {
      this.temp = this.docData.content
      this.isEdit = true
    },
    // 保存编辑主题
    async doEdit() {
      let params = {
        topic: JSON.stringify(this.docData),
      }
      // console.log(params)
      params = mixParams.mix('Update Topic', params)
      const data = await Http.request({
        url: '/Community/Topic',
        data: params,
        method: 'POST',
      })
      if (data) {
        messageSuccsess('修改成功！')
        this.isEdit = false
      } else {
        this.cancelTopic()
        messageWarning('修改失败！')
      }
    },
    // 取消编辑
    cancelTopic() {
      this.docData.content = this.temp
      this.isEdit = false
    },
    // 删除主题
    delTopic() {
      let params = {
        topic: JSON.stringify({
          system_id: this.docData.system_id,
        }),
      }
      // console.log(params)
      params = mixParams.mix('Delete Topic', params)
      confirmMessage('确定删除这个主题么？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const data = await Http.request({
            url: '/Community/Topic',
            data: params,
            method: 'POST',
          })
          if (data) {
            alert('删除成功！')
            window.location = '/'
          } else {
            messageWarning('删除失败！')
            return
          }
        })
        .catch(() => {})
    },
    // 获取回复列表
    async getReply(topicId) {
      let params = {
        topic: JSON.stringify({
          // 'system_id': '1f1afdce0d5d4426a46bdeb64c7b39ea'
          system_id: topicId,
        }),
      }
      params = mixParams.mix('Get Topic Replies', params)
      const data = await Http.request({
        url: '/Community/Reply',
        data: params,
        method: 'POST',
      })
      if (data) {
        this.commentList = data.data
      } else {
        this.$refs.comment.loading = false
      }
    },
    // 回复
    async doSend(content) {
      const user = this.user
      let params = {
        reply: JSON.stringify({
          system_id: '',
          content: content,
          topic: this.docData.system_id,
          user: user.system_id,
          quoted_reply: '',
          author: '',
          status: '',
          created_on: '',
        }),
      }
      if (!Check.topicText(content, this.replayConfig.max_words)) return
      if (!Check.topicImg(content)) return
      params = mixParams.mix('Create Reply', params)
      const data = await Http.request({
        url: '/Community/Reply',
        data: params,
        method: 'POST',
      })
      if (data) {
        messageSuccsess('发布成功！')
        this.commentList.push(data.data)
        this.$refs.comment.clear()
      } else {
        messageError('发布失败！')
      }
    },
    // 楼中楼回复
    async doChidSend(content, bid, pid, idx) {
      console.log(pid, 'pid')
      const user = this.user
      let params = {
        reply: JSON.stringify({
          quoted_user: bid,
          system_id: '',
          content: content,
          topic: this.docData.system_id,
          user: user.system_id,
          quoted_reply: pid,
          author: '',
          status: '',
          created_on: '',
        }),
      }
      if (!Check.topicText(content, this.replayConfig.max_words)) return
      if (!Check.topicImg(content)) return
      params = mixParams.mix('Create Reply', params)
      const data = await Http.request({
        url: '/Community/Reply',
        data: params,
        method: 'POST',
      })
      if (data) {
        const targetMsg = this.commentList.find((item) => item.id == pid)
        messageSuccsess('发布成功！')
        targetMsg.childrenList.push(data.data)
        this.$refs.comment.cancel(idx)
      } else {
        messageError('发布失败！')
      }
    },
    // 回复编辑
    async doUpdate(reply, that) {
      const user = this.user
      const content = reply.content
      let params = {
        reply: JSON.stringify({
          system_id: reply.id,
          content: content,
          topic: this.docData.system_id,
          user: user.system_id,
          quoted_reply: '',
          status: '',
          created_on: reply.createDate,
        }),
      }

      if (!Check.topicText(content, this.replayConfig.max_words)) return
      if (!Check.topicImg(content)) return
      params = mixParams.mix('Update Reply', params)
      const data = await Http.request({
        url: '/Community/Reply',
        data: params,
        method: 'POST',
      })
      if (data) {
        messageSuccsess('修改成功！')
        that.closeEdit(reply)
        this.$refs.comment.clear()
      } else {
        // const targetMsg = this.commentList.find((item) => item.id == reply.id)
        that.cancelEdit(reply)
        messageError('修改失败！')
      }
    },
    // 楼中楼回复编辑
    async doChildUpdate(reply, bid, pid, idx, that) {
      const user = this.user
      const content = reply.content
      let params = {
        reply: JSON.stringify({
          system_id: reply.id,
          content: content,
          topic: this.docData.system_id,
          user: user.system_id,
          quoted_reply: pid,
          author: '',
          status: '',
          created_on: reply.createDate,
        }),
      }
      if (!Check.topicText(content, this.replayConfig.max_words)) return
      if (!Check.topicImg(content)) return
      params = mixParams.mix('Update Reply', params)
      const data = await Http.request({
        url: '/Community/Reply',
        data: params,
        method: 'POST',
      })
      if (data) {
        messageSuccsess('修改成功！')
        that.closeEdit(reply)
      } else {
        that.cancelEdit(reply)
        messageError('修改失败！')
      }
    },
  },
  components: {
    comment,
    TinymceEditor,
  },
}
</script>

<style style="css" scoped>
.container {
  height: calc(100vh - 83px);
  overflow-y: visible;
  overflow-x: hidden;
}
.main {
  max-width: 960px;
}
.title {
  display: block;
  border: 0;
  width: 100%;
  text-align: center;
  margin: 0.67em 0;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.5;
}
.content {
  line-height: 2.4rem;
  overflow: auto;
}
.subtitle {
  display: flex;
  flex-direction: row;
  font-size: 14px;
  justify-content: space-between;
}
.subtitle div {
  margin: 10px 0px;
}
.tag {
  margin: 16px 0 0 20px;
}
</style>

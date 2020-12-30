<template>
  <div class="container">
    <div class="main">
      <div class="subtitle">
        <div>
          <div v-show="doc.author">
            <i style="color: #409EFF;" class="el-icon-user-solid"></i>
            {{doc.author}}
          </div>
          <div v-show="docData.created_on" style="color: #909399;">发表于： {{docData.created_on}}</div>
        </div>
      </div>
      <h1 class="title">{{docData.title}}</h1>

      <el-divider />

      <div class="content" v-html="docData.content"></div>

      <el-divider />
      <div v-show="doc.area_display_name">
        <div>分类：</div>
        <div class="tag">
          <el-tag tag="success">{{doc.area_display_name}}</el-tag>
        </div>
      </div>
      <comment
        v-show="user.system_id"
        :avatar="user.user_avatar && user.user_avatar.avatar_small_url"
        :authorId="user.system_id && Number(user.system_id)"
        :commentList="commentList"
        :commentNum="commentList.length"
        @doSend="doSend"
        @doChidSend="doChidSend"
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
import { messageError, messageSuccsess } from '@/utils/elementTools'
import { mixParams } from '@/utils/mixParams'
import { Check } from '@/utils/check'

export default {
  data () {
    return {
      doc: {},
      replayConfig: {
        max_picture_size: 0,
        max_pictures: 0,
        max_words: 0
      },
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
      ]
    }
  },
  computed: {
    docData () {
      const doc = this.$route.params.doc
      return doc ? doc.topic : ''
    },
    ...mapGetters([
      'user'
    ])
  },
  mounted () {
    this.doc = this.$route.params.doc
    // 关闭聚焦打开表情框
    this.$refs.comment.pBodyMap[0] = true
    if (this.doc && this.doc.topic && this.doc.topic.system_id) {
      this.getConfig()
      this.getReply()
    } else {
      window.location.href = '/'
    }
  },
  methods: {
    // 获取回复配置
    async getConfig () {
      const session = localStorage.getItem('_userSess')
      const params = {
        authentication: JSON.stringify({
          system_id: session
        })
      }
      const data = await Http.request({
        url: '/Community/Reply_Configuration',
        data: params,
        method: 'POST'
      })
      if (data && data.data) this.replayConfig = data.data
    },
    // 获取回复列表
    async getReply () {
      let params = {
        'topic': JSON.stringify({
          // 'system_id': '1f1afdce0d5d4426a46bdeb64c7b39ea'
          'system_id': this.doc.topic.system_id
        })
      }
      params = mixParams.mix('Get Topic Replies', params)
      const data = await Http.request({
        url: '/Community/Reply',
        data: params,
        method: 'POST'
      })
      const res = data.data
      if (res && res.length) {
        this.commentList = res
      }
    },
    // 回复
    async doSend (content) {
      const user = this.user
      let params = {
        'reply': JSON.stringify({
          'system_id': '',
          'content': content,
          'topic': this.docData.system_id,
          'user': user.system_id,
          'quoted_reply': '',
          'author': '',
          'status': '',
          'created_on': ''
        })
      }
      if (!Check.topicText(content, this.max_words)) return
      if (!Check.topicImg(content)) return
      params = mixParams.mix('Create Reply', params)
      const data = await Http.request({
        url: '/Community/Reply',
        data: params,
        method: 'POST'
      })
      const res = data.data
      if (res) {
        messageSuccsess('发布成功！')
        this.commentList.push(res)
        this.$refs.comment.clear()
      } else {
        messageError('发布失败！')
      }
    },
    // 楼中楼回复
    async doChidSend (content, bid, pid, idx) {
      console.log(bid, 'bid')
      const user = this.user
      let params = {
        'reply': JSON.stringify({
          'system_id': '',
          'content': content,
          'topic': this.docData.system_id,
          'user': user.system_id,
          'quoted_reply': pid,
          'author': '',
          'status': '',
          'created_on': ''
        })
      }
      if (!Check.topicText(content, this.max_words)) return
      if (!Check.topicImg(content)) return
      params = mixParams.mix('Create Reply', params)
      const data = await Http.request({
        url: '/Community/Reply',
        data: params,
        method: 'POST'
      })
      const res = data.data
      if (res) {
        const targetMsg = this.commentList.find(item => item.id == pid)
        messageSuccsess('发布成功！')
        targetMsg.childrenList.push(res)
        this.$refs.comment.cancel(idx)
      } else {
        messageError('发布失败！')
      }
    }
  },
  components: {
    comment
  }
}
</script>

<style style="css" scoped>
.main {
  max-width: 960px;
}
.title {
  text-align: center;
  margin: 0.67em 0;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.5;
}
.content {
  line-height: 2.4rem;
}
.subtitle {
  display: flex;
  flex-direction: row;
  font-size: 14px;
}
.subtitle div {
  margin: 10px 0px;
}
.tag {
  margin: 16px 0 0 20px;
}
</style>
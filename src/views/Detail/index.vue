<template>
  <div class="container">
    <div class="main">
      <div class="subtitle">
        <div>
          <div v-show="doc.author">
            <i style="color: #409EFF;" class="el-icon-user-solid"></i> {{doc.author}}
          </div>
          <div v-show="docData.created_on" style="color: #909399;">发表于： {{docData.created_on}}</div>
        </div>
      </div>
      <h1 class="title">{{docData.title}}</h1>
      <div class="content" v-html="docData.content"></div>

      <div v-show="docData.area">
        <el-divider />
        <div>分类：</div>
        <div class="tag">
          <el-tag tag="success">
            {{docData.area}}
          </el-tag>
        </div>
      </div>
      <comment
        v-show="user.system_id"
        :avatar="user.user_avatar && baseUrl + user.user_avatar.avatar_small_url"
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
import comment from 'hbl-comment'
import { Http } from '@/utils/http'

export default {
  data() {
    return {
      doc: {},
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
    docData(){
      const doc = this.$route.params.doc
      return doc ? doc.topic : ''
    },
    ...mapGetters([
      'user',
      'baseUrl'
    ])
  },
  mounted(){
    this.doc = this.$route.params.doc
    // 关闭聚焦打开表情框
    this.$refs.comment.pBodyMap[0] = true
    if(this.doc && this.doc.topic && this.doc.topic.system_id){
      this.getReply()
    } else {
      window.location.href = '/'
    }
  },
  methods: {
    // 获取回复列表
    async getReply(){
      const session = localStorage.getItem('_userSess')
      const params = {
        'authentication': JSON.stringify({
          'system_id': session
        }),
        'topic': JSON.stringify({
          // 'system_id': '1f1afdce0d5d4426a46bdeb64c7b39ea'
          'system_id': this.doc.topic.system_id
        }),
        'authorization': JSON.stringify({
          'system_id': '',
          'mobile': '',
          'sms_pin': '',
          'transaction': 'Get Topic Replies'
        })
      }
      const data = await Http.request({
        url: '/Community/Reply',
        data: params,
        method: 'POST'
      })
      // this.$refs.comment.pBodyMap[msg.id] = true
      const res = data.data
      if(res && res.length){
        this.commentList = res
      }
    },
    // 回复
    async doSend(content){
      const session = localStorage.getItem('_userSess')
      const user = this.user
      const targetUser = this.doc
      const params = {
        'authentication': JSON.stringify({
          'system_id': session
        }),
        'reply': JSON.stringify({
          'system_id': '',
          'content': content,
          'topic': targetUser.system_id,
          'user': user.system_id,
          'author': '',
          'status': '',
          'created_on': ''
        }),
        'authorization': JSON.stringify({
          'system_id': '',
          'mobile': '',
          'sms_pin': '',
          'transaction': 'Create Reply'
        })
      }
      const data = await Http.request({
        url: '/Community/Reply',
        data: params,
        method: 'POST'
      })

      // console.log(msg)
      // // 关闭聚焦打开表情框（消息id）
      // this.$refs.comment.pBodyMap[msg.id] = true
      const res = data.data
      if(res){
        this.commentList.push(res)
      } else {
        this.$message({
          message: '发布失败！',
          type: 'error'
        })
      }
    },
    // 楼中楼回复
    async doChidSend(content,bid,pid){
      const user = this.user
      const session = localStorage.getItem('_userSess')
      const params = {
        'authentication': JSON.stringify({
          'system_id': session
        }),
        'reply': JSON.stringify({
          'system_id': '',
          'content': content,
          'topic': this.docData.system_id,
          'user': user.system_id,
          'quoted_reply': pid,
          'author': '',
          'status': '',
          'created_on': ''
        }),
        'authorization': JSON.stringify({
          'system_id': '',
          'mobile': '',
          'sms_pin': '',
          'transaction': 'Create Reply'
        })
      }
      const data = await Http.request({
        url: '/Community/Reply',
        data: params,
        method: 'POST'
      })
      const res = data.data
      if(res){
        const targetMsg = this.commentList.find(item => item.id == pid)
        targetMsg.childrenList.push(res)
      } else {
        this.$message({
          message: '发布失败！',
          type: 'error'
        })
      }
    }
  },
  components:{
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
  margin: .67em 0;
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
.subtitle div{
  margin: 10px 0px;
}
.tag {
  margin: 10px 0 0 0;
}
</style>
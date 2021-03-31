<template>
  <div class="container">
    <div class="main">
      <el-tabs class="tab-item" v-model="activeName">
        <el-tab-pane label="我的发贴" name="myPublish">
          <!-- <b class="title">我的发贴</b>
          <el-divider /> -->

          <ul v-infinite-scroll="loadList" class="infinite-list list">
            <li
              @click="toDetail(item)"
              class="card infinite-list-item"
              v-for="item in recentList"
              :key="item.topic.system_id"
            >
              <!-- <div class="subtitle">
                <div>
                  {{ item.author }}
                </div>
              </div> -->
              <div class="title">
                <h2>{{ item.topic.title }}</h2>
              </div>
              <div class="subtitle">
                <b style="margin-right: 6px;">{{ item.author }}</b> 发表于
                {{ item.topic.created_on }}
              </div>
              <!-- <div class="subtitle">发表于 {{ item.topic.created_on }}</div> -->
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { Http } from '@/utils/http'
import { mixParams } from '@/utils/mixParams'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      activeName: 'myPublish',
      recentList: [],
      pageNo: 0,
      pageCount: 5,
    }
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    loadList() {
      this.pageNo += 1
      this.loadRecent()
    },
    async loadRecent() {
      const session = this.user.system_id || ''
      let params = {
        page_no: this.pageNo,
        topics_per_page: this.pageCount,
        user: JSON.stringify({
          system_id: session || '',
        }),
      }
      params = mixParams.mix('Get Topics', params)
      const data = await Http.request({
        url: '/Community/Topic',
        data: params,
        method: 'POST',
      })
      if (data && data.data && data.data.length) {
        this.recentList = this.recentList.concat(data.data)
      }
    },
    toDetail(item) {
      this.$router.push({
        name: 'detail',
        params: {
          topicId: item.topic.system_id,
        },
      })
    },
  },
}
</script>

<style scoped>
.list {
  max-height: 520px;
  overflow: auto;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.list::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.card {
  cursor: pointer;
  color: #909090;
  padding-bottom: 10px;
  line-height: 26px;
  border-bottom: #eee solid 1px;
}
.subtitle {
  display: flex;
  flex-direction: row;
  font-size: 14px;
  margin-top: 6px;
}
.subtitle div {
  margin: 10px 0px;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: #000;
  margin: 18px 0 48px 0;
}
.title-box {
  cursor: pointer;
  border: 1px solid #eee;
  display: flex;
  margin: 0 4px;
  padding: 4px 8px;
  height: 16px;
  line-height: 16px;
  font-size: 12px;
}
.title-img {
  width: 60px;
  height: 60px;
}
</style>

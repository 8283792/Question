<template>
  <div class="container">
    <el-card v-if="notice" class="box-card">
      <div v-html="notice"></div
    ></el-card>
    <div class="main">
      <el-tabs v-model="activeName" class="card-wrapper" type="card">
        <el-tab-pane label="主题" name="first" class="tab">
          <ul v-infinite-scroll="loadList" class="infinite-list list">
            <li
              @click="toDetail(item)"
              class="card infinite-list-item"
              v-for="item in recentList"
              :key="item.topic.system_id"
            >
              <!-- <div class="subtitle">
                <div>
                  {{ item.topic.area }}
                  <span v-show="item.author">/</span>
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
            </li>
          </ul>
        </el-tab-pane>

        <!-- <el-tab-pane label="最新" name="second">最新</el-tab-pane>
        <el-tab-pane label="热榜" name="third">热榜</el-tab-pane> -->
      </el-tabs>
    </div>

    <footer class="footer">
      ©&nbsp;2021 SAP专家吧
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;互联网ICP备案：沪ICP备2020032135号-1
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系管理员：QQ 283273794
    </footer>
  </div>
</template>

<script>
import { Http } from '@/utils/http'
import {
  messageError,
  messageSuccsess,
  messageWarning,
} from '@/utils/elementTools'
import { mixParams } from '@/utils/mixParams'

export default {
  data: function() {
    return {
      recentList: [],
      activeName: 'first',
      pageNo: 0,
      pageCount: 5,
      notice: '',
    }
  },
  mounted() {
    this.getConfig()
  },
  methods: {
    async getConfig() {
      const params = mixParams.mix('Get Community Config')
      const data = await Http.request({
        url: '/Community/Community_Config',
        data: params,
        method: 'POST',
      })
      if (data && data.data) {
        this.notice = data.data.notice
      }
    },
    loadList() {
      this.pageNo += 1
      this.loadRecent()
    },
    async loadRecent() {
      let params = {
        page_no: this.pageNo,
        topics_per_page: this.pageCount,
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
.wrapper {
  min-height: calc(100vh - 133px);
}
.main {
  max-width: 960px;
  padding: 0;
}
.list {
  max-height: 545px;
  overflow: auto;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.list::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
/* .el-tabs__item {
  font-size: 16px !important;
  color: #909090;
} */
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
  font-size: 16px;
  color: #000;
  margin: 18px 0 12px 0;
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
.ding {
  display: flex;
  align-items: center;
}
.card-wrapper .el-tab-pane {
  padding: 0 14px 12px 14px;
}
.tab {
  margin-top: -18px;
}
.box-card {
  width: 960px;
  margin: 0 auto;
}
.footer {
  background: #f4f5f5;
  max-width: 960px;
  text-align: center;
  color: #82848a;
  position: fixed;
  left: 25%;
  bottom: 10px;
}
</style>

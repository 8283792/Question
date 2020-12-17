<template>
  <div class="container wrapper">
    <div class="main">
      <el-tabs v-model="activeName" class="card-wrapper" type="card">
        <el-tab-pane label="热门" name="first">

          <ul v-infinite-scroll="loadList" class="infinite-list list">
            <li @click="toDetail(item)" class="card infinite-list-item" v-for="item in recentList" :key="item.topic.system_id">
              <div class="subtitle">
                <div>{{item.topic.area}}
                  <span v-show="item.author">/</span>
                  {{item.author}}
                </div>
              </div>
              <div class="title">
                <b>{{item.topic.title}}</b>
              </div>
              <div class="subtitle">发表于 {{item.topic.created_on}}</div>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="最新" name="second">最新</el-tab-pane>
        <el-tab-pane label="热榜" name="third">热榜</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { Http } from '@/utils/http'
import { messageError, messageSuccsess, messageWarning } from '@/utils/elementTools'
import { mixParams } from '@/utils/mixParams'

export default {
  data: function(){
    return {
      recentList: [],
      activeName: 'first',
      pageNo: 0,
      pageCount: 5
    }
  },
  mounted(){
    // this.loadRecent()
  },
  methods: {
    loadList(){
      this.pageNo += 1
      this.loadRecent()
    },
    async loadRecent(){
      let params = {
        'page_no': this.pageNo,
        'topics_per_page': this.pageCount
      }
      params = mixParams.mix('Get Topics', params)
      const data = await Http.request({
        url: '/Community/Topic',
        data: params,
        method: 'POST'
      })
      if (data.data && data.data.length) {
        this.recentList = this.recentList.concat(data.data)
      }
    },
    toDetail(item){
      this.$router.push({
        name: 'detail',
        params: {
          doc: item
        }
      })
    }
  }
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
  max-height: 650px;
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
}
.subtitle div{
  margin: 10px 0px;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: #000;
  margin: 0;
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
</style>
<template>
  <div class="container">
    <div class="main">
      <el-tabs v-model="activeName" class="card-wrapper" type="card">
        <el-tab-pane label="热门" name="first">
          <div class="list">
            <div class="card">
              <div class="subtitle">
                <div>zeka</div>
                <div>3小时前</div>
                <div>Vue.js / 前端</div>
              </div>

              <div class="title">
                <b>或许这就是下一代组件库</b>
                <img class="title-img" src="https://www.baidu.com/img/flexible/logo/pc/result@2.png" alt="">
              </div>

              <div class="ding">
                <a class="title-box">
                  <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMGgxNnYxNkgweiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiNCMkJBQzIiIGQ9Ik00LjIzNCA2LjY5M3Y3LjI0M0gyLjg4MWMtLjQ4NiAwLS44ODEtLjQ5Mi0uODgxLTEuMDk1VjcuODc1YzAtLjYzLjQxMi0xLjE4Mi44OC0xLjE4MmgxLjM1NHptMy42ODgtMy43QzguMDEgMi40MDQgOC40OSAxLjk5IDkuMDE4IDJjLjc1NC4wMTUgMS4yMDQuNjYzIDEuMzYuOTgzLjI4NC41ODUuMjkyIDEuNTQ5LjA5NyAyLjE2Ny0uMTc3LjU2LS41ODYgMS4yOTYtLjU4NiAxLjI5NmgzLjA2NmMuMzI0IDAgLjYyNS4xNjQuODI2LjQ0OS4yMDQuMjkuMjcuNjY4LjE3OCAxLjAxMWwtMS4zODcgNS4xODNjLS4xMjYuNDk5LS41NDQuODQ3LTEuMDE2Ljg0N0g1LjUzVjYuNjkzYzEuMzg1LS4zMDkgMi4yMzYtMi42MzIgMi4zOTItMy43eiIvPgogICAgPC9nPgo8L3N2Zz4K" class="icon">
                  <span class="count">
                    26
                  </span>
                </a>

                <a class="title-box">
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHRpdGxlPjc1MzFEREU0LTZCMzgtNDI4Ny04QTJBLUY2ODVGMDgzNUFGQzwvdGl0bGU+PGRlZnM+PHJlY3QgaWQ9ImEiIHg9IjU5IiB5PSI1NCIgd2lkdGg9IjU0IiBoZWlnaHQ9IjI1IiByeD0iMSIvPjxtYXNrIGlkPSJiIiB4PSIwIiB5PSIwIiB3aWR0aD0iNTQiIGhlaWdodD0iMjUiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI2EiLz48L21hc2s+PC9kZWZzPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02OCAtNTYpIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNCMkJBQzIiIGQ9Ik03MiA2MXY4LjAzOGg0LjQ0NEw4MS4xMTEgNzJ2LTIuOTYySDg0VjYxeiIvPjx1c2Ugc3Ryb2tlPSIjRURFRUVGIiBtYXNrPSJ1cmwoI2IpIiBzdHJva2Utd2lkdGg9IjIiIHhsaW5rOmhyZWY9IiNhIi8+PC9nPjwvc3ZnPg==" class="icon">
                  <span class="count">
                    10
                  </span>
                </a>
              </div>
            </div>
            
          </div>
        </el-tab-pane>
        <el-tab-pane label="最新" name="second">最新</el-tab-pane>
        <el-tab-pane label="热榜" name="third">热榜</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data: function(){
    return {
      activeName: 'first'
    }
  }
}
</script>

<style>
.container {
  min-height: 780px;
  background: #f4f5f5;
  padding: 10px 0;
}
.main {
  background: #fff;
  max-width: 960px;
  margin: 10px auto;
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
  margin: 0 4px;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: #000;
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
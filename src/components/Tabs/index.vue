<template>
  <div class="tabs">
    <ul @click="routeTo($event)" class="tabs-wrapper">
      <li>
        <a
          :class="routeHash == '#/home/recommend' ? 'nav-active' : ''"
          href="#/home/recommend"
          >推荐</a
        >
      </li>
      <!-- <li>
        <a :class="routeHash == '#/home/backEnd' ? 'nav-active' : ''" href="#/home/backEnd">后端</a>
      </li>
      <li>
        <a :class="routeHash == '#/home/frontEnd' ? 'nav-active' : ''" href="#/home/frontEnd">前端</a>
      </li>
      <li>
        <a :class="routeHash == '#/' ? 'nav-active' : ''" href>Android</a>
      </li>
      <li>
        <a :class="routeHash == '#/' ? 'nav-active' : ''" href>IOS</a>
      </li>
      <li>
        <a :class="routeHash == '#/' ? 'nav-active' : ''" href>人工智能</a>
      </li>
      <li>
        <a :class="routeHash == '#/' ? 'nav-active' : ''" href>开发工具</a>
      </li>
      <li>
        <a :class="routeHash == '#/' ? 'nav-active' : ''" href>代码人生</a>
      </li>
      <li>
        <a :class="routeHash == '#/' ? 'nav-active' : ''" href>阅读</a>
      </li> -->
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routeHash: '#/home/recommend',
    }
  },
  methods: {
    routeTo($ev) {
      if ($ev.target.tagName == 'A') {
        this.routeHash = $ev.target.hash
      }
    },
  },
}
</script>

<style lang="css" scoped>
.tabs {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  background: #ffffff;
}
.tabs-wrapper {
  max-width: 960px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;
}
.tabs-wrapper li {
  margin: 0 10px;
}
.tabs-wrapper a {
  font-size: 14px;
}
</style>

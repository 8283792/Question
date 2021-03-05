<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from '@/views/Home'

export default {
  name: 'app',
  components: {
    Home,
  },
}
</script>

<style lang="css">
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
font,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  /* font-size: 100%; */
  vertical-align: baseline;
  background: transparent;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
a {
  font-size: 16px;
  text-decoration: none;
  color: #71777c;
  cursor: pointer;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
:focus {
  outline: 0;
}
ins {
  text-decoration: none;
}
del {
  text-decoration: line-through;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

.search input {
  height: 32px;
}
.el-tabs__item {
  font-size: 14px !important;
  font-weight: 400;
  color: #909090;
}
.el-tabs__content {
  padding: 14px 14px 10px 8px;
}
.nav-active {
  color: #007fff;
}
.submit-button {
  font-size: 16px;
  width: 340px;
  font-weight: 400;
}
.container {
  /* min-height: 780px; */
  min-height: calc(100vh - 83px);
  background: #f4f5f5;
  padding: 10px 0;
}
.main {
  background: #fff;
  padding: 10px 40px;
  max-width: 600px;
  margin: 10px auto;
}
.title {
  font-size: 20px;
  margin-top: 20px;
}
.edit-box {
  display: flex;
  align-items: center;
  font-size: 16px;
}
.edit-left {
  display: block;
  width: 100px;
}
.edit-right {
  display: flex;
  font-size: 12px;
  color: #9c9c9c;
  align-items: center;
}
.edit-ipt {
  height: 28px;
  line-height: 28px;
  border: 0;
  font-size: 16px;
  color: #9c9c9c;
  width: 400px !important;
  padding: 0;
  margin-right: 10px;
  vertical-align: middle;
}
</style>

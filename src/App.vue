<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from "@/views/Home";

export default {
  name: 'app',
  components: {
    Home
  }
}
</script>

<style lang="css">
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, font, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td {
	margin: 0;
	padding: 0;
	border: 0;
	outline: 0;
	font-size: 100%;
	vertical-align: baseline;
	background: transparent;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
a {
	font-size: 16px;
  text-decoration: none;
  color: #71777c;
	cursor: pointer;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
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
.el-tabs__item{
	font-size: 14px !important;
	font-weight: 400;
	color: #909090;
}
.el-tabs__content {
	padding: 14px 14px 10px 8px;
}
.nav-active {
  color: #007fff
}
.submit-button {
  font-size: 16px;
  width: 340px;
  font-weight: 400;
}
</style>

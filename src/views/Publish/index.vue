<template>
  <div class="container">
    <div class="main">
      <el-tabs class="tab-item" v-model="activeName">
        <el-tab-pane label="文章发布" name="publish">
          <b class="title">文章发布</b>
            <el-divider />
            <div class="edit-box">
              <span class="edit-left">标题</span>
              <span class="edit-right">
                <input type="text" class="edit-ipt" v-model="document.title" placeholder="请输入标题">
                <!-- <el-button type="primary" icon="el-icon-edit" size="small">修改</el-button> -->
              </span>
            </div>
            <el-divider />

            <div class="edit-box">
              <span class="edit-left">分类</span>
              <span class="edit-right">
                <el-select v-model="document.selectedValue" placeholder="请选择">
                  <el-option
                    v-for="item in document.classify"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </span>
            </div>
            <el-divider />
            {{ msg }}
            <tinymce-editor ref="editor"
              baseUrl="static"
              v-model="msg"
              :disabled="disabled"
              @onClick="onClick">
            </tinymce-editor>
            <div class="btn-wrapper">
              <el-button type="primary" @click="clear">清空</el-button>
              <el-button type="primary" @click="pubilsh">发布</el-button>
            </div>
        </el-tab-pane>
      </el-tabs>
      </div>
  </div>
</template>


<script>
import TinymceEditor from '@/components/tinymce-editor'
export default {
  components: {
    TinymceEditor
  },
  data () {
    return {
      document: {
        title: '',
        classify: [{
          value: 'backEnd',
          label: '后端'
        }, {
          value: 'frontEnd',
          label: '前端'
        }, {
          value: 'Android',
          label: 'Android'
        }, {
          value: 'IOS',
          label: 'IOS'
        }, {
          value: 'AI',
          label: '人工智能'
        }, {
          value: 'developTools',
          label: '开发工具'
        }],
        selectedValue: ''
      },
      activeName: 'publish',
      msg: 'Welcome to Use Tinymce Editor',
      disabled: false // 禁用富文本
    }
  },
  methods: {
    // 鼠标单击的事件
    onClick (e, editor) {
      console.log('Element clicked')
      console.log(e)
      console.log(editor)
    },
    // 清空内容
    clear () {
      this.$refs.editor.clear()
    },
    pubilsh(){
      alert('发布')
    }
  }
}
</script>

<style lang="css" scoped>
.btn-wrapper {
  margin: 20px auto;
  text-align: center;
}
</style>
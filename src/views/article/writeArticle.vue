<template>
  <div >
    <div class="article">
    <div class="arti-head">
      <h3>发布文章</h3>
    </div>
    <el-input class="arti-title" v-model="title" size="small" placeholder="请输入标题"></el-input>
    <el-button type="primary" @click="publishArticle()">发布文章</el-button>
    <el-button type="primary" plain @click="publishArticle()">保存草稿</el-button>
    <WangEditor v-model="artiContent" :isClear="isClear"></WangEditor>

    </div>
</div>
</template>

<script>
import WangEditor from "@/components/WangEditor";
import { Message } from 'element-ui';

export default {
   components: {
      WangEditor
  	},
    data() {
      return {
          title: '',
          isClear: false,
          artiContent: ''
        }
      },
    methods: {
      //发布文章
      publishArticle(){
        this.api({
          method: 'post',
          url: '/article/addArticle',
          data: {
            title: this.title,
            artiContent: this.artiContent
          }
        }).then(res=> {
          this.addMessage(res);
        }),err=>{
          
        }
      },
      //成功消息提示框
      addMessage(message){
        this.$message({
          showClose: true,
          message: message,
          type: 'success'
        });
      }
    }
}
</script>

<style scoped>
.article{
  padding-left: 30px;
}
.arti-head{
  border-left: 4px #0081FF solid;
}
h3{
  padding-left: 5px;
}
.arti-title{
  width: 1000px;
  padding-right: 10px;
}
</style>


<template>
  <div >
    <div class="article">
    <div class="arti-head">
      <h3>发布文章</h3>
    </div>
    <div>
      <el-form :model="article" style="width: 99%;">
        <el-row :gutter="20">
          <el-col :span="12">        
            <el-form-item label="文章标题" prop="title">
              <el-input v-model="article.title" placeholder="请输入标题" style="width: 92%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">        
            <el-form-item label="作者" prop="author">
              <el-input v-model="article.author" placeholder="请输入作者" style="width: 92%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-col :span="24">
          <el-form-item label="">
            <mavon-editor v-model="article.artiContent"/>
          </el-form-item>
        </el-col>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文章分类">
              <el-select v-model="article.type" placeholder="请选择分类" style="width: 92%;">
                <el-option v-for="item in articleTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="文章标签">
              <el-select style="width: 92%;"
                v-model="article.tag"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择文章标签（输入可添加新标签）">
                <el-option
                  v-for="item in articleTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>


    </div>

    <div style="margin-top: 23px;">
      <!-- <el-card style="width: 100%;margin-top: 20px;height: 100%; ">
        <WangEditor v-model="artiContent" :isClear="isClear"></WangEditor>
      <el-card style="width: 49%; display: inline-block;margin-left: 22px;height: 100%;">
         {{ artiContent }}
      </el-card>
      </el-card> -->
      <!-- <mavon-editor v-model="article.artiContent"/> -->
    </div>

      <div style="text-align: center;">
        <el-button type="primary" @click="publishArticle()">发布文章</el-button>
        <el-button type="warning" @click=" timingDialog = true">定时发布</el-button>
        <el-button plain @click="publishArticle()">保存草稿</el-button>
      </div>

      <el-dialog
       title="定时发布"
       :visible.sync="timingDialog"
       width="30%">
        <span slot="">
          <p><span style="color: red">注：</span>发布时间不得小于当前时间，也不得大于3天</p>
          <el-date-picker
            v-model="issueTime"
            type="datetime"
            placeholder="请选择发布时间"
            align="right"
            :picker-options="pickerOptions" style="width: 99%">
          </el-date-picker>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="vertifyIssueTime()" >定时发布</el-button>
          <el-button @click="timingDialog = false">取 消</el-button>
        </span>
      </el-dialog>
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
        isClear: false,
        timingDialog: false,    //定时发布弹窗
        issueTime: '',        //发布时间
        articleTypeList: [{
          value: '1',
          label: 'Java基础'
        }, {
          value: '2',
          label: '框架源码'
        },{
          value: '3',
          label: '微服务'
        }, {
          value: '4',
          label: '中间件'
        }, {
          value: '5',
          label: '计算机基础'
        }, {
          value: '6',
          label: '前端框架'
        }],
        article:{
          title: '',
          author: '',
          artiContent: '',
          type: '',
          tag: []
        },

          
        }
      },
    methods: {
      //发布时间校验
      vertifyIssueTime(){
        if(this.issueTime < new Date()){
          Message({
            showClose: true,
            message: '发布时间不得小于当前时间',
            type: 'warning',
            duration: 3000
          })
          return;
        }
        this.timingDialog = false;
      },
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
</style>


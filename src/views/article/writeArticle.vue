<template>
  <div >
    <div style="padding-left: 30px;">
    <div class="arti-head">
      <h3>发布文章</h3>
    </div>
    <div>
      <el-form :model="article" ref="article" :rules="articleRules" style="width: 99%;">
        <el-row :gutter="20">
          <el-col :span="12">        
            <el-form-item label="文章标题" prop="title">
              <el-input v-model="article.articleTitle" placeholder="请输入标题" style="width: 92%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作者" prop="author">
              <el-input v-model="article.articleAuthor" placeholder="请输入作者" style="width: 92%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-col :span="24">
          <el-form-item label="">
            <mavon-editor v-model="article.articleContent"/>
          </el-form-item>
        </el-col>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文章分类">
              <el-select v-model="article.typeId" placeholder="请选择分类" style="width: 92%;" @change="getTypeName">
                <el-option v-for="item in articleTypeList" :key="item.typeId" :label="item.typeName" :value="item.typeId"></el-option>
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
        <el-button type="primary" @click.native.prevent="publishArticle()">发布文章</el-button>
        <el-button type="warning" @click=" timingDialog = true">定时发布</el-button>
        <el-button plain @click="saveDraft()">保存草稿</el-button>
      </div>

      <el-dialog
       title="定时发布"
       :visible.sync="timingDialog"
       width="30%">
        <span slot="">
          <p><span style="color: red">注：</span>发布时间不得小于当前时间，也不得大于3天</p>
          <el-date-picker
            v-model="article.issueTime"
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
        articleTypeList: [],
        article:{
            articleTitle: '',
            articleAuthor: '',
            articleContent: '',
            typeId: '',
            typeName: '',
            userId: '',
            issueTime: '',
            isDelayIssue: '1',
            isIssue: '0'
          },
          articleRules:{
            articleTitle: [{required: true, trigger: 'blur', message: "请输入文章标题"}],
            articleAuthor: [{required: true, trigger: 'blur', message: "请输入作者"}],
            typeId: [{required: true, trigger: 'blur', message: "请选择文章分类"}]
          }
        }
      },
      created() {
        this.getArticleTypeList();
      },
    methods: {
      getTypeName(e){
        this.articleTypeList.map((item) => {
          if(item.typeId == e){
            this.article.typeName = item.typeName;
          }
        })
      },
      getArticleTypeList(){
                this.api({
                    url: "/article/type/articleTypeList",
                    method: "get",
                    params: {
                      pageNum: 1,//页码
                      pageRow: 20,//每页条数
                    }
                }).then(res => {
                    this.articleTypeList = res.data.list;
                })
        },
      //保存文章请求
       addArticle(msg){
        this.$refs.article.validate(valid => {
          if(valid) {
            this.api({
              method: 'post',
              url: '/article/addArticle',
              // async: false,
              data: this.article
            }).then(res=> {
              //发布后清空article对象
              if(!(this.article.isIssue == 1 && this.article.isDelayIssue == 1)){
                for(let key in this.article){
                  this.article[key]  = ''
                }
              }
              this.$message({
                showClose: true,
                message: msg,
                type: 'success'
              });
            })
          }else{
            this.$message({
                showClose: true,
                message: "碧桃",
                type: 'error'
              });
            return false;
          }
        })
      },
      //发布文章
      publishArticle(){
        this.article.issueTime = new Date();
        this.article.isIssue = 0;
        this.article.isDelayIssue = 1;
        this.addArticle("发布成功");
      },
      //定时发布
      vertifyIssueTime(){
        var article = this.article;
        if(article.issueTime < new Date()){
          Message({
            showClose: true,
            message: '发布时间不得小于当前时间！',
            type: 'warning',
            duration: 3000
          })
          return;
        }
        var maximumTime = new Date();
        maximumTime = maximumTime.setDate(maximumTime.getDate() + 3);
        maximumTime = new Date(maximumTime);
        if(article.issueTime > maximumTime){
          Message({
            showClose: true,
            message: '发布时间不得大于三天！',
            type: 'warning',
            duration: 3000
          })
          return;
        }
        this.article.isDelayIssue = 0;
        this.article.isIssue = 1;
        this.addArticle("定时发布成功");
        this.timingDialog = false;
      },
      saveDraft(){
        this.article.isIssue = 1;
        this.article.isDelayIssue = 1;
        this.addArticle("保存成功");
      }
    }
}
</script>

<style scoped>
.arti-head{
  border-left: 4px #0081FF solid;
}
h3{
  padding-left: 5px;
}
</style>


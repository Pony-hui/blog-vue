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
              <el-input v-model="article.articleTitle" placeholder="请输入标题" style="width: 90%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作者" prop="author">
              <el-input v-model="article.articleAuthor" placeholder="请输入作者" style="width: 90%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="文章简介">
          <el-input
            type="textarea"
            placeholder="请输入文章简介"
            v-model="article.articleInfo"
            style="width: 93.3%"
            maxlength="200"
            show-word-limit
          >
          </el-input>
        </el-form-item>

        <el-col :span="24">
          <el-form-item label="">
            <mavon-editor v-model="article.articleContent"/>
          </el-form-item>
        </el-col>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文章分类">
              <el-select v-model="article.typeId" placeholder="请选择分类" style="width: 90%;" @change="getTypeName">
                <el-option v-for="item in articleTypeList" :key="item.typeId" :label="item.typeName" :value="item.typeId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="文章标签">
              <el-select style="width: 90%;"
                v-model="selectedTagList"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择文章标签（输入可添加新标签）">
                <el-option
                  v-for="item in articleTagList"
                  :key="item.tagId"
                  :label="item.tagName"
                  :value="item.tagId">
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
        articleTagList: [],
        selectedTagList: [],
        article:{
            articleTitle: '',
            articleAuthor: '',
            articleInfo: '',
            articleContent: '',
            typeId: '',
            typeName: '',
            tagId: '',  
            tagName: '',
            issueTime: '',
            issueStatus: ''
          },
          tags: [],
          articleRules:{
            articleTitle: [{required: true, trigger: 'blur', message: "请输入文章标题"}],
            articleAuthor: [{required: true, trigger: 'blur', message: "请输入作者"}],
            typeId: [{required: true, trigger: 'blur', message: "请选择文章分类"}]
          }
        }
      },
      created() {
        //获取分类信息
        this.getArticleTypeList();
        //获取标签信息
        this.getArticleTagList();
      },
    methods: {
      getTypeName(e){
        this.articleTypeList.map((item) => {
          if(item.typeId == e){
            this.article.typeName = item.typeName;
          }
        })
      },
      getTagName(selectedTagList){
          var articleTagList = JSON.parse(JSON.stringify(this.articleTagList));
          selectedTagList.forEach(item => {
            // debugger;
            let tagObj = {
              tagId: 0,
              tagName: ''
            };
            if(typeof item == 'number'){
              tagObj.tagId = articleTagList.find(tag => tag.tagId === item).tagId;
              tagObj.tagName = articleTagList.find(tag => tag.tagId === item).tagName;
              this.tags.push(tagObj);
            }else{
              tagObj.tagName = selectedTagList;
              this.tags.push(tagObj);
            }
          });
          console.log(this.tags);
          // for(let i = 0; i <= e.length ; i++){
          //  if(typeof e[i] === Number) {
          //    articleTagList.find(tag => tag.typeId === e[0]);
          //  }
          // }
      },
      //格式化时间
      formatTime(now){
        // let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() > 8 ? (now.getMonth() + 1) : ("0" + (now.getMonth() + 1));
        let day = now.getDate() > 9 ? now.getDate() : ( "0" + now.getDate());
        let hour = now.getHours() > 9 ? now.getHours() : ( "0" + now.getHours());
        let minute = now.getMinutes() > 9 ? now.getMinutes() : ( "0" + now.getMinutes());
        let second = now.getSeconds() > 9 ? now.getSeconds() : ( "0" + now.getSeconds());
        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
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
      //获取类别列表
      getArticleTagList(){
          this.api({
              url: "/article/tag/articleTagList",
              method: "post",
              params: {
                  pageNum: 1,//页码
                  pageRow: 200,//每页条数
                }
          }).then(res => {
              this.articleTagList = res.data.list;
              this.total = res.data.total;
          })
       },
      //保存文章请求
       addArticle(msg){
        // this.article.tagName = this.selectedTagList.join(',');
        this.getTagName(this.selectedTagList);
        var data = {
          article: this.article,
          tags: this.tags
        };
        this.selectedTagList = [];
        this.$refs.article.validate(valid => {
          if(valid) {
            this.api({
              method: 'post',
              url: '/article/addArticle',
              // async: false,
              data: data
            }).then(res=> {
              //发布后清空article对象
              if(this.article.issueStatus !== 3){
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
                message: "必填",
                type: 'error'
              });
            return false;
          }
        })
      },
      //发布文章
      publishArticle(){
        this.article.issueTime = this.formatTime(new Date());
        this.article.issueStatus = 1;
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
        this.article.issueTime = this.formatTime(this.article.issueTime);
        this.article.issueStatus = 2;
        this.addArticle("定时发布成功");
        this.timingDialog = false;
      },
      //保存草稿
      saveDraft(){
        this.article.issueStatus = 3;
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


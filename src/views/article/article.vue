<template>
  <div class="app-container">
    <div class="filter-container">
    </div>
    <div style="margin-top: 0px;">
        <el-table
            :key="itemKey"
            :data="articleList"
            border
            style="width: 100%">
            <el-table-column 
                align="center"
                type="selection"
                label="序号"
                width="50">
            </el-table-column>
            <el-table-column
                align="center"
                prop="articleTitle"
                label="文章标题"
                show-overflow-tooltip='true'
                width="180">
            </el-table-column>
            <el-table-column
                align="center"
                prop="articleAuthor"
                label="作者"
                show-overflow-tooltip='true'
                width="180">
            </el-table-column>
            <el-table-column
                align="center"
                prop="articleInfo"
                label="文章描述"
                show-overflow-tooltip='true'
                width="180">
            </el-table-column>
            <!-- <el-table-column
                align="center"
                prop="articleContent"
                show-overflow-tooltip='true'
                label="文章正文"
                width="240">
            </el-table-column> -->
            <el-table-column
                align="center"
                prop="typeName"
                label="文章分类"
                width="120">
            </el-table-column>
            <el-table-column
                align="center"
                prop="issueStatus"
                label="发布状态"
                width="120">
              <template slot-scope="scope">
                <el-tag type="primary" v-if="scope.row.issueStatus === 1">已发布</el-tag>
                <el-tag type="warning" v-else-if="scope.row.issueStatus == 2">定时发布</el-tag>
                <el-tag type="info" v-else>草稿</el-tag>
              </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="issueTime"
                label="发布时间"
                width="220">
            </el-table-column>
            <el-table-column
                align="center"
                prop="createTime"
                label="保存时间"
                width="220">
            </el-table-column>
            <el-table-column
                align="center"
                prop="updateTime"
                label="更新时间"
                width="220">
            </el-table-column>
            <el-table-column label="操作" align="center" width="180" fixed="right">
                <template slot-scope="scope">
                  <span style="color: #409EFF;cursor: pointer;font-size: 15px;" @click="articleDetail(scope.row)">查看正文</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page=pageInfo.pageNum
                :page-sizes="[10, 20, 30, 50 , 100]"
                :page-size= pageInfo.pageRow
                layout="total, sizes, prev, pager, next, jumper"
                :total= total>
            </el-pagination>
      </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        listLoading: false,//数据加载等待动画
        articleList: [],//表格的数据
        pageInfo: {
            pageNum: 1,//页码
            pageRow: 10,//每页条数
        },
        total: '',
        dialogStatus: 'create',
        dialogFormVisible: false,
        textMap: {
          update: '编辑',
          create: '创建文章'
        },
        tempArticle: {
          id: "",
          content: ""
        }
      }
    },
    created() {
      this.getAllArticle();
    },
    methods: {
      handleSizeChange(val) {
        this.pageInfo.pageRow = val;
        this.getAllArticle();
      },
      handleCurrentChange(val) {
        this.pageInfo.pageNum = val;
        this.getAllArticle();
      },

      getAllArticle() {
        //查询列表
        // if (!this.hasPerm('article:list')) {
        //   return
        // }
        this.listLoading = true;
        this.api({
          url: "/article/getAllArticle",
          method: "get",
          params: this.pageInfo
        }).then(res => {
          this.listLoading = false;
          this.articleList = res.data.list;
          this.total = res.data.total;
        })
      },
      getIndex($index) {
        //表格序号
        return (this.listQuery.pageNum - 1) * this.listQuery.pageRow + $index + 1
      },
      showCreate() {
        //显示新增对话框
        this.tempArticle.content = "";
        this.dialogStatus = "create"
        this.dialogFormVisible = true
      },
      showUpdate($index) {
        //显示修改对话框
        this.tempArticle.id = this.list[$index].id;
        this.tempArticle.content = this.list[$index].content;
        this.dialogStatus = "update"
        this.dialogFormVisible = true
      },
      createArticle() {
        //保存新文章
        this.api({
          url: "/article/addArticle",
          method: "post",
          data: this.tempArticle
        }).then(() => {
          this.getList();
          this.dialogFormVisible = false
        })
      },
      updateArticle() {
        //修改文章
        this.api({
          url: "/article/updateArticle",
          method: "post",
          data: this.tempArticle
        }).then(() => {
          this.getList();
          this.dialogFormVisible = false
        })
      },
    }
  }
</script>

<style scoped>
.el-tooltip__popper {
  max-width: 360px;
  background-color: white;
}

</style>
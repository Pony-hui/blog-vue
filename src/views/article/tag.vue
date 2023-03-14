<template>
    <div class="app-container">
        <!-- <table style="width: 98%;border-collapse:separate; border-spacing:0px 10px;">
            <tr>
                <th class="queryFormTh">操作账号：</th>
                <td class="queryFormTd">
                    <el-input
                        placeholder="请输入账号"
                        v-model="userId"
                        clearable>
                    </el-input>
                </td>
                <th class="queryFormTh">操作模块：</th>
                <td class="queryFormTd">
                    <el-select v-model="value" placeholder="请选择模块" style="width: 100%;">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </td>
                <th class="queryFormTh">ip地址：</th>
                <td class="queryFormTd">
                    <el-input
                        placeholder="请输入ip地址"
                        v-model="ipAddress"
                        clearable>
                    </el-input>
                </td>
            </tr>
            <tr>
                <th class="queryFormTh">操作时间起：</th>
                <td class="queryFormTd">
                    <el-date-picker
                        v-model="beginTime"
                        type="date"
                        placeholder="开始日期"
                        style="width: 100%;">
                    </el-date-picker>
                </td>
                <th class="queryFormTh">操作时间止：</th>
                <td class="queryFormTd">
                    <el-date-picker
                        v-model="endTime"
                        type="date"
                        placeholder="结束日期"
                        style="width: 100%;">
                    </el-date-picker>
                </td>
                <th class="queryFormTh">                   
                     <el-button type="primary" @click="getAllLog()">查询</el-button>
                </th>
                <td class="queryFormTd">
                    <el-button style="margin-left: 13px;">重置</el-button>
                </td>
            </tr>
        </table> -->

        <div style="margin-top: 0px;">
            <el-button type="primary" icon="el-icon-plus" style="margin: 10px 5px;" @click="addArticleType()">新增类别</el-button>
            <el-table
                :key="itemKey"
                :data="articleTagList"
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
                    prop="tagCode"
                    label="标签编码"
                    width="120">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="tagName"
                    label="标签名称"
                    width="180">
                    <template slot-scope="scope">
                        <el-tag type="primary">{{ scope.row.tagName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="tagDesc"
                    label="标签描述"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="createTime"
                    label="创建时间"
                    width="220">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="addUserId"
                    label="添加账号"
                    width="150">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="isAutoAdd"
                    label="是否用户添加"
                    width="150">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.isAutoAdd === 0">是</el-tag>
                        <el-tag type="info" v-else>否</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="240">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="editArticleType(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini">删除</el-button>
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

        <div>
            <el-dialog :title="editTypeDialogTitle" :visible.sync="editTypeDialog" width="30%">
                <el-form :model="articleTypeForm">
                  <el-form-item label="类目编码">
                    <el-input v-model="articleTypeForm.typeCode" placeholder="请输入类目编码"></el-input>
                  </el-form-item>
                  <el-form-item label="类目名称">
                    <el-input v-model="articleTypeForm.typeName" placeholder="请输入类别名称"></el-input>
                  </el-form-item>
                  <el-form-item label="类目描述">
                    <el-input v-model="articleTypeForm.typeDesc" placeholder="请输入类目描述"></el-input>
                  </el-form-item>
                  <el-form-item label="类目排序">
                    <el-input v-model="articleTypeForm.displayOrder" placeholder="请输入类目排序"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="typeAxios()" >确 定</el-button>
                    <el-button @click="editTypeDialog = false">取 消</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import {Message} from 'element-ui'
    export default{
        data(){
            return{
                userId: '',
                ipAddress: '',
                beginTime: '',
                endTime: '',
                pageInfo: {
                    pageNum: 1,//页码
                    pageRow: 10,//每页条数
                },
                articleTagList: [],
                articleTypeForm: {
                    typeId: '',
                    typeCode: '',
                    typeName: '',
                    typeDesc: '',
                    displayOrder: ''
                },
                typeAxiosUrl: '',
                editTypeDialog: false,
                editTypeDialogTitle: '',
                total: ''
            }
        },
        created() {
            this.getArticleTagList()
        },
        methods: {
            handleSizeChange(val) {
                this.pageInfo.pageRow = val;
                this.getArticleTagList();
            },
            handleCurrentChange(val) {
                this.pageInfo.pageNum = val;
                this.getArticleTagList();
            },
            //获取类别列表
            getArticleTagList(){
                this.api({
                    url: "/article/tag/articleTagList",
                    method: "post",
                    params: this.pageInfo
                }).then(res => {
                    this.articleTagList = res.data.list;
                    this.total = res.data.total;
                })
            },
            //修改类别
            editArticleType(articleType){
                this.editTypeDialogTitle = '修改类目';
                this.editTypeDialog = true;
                this.typeAxiosUrl = "/article/type/editArticleType";
                this.articleTypeForm = JSON.parse(JSON.stringify(articleType));
                // for(let key in articleType) {
                //     this.articleTypeForm[key] = articleType[key];
                // }
            },
            //新增类别
            addArticleType(){
                this.editTypeDialogTitle = '新增类目';
                this.editTypeDialog = true;
                this.typeAxiosUrl = "/article/type/addArticleType";
                for(let key in this.articleTypeForm){
                    this.articleTypeForm[key] = '';
                }
            },
            //修改或新增类目的请求
            typeAxios(){
                this.api({
                    url: this.typeAxiosUrl,
                    method: "post",
                    data: this.articleTypeForm
                }).then(res => {
                    //重新发送请求，刷新页面
                    this.getArticleTagList();
                    Message({
                        showClose: true,
                        message: res.msg,
                        type: 'success'
                    })
                })
                this.editTypeDialog = false;
            }
        },
    }
</script>
<style>
    .queryFormTh{
        width: 10%;
        text-align: right;
    }
    .queryFormTd{
        width: 23%;
    }
</style>
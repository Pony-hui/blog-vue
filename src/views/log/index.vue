<template>
    <div class="app-container">
        <table style="width: 98%;border-collapse:separate; border-spacing:0px 10px;">
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
        </table>

        <div style="margin-top: 15px;">
            <el-table
                :data="logList"
                style="width: 100%">
                <el-table-column 
                    align="center"
                    type="index"
                    label="序号"
                    width="50">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="userId"
                    label="操作账号"
                    width="180">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="optModule"
                    label="操作模块"
                    width="180">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="optName"
                    label="操作名称"
                    width="240">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="optContent"
                    label="入参">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="optIp"
                    label="操作IP"
                    width="240">
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
                total: 400,
                logList: []
            }
        },
        created() {
            this.getAllLog()
        },
        methods: {
            handleSizeChange(val) {
                this.pageInfo.pageRow = val;
                this.getAllLog();
            },
            handleCurrentChange(val) {
                this.pageInfo.pageNum = val;
                this.getAllLog();
            },
            getAllLog(){
                this.api({
                    url: "/sys/log/listLog",
                    method: "get",
                    params: this.pageInfo
                }).then(res => {
                    console.log(res);
                    this.logList = res.data.logList.list;
                    this.total = res.data.logList.total;
                })
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
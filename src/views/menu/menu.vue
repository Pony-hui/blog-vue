<template>
    <div class="menu">
        <div class="menu-tree">
            <el-tree :data="menuTree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>

        <div class="menu-detali">
            <div class="menu-detali-tab">
                <el-tabs type="border-card">
                    <el-tab-pane label="菜单名称">
                        <div>
                            <table class="menu-detali-table">
                                <tr>
                                    <td>dd</td>
                                    <td>
                                        <el-input></el-input>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>

            <div>
                <el-button type="primary">保存</el-button>
                <el-button type="warning" plain>重置</el-button>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
                menuTree: [{
                label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                    label: '三级 1-1-1'
                    }]
                }]
                }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                    children: [{
                    label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                    label: '三级 2-2-1'
                    }]
                }]
                }, {
                label: '一级 3',
                children: [{
                    label: '二级 3-1',
                }, {
                    label: '二级 3-2',
                }]
                }],
                defaultProps: {
                children: 'children',
                label: 'label'
                }
            };
    },
    methods:{
        // 获取所有菜单
        getMenuList(){
            this.api({
                method: "get",
                url: "/menu/getMenuList",
            }).then(data => {
                console.log(data.menuList);
                this.menuTree.push(data.menuList);
                console.log(this.menuTree);

            }),err=>{
            
            }
        },
        handleNodeClick(data) {
            console.log(data);
        }
    },
    created: function(){
        this.getMenuList();
    },
};
</script>

<style>
.menu{
    width: 100%;
    height: 700px;

}
.menu-tree{
    width: 24%;
    height: 100%;
    float: left;

}
.menu-detali{
    width: 70%;
    height: 100%;
    float: left;

}
.menu-detali-table{
    width: 100%;
    height: 500px;
    /* background-color: aqua; */
}
</style>

<template>
  <div id="adminLink">
    <div class="add">
      <el-tag type="success">添加友链</el-tag>
      <el-form 
      :model="linkForm" 
      label-width="70px"
      ref="linkForm">
        <el-form-item label="名称">
          <el-input v-model="linkForm.name"></el-input>
        </el-form-item>
        <el-form-item label="主页地址">
          <el-input v-model="linkForm.home"></el-input>
        </el-form-item>
        <el-form-item label="LOGO">
          <el-input v-model="linkForm.logo"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="linkForm.des"></el-input>
        </el-form-item>
        <el-button type="primary" @click="handleLinkSubmit">添加友链</el-button>
      </el-form>
    </div>
    <div class="remove">
      <el-tag type="success">友链列表</el-tag>
      <el-table
        :data="linkList"
        style="width: 100%"
      >
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="home" label="主页">
        </el-table-column>
        <el-table-column prop="logo" label="logo"> 
            <template #default="scope">
                <img :src="scope.row.logo" width="30" height="30" alt="">
            </template>
        </el-table-column>
        <el-table-column prop="des" label="描述"> </el-table-column>
        <el-table-column label="操作" :width="100"> 
            <template #default="scope">
                <el-button type="danger" icon="el-icon-delete" circle @click="handleDeleteLink(scope.row)"></el-button>
            </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminLink",
  data() {
    return {
      linkForm: {
        name: "",
        home: "",
        logo: "",
        des: "",
      },
      linkList: []
    };
  },
  methods: {
    // 添加友链
    async handleLinkSubmit() {
      let name = this.linkForm.name.trim(),
        home = this.linkForm.home.trim(),
        logo = this.linkForm.logo.trim(),
        des = this.linkForm.des.trim();
      // 验证数据
      if (!name || !home || !logo || !des) {
        return this.$message.error("数据不完整");
      }
      // 发送数据
      let { data } = await this.$axios({
        method: "post",
        url: "/admin/linkAdd",
        data: { name, home, logo, des },
      });
      if (data.code) {
        return this.$message.error(data.msg);
      }
      this.$message.success(data.msg);
      this.linkForm = {name: "",home: "",logo: "",des: "",}
      this.getLinks()
    },
    // 获取友链
    async getLinks(){
      let {data} = await this.$axios({
        method: 'get',
        url: '/linkServer'
      })
      if(data.code){
        return this.$message.error("获取友链列表失败")
      }

      this.linkList = data.data
    },
    // 删除友链
    async handleDeleteLink(item){
        let {data} = await this.$axios({
            method: 'delete',
            url: '/admin/linkDelete',
            data: {_id: item._id}
        })

        if(data.code){
            return this.$message.error(data.msg)
        }
        this.$message.success(data.msg)
        this.getLinks()
    }
  },
  created() {
    this.getLinks()
  }
};
</script>

<style lang="less" scoped>
.add {
  .el-tag {
    margin-bottom: 10px;
  }
  margin-bottom: 40px;
}
</style>
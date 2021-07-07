<template>
    <div id="error">
		<el-empty 
			:image= img
			:image-size="400" 
			description="404, 页面找不到了~">
		</el-empty>
		<el-button @click="lastPage">返回上一页</el-button>
		<el-button type="primary" @click="backHome">进入首页</el-button>
	</div>
	   
</template>

<script>
import img from '../assets/img/404/404.jpg'
export default {
	name: 'Error',
	data() {
		return {
			img
		}
	},
	methods: {
		lastPage() {
			this.$router.go(-1)
		},
		backHome() {
			this.$router.push('/')
		}
	}
}
</script>

<style lang="less" scoped>
#error{
	z-index: 10;
	margin: 50px auto;
	text-align: center;
	.el-button{
		margin-right: 10px;
	}
}
</style>
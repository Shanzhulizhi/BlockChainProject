<template>
    <div class="login_page">
        <el-container>
              <el-header></el-header>

              <el-container class="container "  direction="vertical">

                    <div class='success'>恭喜您注册成功</div>
                    <div class="save">请妥善保管您的账户信息</div>
                    <div class='button'><el-button  type='primary' @click='back2mainpage'>进入首页</el-button></div>
              </el-container>
              <el-footer></el-footer>
        </el-container>
    </div>
</template>

<script>

export default {
    data () {
        return {
        }
    },

    methods: {
    	back2mainpage: function() {
    		var path = "/";
            var id = this.$route.query.id;
            this.$router.push({path:path, query:{uid:id}});
            //this.$router.push(path)//, id);
    	},
    }
};
</script>

<style>
@import "../../assets/css/LoginAndRegister.css";

.success {
    font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
    font-weight: 700;
    font-style: normal;
    font-size: 24px;
    color: #666666;
    text-align: center;
    line-height: 24px;

    margin-top: 100px;
}

.save {
    font-family: '微软雅黑';
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #999999;
    text-align: center;
    line-height: 22px;

    margin: 30px 0;
}

.button {
    margin-bottom: 50px;
}

</style>
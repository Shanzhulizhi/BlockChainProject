<template>
    <div class="login_page">
        <el-container>
              <el-header></el-header>

              <el-container class="container">
                    <el-header >
                        <div class="logo">
                            <p>SignIn</p>
                        </div>
                    </el-header>

                    <el-container class="login_container" direction="vertical">
                        <el-tabs :stretch=true class="login_tabs" v-model="tabs.activeName">
                            <el-tab-pane :name="tabs.firstName">
                                <span slot="label" :class="{tabs_label_onclick: tabs.activeName== tabs.firstName}">账号登陆</span>
                                <div  class="warning">
                                    {{warn}}
                                </div>
                                <el-form ref="form"  :model="form"> 
                                    <el-form-item label="" class="login_form_item">
                                        <el-input v-model="form.id" placeholder="请输入账户名" clearable prefix-icon="el-icon-user-solid"></el-input>
                                    </el-form-item>
                                    <el-form-item label="" class="login_form_item">
                                        <el-input v-model="form.password" placeholder="请输入登录密码" clearable show-password prefix-icon="el-icon-lock"></el-input>
                                    </el-form-item>
                                    
                                    <el-form-item class="login_form_item">
                                        <el-button type="primary" round @click="onLogin">登录</el-button>
                                  </el-form-item>
                                </el-form>
                            </el-tab-pane>

                        </el-tabs>

                        <el-row class="login_option" type="flex" justify="space-around">
                            <el-col :span="10">
                                <router-link to="Register"><el-button type="text">注册新用户</el-button></router-link>
                            </el-col>
                            <el-col :span="10">
                                <router-link to="Register"><el-button type="text">忘记密码</el-button></router-link>
                            </el-col>
                        </el-row>
                        <el-row class="other_login_way" type="flex" justify="space-around">
                            <el-col :span="10">
                            </el-col>
                            <el-col :span="10">
                            </el-col>
                            <el-col :span="10">
                            </el-col>
                        </el-row>
                    </el-container>
                    
              </el-container>
              <el-footer></el-footer>
        </el-container>
    </div>
</template>

<script>
/* eslint-disable */

export default {
    data () {
        return {
            tabs: {
            	activeName: 'first',
            	firstName: 'first',
            	secondName: 'second'
            },
            form: {
                id: '',
                password: '',
            },
            checked: false,
            warn: ''
        }
    },

    methods: {
    	onLogin: function() {
            var path = '/mainpage';
            var url = "http://127.0.0.1:8081/getpw";
            var data = { pname: ""+this.form.id};
            this.$http.post(url, data, {emulateJSON: true}).then(function(res){
                var pw = res.body.toString();
                if(this.form.password.toString()==pw){
                    alert("success")
                    this.$router.push({path:"/mainpage",query:{uid:this.form.id}});
                } else {
                    alert("fail")
                }
                this.warn = "";
                
            },function(res){
                console.log(res.body)
                if (res.status == '400') {
                    this.warn = "用户名或密码不正确";
                }
            });
    	},
    }
};
</script>

<style>
@import "../../assets/css/LoginAndRegister.css" 

</style>
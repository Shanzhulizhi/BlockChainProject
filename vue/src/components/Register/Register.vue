<template>
    <div class="login_page">
        <el-container>
              <el-header></el-header>

              <el-container class="container">
                    <el-header >
                        <div class="logo">
                            <p>SignUp</p>
                        </div>
                    </el-header>

                    <el-container class="login_container" direction="vertical">
                        <el-form  ref="form"  :model="form" :rules="rules" label-position='right' label-width="80px"> 
                            <el-form-item label="用户名" class="login_form_item" prop="id">
                                <el-input v-model="form.id" placeholder="请输入用户名称" clearable prefix-icon="el-icon-s-custom"></el-input>
                            </el-form-item>
                            <el-form-item label="地址" class="login_form_item" prop="address">
                                <el-input v-model="form.address" placeholder="请输入地址" clearable prefix-icon="el-icon-user-solid"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" class="login_form_item" prop="password">
                                <el-input class="register_form_item" v-model="form.password" placeholder="请输入6至20位登录密码" clearable show-password prefix-icon="el-icon-lock"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" class="login_form_item" prop="checkPass">
                                <el-input class="register_form_item" v-model="form.checkPass" placeholder="请再次输入登录密码" clearable show-password prefix-icon="el-icon-lock"></el-input>
                            </el-form-item>

                            <el-form-item label="角色" class="login_form_item" prop="status">
                                <el-input class="register_form_item" v-model="form.status" placeholder="请输入用户角色" clearable  prefix-icon="el-icon-s-check"></el-input>
                            </el-form-item>

                            
                        </el-form>
                        <el-button type="primary" round style="margin: 0 0 40px 0"  @click="onSubmit('form')">注册</el-button>
                        <router-link to="/"><el-button type="text">已有账号, 登陆</el-button></router-link>
                        
                    </el-container>
                    
              </el-container>
              <el-footer></el-footer>
        </el-container>
    </div>
</template>

<script>

export default {
    data () {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                 callback();
            } else {
                if (this.form.checkPass !== '') {
                 this.$refs.form.validateField('checkPass');
                }
              callback();
            }
          };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback();
            } else if (value !== this.form.password) {
                 callback(new Error('两次输入密码不一致!'));
            } else {
                 callback();
            }
        };

        return {
            form: {
                id: '',
                address: '',
                password: '',
                checkPass: '',
                status: '',
            },
            rules: {
                id: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                address: [
                    { required: true, message: '请输入用户地址', trigger: 'blur' },
                    { pattern: /^[0x][A-Za-z0-9]{40}/, message: "地址为0x开头的40位字母和数字", trigger: 'blur'},
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'},
                    { validator: validatePass, trigger: 'blur' },
                ],
                checkPass: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: validatePass2, trigger: 'blur'}
                ],
                status: [
                    { required: true, message: '请输入用户状态', trigger: 'blur' },
                    { pattern: /^[0-3]{1}/, message: "一个数字，范围0--3", trigger: 'blur'},
                ],
            },

            checked: true,
            
        }
    },

    methods: {
        onSubmit: function(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var register_url = "http://127.0.0.1:8081/adduser";
                    var data = { name: this.form.id, address: this.form.address, pw: this.form.password, status: this.form.status};
                    //var name = "RegisterSuccess";
                    //alert("adduser")
                    this.$http.post(register_url, data, {emulateJSON: true}).then(function(res){
                            console.log(res);
                            //alert(res.bodyText);
                            var re = res.bodyText;
                            if(re=="success"){
                                alert("注册成功");
                                this.$router.push({path:"/mainpage",query:{uid:this.form.id}});
                            } else {
                                alert("注册失败");
                            }

                   //          var login_url = "/api/users/login";
                   //          this.$http.post(login_url, data, {emulateJSON: true}).then(function(res){
			                //     console.log(res.body); 
			                //     this.$cookies.set("id", this.form.id);
			                //     this.$router.push(name);//, params: {id: this.form.id}});
			                // },function(res){
			                //     console.log(res.body)
			                // });

                        },function(res){
                            console.log('请求失败处理');
                            console.log(res.body)

                        });

                    
                } else {
                    console.log('error submit!!');
                     return false;
                }
            });
        },
    }
};
</script>

<style>
@import "../../assets/css/LoginAndRegister.css" 

</style>
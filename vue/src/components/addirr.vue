<template>
    <div class="login_page">
        <el-container>
             

              <el-container class="container">

                    <el-container class="login_container" direction="vertical">
                        <el-form  ref="form"  :model="form" label-position='right' label-width="80px"> 
                            <el-form-item label="收方" class="login_form_item" prop="rece">
                                <el-input v-model="form.rece" placeholder="请输入收款方名称" clearable prefix-icon="el-icon-s-custom"></el-input>
                            </el-form-item>
                            <el-form-item label="付方" class="login_form_item" prop="payer">
                                <el-input v-model="form.payer" placeholder="请输入付款方名称" clearable prefix-icon="el-icon-user-solid"></el-input>
                            </el-form-item>
                            <el-form-item label="金额/万" class="login_form_item" prop="amount">
                                <el-input class="register_form_item" v-model="form.amount" placeholder="请输入金额" clearable prefix-icon="el-icon-coin"></el-input>
                            </el-form-item>
                            <el-form-item label="到期时间" class="login_form_item" prop="time">
                                <el-input class="register_form_item" v-model="form.time" placeholder="请输入时间" clearable prefix-icon="el-icon-date"></el-input>
                            </el-form-item>

                            <el-form-item label="信息" class="login_form_item" prop="info">
                                <el-input class="register_form_item" v-model="form.info" placeholder="请输入账款信息" clearable prefix-icon="el-icon-edit"></el-input>
                            </el-form-item>

                            
                        </el-form>
                        <el-button type="primary" round style="margin: 0 0 40px 0"  @click="onSubmit('form')">确认</el-button>
                        
                    </el-container>
                    
              </el-container>
              <el-footer></el-footer>
        </el-container>
    </div>
</template>

<script>

export default {
    data () {
        

        return {
            form: {
                rece: '',
                payer: '',
                amount: '',
                time: '',
                info: '',
            },
            checked: true,
            
        }
    },

    methods: {
        onSubmit: function() {

                    var register_url = "http://127.0.0.1:8081/addirr";
                    var data = { rece: this.form.rece, payer: this.form.payer, amount: this.form.amount, time: this.form.time, info: this.form.info};
                    // //var name = "RegisterSuccess";

                    this.$http.post(register_url, data, {emulateJSON: true}).then(function(res){
                            console.log(res);
                            //alert(res.bodyText);
                            var re = res.bodyText;
                            if(re=="success"){
                                alert("创建成功");
                            } else {
                                alert("创建失败");
                            }

                        },function(res){
                            console.log('请求失败处理');
                            console.log(res.body)

                        });
        },
    }
};
</script>

<style>
@import "../assets/css/LoginAndRegister.css" 

</style>
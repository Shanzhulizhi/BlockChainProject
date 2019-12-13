<template>
    <div class="login_page">
        <el-container>

              <el-container class="container">

                    <el-container class="login_container" direction="vertical">
                        <el-form  ref="form"  :model="form" label-position='right' label-width="80px"> 
                            <el-form-item label="申请方" class="login_form_item" prop="rece">
                                <el-input v-model="form.rece" placeholder="请输入申请方名称" clearable prefix-icon="el-icon-s-custom"></el-input>
                            </el-form-item>
                            <el-form-item label="出资方" class="login_form_item" prop="financer">
                                <el-input v-model="form.financer" placeholder="请输入出资方名称" clearable prefix-icon="el-icon-s-custom"></el-input>
                            </el-form-item>
                            <el-form-item label="账单付方" class="login_form_item" prop="payer">
                                <el-input v-model="form.payer" placeholder="请输入账单付款方名称" clearable prefix-icon="el-icon-user-solid"></el-input>
                            </el-form-item>
                             <el-form-item label="到期时间" class="login_form_item" prop="time">
                                <el-input class="register_form_item" v-model="form.time" placeholder="请输入时间" clearable prefix-icon="el-icon-date"></el-input>
                            </el-form-item>
                            <el-form-item label="金额/万" class="login_form_item" prop="amount">
                                <el-input class="register_form_item" v-model="form.amount" placeholder="请输入融资金额" clearable prefix-icon="el-icon-coin"></el-input>
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
                financer:'',
                payer: '',
                time: '',
                amount: '',
                info: '',
            },
            checked: true,
            
        }
    },

    methods: {
        onSubmit: function() {

            var url2 = "http://127.0.0.1:8081/finance";
            var url1 = "http://127.0.0.1:8081/querystate"
            var data2 = { rece: this.form.rece, financer:this.form.financer, payer: this.form.payer, time: this.form.time, amount: this.form.amount,  info: this.form.info};
            var data1 = { rece: this.form.rece, payer:this.form.payer}
            this.$http.post(url1, data1, {emulateJSON: true}).then(function(res){
                var re = res.bodyText;
                if(re!="err"){
                    if(re!="The irrigation is guaranteed and not used to financing"){
                        alert(re);
                    } else {
                        this.$http.post(url2, data2, {emulateJSON: true}).then(function(res){
                            var re = res.bodyText;
                            if(re=="success"){
                                alert("融资成功！");
                            } else {
                                alert("融资失败！");
                            }
                        })
                    }
                } else {
                    alert("查询状态失败");
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
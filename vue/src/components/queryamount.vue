<template>
    <div class="login_page">
        <el-container>

              <el-container class="container">

                    <el-container class="login_container" direction="vertical">
                        <el-form  ref="form"  :model="form" label-position='right' label-width="80px"> 
                            <el-form-item label="收款方" class="login_form_item" prop="rece">
                                <el-input v-model="form.rece" placeholder="请输入收款方名称" clearable prefix-icon="el-icon-user-solid"></el-input>
                            </el-form-item>
                            <el-form-item label="还款方" class="login_form_item" prop="payer">
                                <el-input v-model="form.payer" placeholder="请输入还款方名称" clearable prefix-icon="el-icon-user-solid"></el-input>
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
                rece:'',
                payer: '',
            },
            checked: true,
            
        }
    },

    methods: {
         onSubmit: function() {

                    var register_url = "http://127.0.0.1:8081/queryamount";
                    var data = { rece: this.form.rece, payer: this.form.payer};
                    // //var name = "RegisterSuccess";

                    this.$http.post(register_url, data, {emulateJSON: true}).then(function(res){
                            console.log(res);
                            //alert(res.bodyText);
                            var re = res.bodyText;
                            if(re!="err"){
                                alert(re);
                            } else {
                                alert("查询失败");
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
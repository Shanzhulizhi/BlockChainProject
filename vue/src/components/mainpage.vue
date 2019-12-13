<template>
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '2','3']">
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-mouse"></i>查询信息</template>
                <el-menu-item-group>
                  <el-menu-item index="1-1"  @click="queryamount">查询票据金额</el-menu-item>
                  <el-menu-item index="1-2" @click="querystate">查询账款状态</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>账款管理</template>
                <el-menu-item-group>
                  <el-menu-item index="2-1" @click='addirr'>创建票据</el-menu-item>
                  <el-menu-item index="2-2" @click='shiftirr'>转让票据</el-menu-item>
                  <el-menu-item index="2-3" @click='finance'>融资</el-menu-item>
                  <el-menu-item index="2-4" @click='payback'>还款</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown @command="handleCommand">
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="quit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span id="name">王小虎</span>
        </el-header>
        
        <el-main id="table-show">
          <transition name="test" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>

</template>

<script>
/* eslint-disable */

export default {
    data () {
        return {
            uid: null,
            staffData: null,
        }
    },
    created: function(){
        this.uid = this.$route.query.uid;
    },
    mounted: function() {
        if(this.uid!=null){
          $("#name").text(this.uid);
          console.log(this.uid);
        }
      },
    methods: {
        handleCommand(command) {
            this.$router.push({ name: 'Login'})
        },
        queryamount: function(){
            this.$router.push({ name: 'queryamount'})
            //alert("amount");
        },
        querystate: function(){
            this.$router.push({ name: 'querystate'})
        },
        addirr: function(){
            this.$router.push({ name: 'addirr'})
        },
        shiftirr: function(){
            this.$router.push({ name: 'shiftirr'})
        },
        finance: function(){
            this.$router.push({ name: 'finance'})
        },
        payback: function(){
            this.$router.push({ name: 'payback'})
        },
    }
};
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>


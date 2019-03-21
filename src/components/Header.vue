<template>
  <div class="layout-ceiling">
    <!--<h1 style="float: left;color: white;font-size: 50px">PIONEER</h1>-->
    <div style="margin-left: 40%;width: 50px;height: 50px;float: left">

      <Icon type="ios-aperture" size="80" color="white"/>
    </div>
    <div style="margin-left: 2%;width: 20%;float: left;margin-top: 12px">
      <h1 style="color: white;font-size: 50px">饿了么</h1>
    </div>
    <div class="layout-ceiling-main" style="margin-left: 13%;float: left;" >
      <a @click="jumptohome" style="font-size: 20px">首页</a> |
      <a @click="jumptologin" style="font-size: 20px">注册登录</a> |
      <a @click="jumptohome" style="font-size: 20px">登出</a>
    </div>
  </div>
</template>

<script>
  export default {
    created(){
      // setInterval(()=>{
      //   // console.log("123")
      //   // let touxiang=window.localStorage.getItem("touxiang")
      //   // document.getElementById("touxiang").src=touxiang
      // },2000)


    },
    data(){
      return{

      }
    },
    methods:{
      jumptologin(){
        this.$router.push({
          name:'login'
        })
      },
      jumptohome(){
        this.$router.push({
          name:'home'
        })
      },
    }
  }
</script>

<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    width: 100%;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-ceiling{
    background: #464c5b;
    padding: 10px 0;
    overflow: hidden;
    height: 125px;
    width: 100%;
  }
  .layout-ceiling-main{
    float: right;
    margin-right: 15px;
  }
  .layout-ceiling-main a{
    color: #9ba7b5;
  }
</style>

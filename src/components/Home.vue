<template>
    <div id="app" style="position: absolute;left:0;top:0;width:100%;height:90%;background-color: #008de1">
      <img src="../images/logo1.png" style="position:absolute;left:5%;top:5%;cursor: pointer;"/>
      <img src="../images/logo2.png" style="position:absolute;left:32%;top:40%;cursor: pointer;"/>
      <a class="href" @click="showLogin" style="position: absolute;left:80%;top:5%;">登录</a>
      <p style="position: absolute;left:83.6%;top:4%;color: white;font-size: 22px">|</p>
      <a class="href" @click="showRegister" style="position: absolute;left:85%;top:5%;">注册</a>
      <button class="button1" @click="showStoreRegister" style="position: absolute;left:90%;top:5%;width:8%;height:5%">我要开店</button>
    </div>
</template>

<script>
   export  default {
     data () {
       return {

       }
     },
    methods: {
      showLogin:function(){
        this.$router.push("/login");
      },
      showRegister:function(){
        this.$router.push("/register");
      },
      showStoreRegister:function(){
        this.$Message.success("暂未开放，敬请期待");
      }
    }
  }
</script>

<style scoped>
  .href{
    font-size: 18px;
    font-family: FangSun;
    color: white;
    text-decoration:none;
    cursor: pointer;
  }
  .href:hover{
    text-decoration:underline;
  }
  .button1{
    font-size: 15px;
    color: white;
    background-color: #5db423;
    border:1px;
    border-radius: 2px;
    outline: none;
    cursor: pointer;
  }
</style>

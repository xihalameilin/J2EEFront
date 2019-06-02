<template>
  <div>
    <img src="../images/logo3.png" style="position: absolute;left:39%;top:5%"/>
    <input id="name" class="input" placeholder="用户名" style="position:absolute;left:35%;top:30%;width:30%;height:8%"/>
    <input id="password" type="password" class="input" placeholder="密码" style="position:absolute;left:35%;top:45%;width:30%;height:8%"/>
    <p class="longTxt" style="position:absolute;left:37%;top:55%;font-size: 15px">用户登录表示已同意
      <span style="color: #008de1;cursor: pointer">《用户服务协议》</span>
    </p>
    <button class="button2" @click="login" style="position: absolute;left:35%;top:65%;width:30%;height:8%">登录</button>
  </div>
</template>

<script>
    export default {
      data:{
        return:{

        }
      },
      methods:{
        login:function(){
          var name = document.getElementById("name").value;
          var password = document.getElementById("password").value;
          if(name == ""){
            this.$Message.error("用户名不能为空！");
          }else if(password == ""){
            this.$Message.error("密码不能为空！");
          }else {
            this.$http.get('api/LoginController/login/' + name + "/" + password, {}).then(function (response) {

            })
          }
        },
      }
    }
</script>

<style scoped>
</style>

<template>
    <div>
      <img src="../images/logo3.png" style="position: absolute;left:39%;top:5%"/>
      <input id="name" class="input" placeholder="用户名" style="position:absolute;left:35%;top:30%;width:30%;height:8%;display: none"/>
      <input id="pw1" type="password" class="input" placeholder="密码" style="position:absolute;left:35%;top:40%;width:30%;height:8%;display: none"/>
      <input id="pw2" type="password" class="input" placeholder="确认密码" style="position:absolute;left:35%;top:50%;width:30%;height:8%;display: none"/>
      <input id="i-email" class="input" placeholder="邮箱" style="position:absolute;left:35%;top:30%;width:30%;height:8%;"/>
      <Button type="success" id="b-auth" class="button2" @click="sendMessage" :disabled="canGetIdentifyCode" style="position: absolute;left:57%;top:31.2%;width:7%;height:6%;font-size: 13px;">{{buttonContent}}</Button>
      <input id="i-auth" class="input" placeholder="验证码" style="position:absolute;left:35%;top:45%;width:30%;height:8%"/>
      <p class="longTxt" style="position:absolute;left:37%;top:60%;font-size: 15px">用户注册表示已同意
        <span style="color: #008de1;cursor: pointer">《用户服务协议》</span>
      </p>
      <button id="b-email" class="button2" @click="confirm"  style="position: absolute;left:35%;top:70%;width:30%;height:8%">邮箱验证</button>
      <button id="b-register" class="button2" @click="register" style="position: absolute;left:35%;top:70%;width:30%;height:8%;display: none">注册</button>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          authCode:"",
          mail:"",
          canGetIdentifyCode:false,
          buttonContent:"获取验证码"
        }
      },
      methods:{

        wait(){
          this.canGetIdentifyCode = true;
          let timeLast = 60;
          let timer = setInterval(() => {
            if (timeLast >= 0) {
              this.buttonContent = timeLast + '秒后重试';
              timeLast -= 1;
            } else {
              clearInterval(timer);
              this.buttonContent = '获取验证码';
              this.canGetIdentifyCode = false;
            }
          }, 1000);
        },
        getAuthCode:function(){
          this.authCode = Math.floor(Math.random()*1000000);
          this.authCode = this.authCode + "";
          var length = this.authCode.length;
          for(var i=0;i < 6-length;i++){
            this.authCode = "0" + this.authCode;
          }
        },
        sendMessage:function(){
          var email = document.getElementById("i-email").value;
          var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
          var self = this
          if(!reg.test(email)){
            this.$Message.error("邮箱格式不正确！");
          }else {
            self.wait()
            self.mail = email;
            self.getAuthCode();
            self.$http.get('api/UserController/sendMail/' + self.mail + "/" + self.authCode)
              .then(function (response) {
                self.$Message.success("邮箱已发送");
            })
          }
        },
        showRegister:function(){
          document.getElementById("name").style.display = "block";
          document.getElementById("pw1").style.display = "block";
          document.getElementById("pw2").style.display = "block";
          document.getElementById("b-register").style.display = "block";
          document.getElementById("i-email").style.display = "none";
          document.getElementById("i-auth").style.display = "none";
          document.getElementById("b-auth").style.display = "none";
          document.getElementById("b-email").style.display = "none";
        },
        confirm:function(){
          var input = document.getElementById("i-auth").value;
          if(input == this.authCode){
            this.showRegister();
          }else{
            this.$Message.error("验证码错误！");
          }
        },
        register:function(){
          var name = document.getElementById("name").value;
          var pw1 = document.getElementById("pw1").value;
          var pw2 = document.getElementById("pw2").value;
          var self = this;
          var flag = 0;
          this.$http.get("api/UserController/CheckUserID/"+name)
            .then(function(response){
              if(response.data == false){
                flag = 1
              }
            })
          if(pw1 != pw2){
            this.$Message.error("两次密码输入不一致！");
          }else if(flag == 1){
            this.$Message.error("用户名不可用！");
          }else{
            self.$http({
              url:"api/UserController/userRegister",
              method:'post',
              headers:{"Content-Type": "application/json;charset=UTF-8"},
              data:JSON.stringify({
                "name":name,
                "password":pw1,
                "email":self.mail
              })
            }).then(function (response) {
              self.$router.push({
                name:'login'
              })
            }).catch(function (error) {
              alert(error)
            })
          }
        }
      }
    }
</script>

<style scoped>

</style>

<template>
  <div class="bg" id="bg" :style="{height: mapHeight}" >

    <div class="login" style="margin-top:210px;margin-left: 65%;  " v-if="isshowing">
      <div class="header">
        <div class="switch" id="switch">
          <a class="switch_btn_focus" id="switch_qlogin"  tabindex="7"  >快速登录</a>
          <a class="switch_btn" id="switch_login"  tabindex="8" >快速注册</a><div class="switch_bottom" id="switch_bottom" style="position: absolute; width: 64px; left: 0px;"></div>
        </div>
      </div>

      <Form v-show="tagdisplay.flag1" style="margin-left: 20px" >
        <FormItem label="用户名：" prop="userID" style="margin-top: 20px">
            <i-input type="text"  style="width: 250px" >
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </i-input>
        </FormItem>
        <FormItem label=" 密码：" prop="password" style="margin-left: 15px">
          <i-input type="password"  style="width: 250px">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </i-input>
        </FormItem>

        <FormItem  style="margin-left: 50px">
          <Button type="primary" @click="jump"  style="margin-left: 2%">登录</Button>
          <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 5%">重置</Button>
          <Button type="default" @click="ForgetPassword" style="margin-left: 5%">忘记密码</Button>
        </FormItem>
      </Form>


      <!--<Modal v-model="model1" :closable='false' :mask-closable=false :width="500" >-->
        <!--<h3 slot="header" style="color:#2D8CF0">修改密码</h3>-->
        <!--<Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right" :rules="ruleCustom">-->
          <!--<FormItem label="邮箱" prop="Email">-->
            <!--<Input v-model="editPasswordForm.Email" placeholder="请输入注册时输入的邮箱" ></Input>-->
          <!--</FormItem>-->
          <!--<FormItem label="验证码" prop="IdentityCode">-->
            <!--<Input v-model="editPasswordForm.IdentityCode" placeholder="请输入验证码" style="float: left;width: 50%" ></Input>-->
            <!--<Button type="default" @click="sendIdentityCode" style="float: left;margin-left: 10%">发送验证码</Button>-->
          <!--</FormItem>-->
          <!--<FormItem label="新密码" prop="newPass">-->
            <!--<Input type="password" v-model="editPasswordForm.newPass" placeholder="请输入新密码" ></Input>-->
          <!--</FormItem>-->
        <!--</Form>-->
        <!--<div slot="footer">-->
          <!--<Button type="text" @click="cancelEditPass">取消</Button>-->
          <!--<Button type="primary"  @click="saveEditPass">保存</Button>-->
          <!--<Button type="ghost" @click="handleReset('editPasswordForm')" style="margin-left: 8px">重置</Button>-->
        <!--</div>-->
      <!--</Modal>-->



      <!--<Form v-show="tagdisplay.flag2" ref="registerformCustom" :model="registerformCustom" :rules="ruleCustom" :label-width="80">-->
        <!--<FormItem label="用户名：" prop="registeruserID" style="margin-top: 20px">-->
          <!--<i-input type="text" v-model="registerformCustom.registeruserID" style="width: 250px">-->
            <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
          <!--</i-input>-->
        <!--</FormItem>-->
        <!--<FormItem label="密码：" prop="registerPassword">-->
          <!--<i-input type="password" v-model="registerformCustom.registerPassword" style="width: 250px">-->
            <!--<Icon type="ios-locked-outline" slot="prepend"></Icon>-->
          <!--</i-input>-->
        <!--</FormItem>-->
        <!--<FormItem label="密码确认：" prop="registerPasswordComfirm">-->
          <!--<i-input type="password" v-model="registerformCustom.registerPasswordComfirm" style="width: 250px">-->
            <!--<Icon type="ios-locked-outline" slot="prepend"></Icon>-->
          <!--</i-input>-->
        <!--</FormItem>-->
        <!--<FormItem label="邮箱：" prop="registerEmail">-->
          <!--<i-input type="email" id="emailinput" v-model="registerformCustom.registerEmail" style="width: 250px">-->
            <!--<Icon type="email" slot="prepend"></Icon>-->
          <!--</i-input>-->
        <!--</FormItem>-->

        <!--<FormItem label="验证码："  prop="registerCode">-->
          <!--<i-input type="text" v-model="registerformCustom.registerCode" style="width: 100px;float: left"/>-->
          <!--<Button @click="sendEmail" style="margin-left: 10%" :disabled="canGetIdentifyCode">{{buttonContent}}</Button>-->
        <!--</FormItem>-->


        <!--<FormItem>-->
          <!--<Button type="primary" @click="handleSubmit('registerformCustom')" style="margin-left: 40px">注册</Button>-->
          <!--<Button type="ghost" @click="handleReset('registerformCustom')" style="margin-left: 8px">重置</Button>-->
        <!--</FormItem>-->
      <!--</Form>-->




  </div>
  </div>
</template>



<script>
  export default {
    data(){
      return{
        isshowing:true,
        tagdisplay:{
          flag1:true
        }
      }
    },

    computed: {
      //计算浏览器的高度
      mapHeight() {return window.innerHeight+'px';}

    },

    methods:{
      jump(){
        this.$router.push({
          name: 'goods',
        })
      }
    }
  }


</script>

<style scoped>

  .bg{
    background-image: url('../images/login_bg.jpg');
    background-size: cover;
    border: 1px solid white;
  }

 html,body,.bg{height: 100%;}
  ul {
    padding:0;
    margin:0;
  }
  ul li {
    list-style-type:none;
  }
  a {
    text-decoration:none;
  }
  a:hover {
    text-decoration:none;color:#f00;
  }
  .cl{ clear: both;}
  input[type="text"]:focus, input[type="password"]:focus {
    outline:none;
  }
  input::-ms-clear {
    display:none;
  }
  .login {
    margin:0 auto;
    width:370px;
    border:2px solid #eee;
    border-bottom:none;
    position:relative;
  }
  .header {
    height:50px;
    border-bottom:1px solid #e2e2e2;
    position:relative;
    font-family:"Microsoft Yahei";
  }
  .header .switch {
    height:45px;
    position:absolute;
    left:60px;
    bottom:0;
    font-size:16px;
  }
  .header .switch #switch_qlogin {
    margin-right:85px;
  }
  .header .switch .switch_btn {
    color:#999;
    display:inline-block;
    height:45px;
    line-height:45px;
    outline:none;
    *hide-focus:expression(this.hideFocus=true);
  }
  .header .switch .switch_btn_focus {
    color:#333;
    display:inline-block;
    height:45px;
    line-height:45px;
    outline:none;
    *hide-focus:expression(this.hideFocus=true);
  }
  .header .switch .switch_btn:hover {
    color:#333;
    text-decoration:none;
  }
  .header .switch .switch_btn_focus:hover {
    text-decoration:none;
  }
  #switch_bottom {
    position:absolute;
    bottom:-1px;_bottom:-2px;
    border-bottom:2px solid #848484;
  }

  .web_login {
    width:370px;
    position:relative;
  }
  #web_login{_left:60px;*left:0;}
  .web_login .login_form {
    width:272px;
    margin:0 auto;
  }
  .web_login .reg_form {
    width:300px;
    margin:0 auto;
  }
  .web_login .input-tips {
    float:left;
    margin-top:10px;
    width:50px;
    height:42px;
    font-size:16px;
    line-height:42px;
    font-family:"Hiragino Sans GB", "Microsoft Yahei";
  }
  .web_login .input-tips2 {
    float:left;
    text-align:right;
    padding-right:10px;
    width:75px;
    height:30px;
    font-size:16px;
    margin-top:10px;
    clear:both;
    line-height:30px;
    font-family:"Hiragino Sans GB", "Microsoft Yahei";
  }
  .web_login .inputOuter {
    width:200px;
    height:42px;
    margin-top:10px;
    float:left;

  }
  .web_login .inputOuter2 {
    width:200px;
    margin-top:6px;margin-top:5px\9;
    float:left;

  }
  .web_login .inputstyle {
    width:200px;
    height:38px;
    padding-left:5px;
    line-height:30px;line-height:38px;
    border:1px solid #D7D7D7;
    background:rgba(255, 255, 255, 0.32);;
    color:#333;border-radius:2px;
    font-family:Verdana, Tahoma, Arial;
    font-size:16px;
    ime-mode:disabled;
  }
  .web_login input.inputstyle2:focus,.web_login input.inputstyle:focus{border:1px solid #198BD4;box-shadow:0 0 2px #198BD4;}
  .web_login .inputstyle2 {
    width:200px;
    height:34px;
    padding-left:5px;
    line-height:34px;
    border:1px solid #D7D7D7;
    background:rgba(255, 255, 255, 0.32);
    color:#333;border-radius:2px;
    font-family:Verdana, Tahoma, Arial;
    font-size:16px;
    ime-mode:disabled;
  }
  .web_login .uinArea {
    height:55px;
    position:relative;
    z-index:10;
  }
  .web_login .pwdArea {
    height:55px;
    margin-bottom:10px;
    position:relative;
    z-index:3;
  }
  .web_qr_login {
    position:relative;

    overflow:hidden;
  }

  .login {
    background-color:rgba(255, 255, 255, 0.32);
  }

  h1{margin:80px auto 50px auto;text-align:center;color:#fff;margin-left:-25px;font-size:35px;font-weight: bold;text-shadow: 0px 1px 1px #555;}
  h1 sup{
    font-size: 18px;
    font-style: normal;
    position: absolute;
    margin-left: 10px;}
  .login {border:0;padding:5px 0;
    background: rgba(255,255,255,0.5);;
    margin: 0 auto;
    -webkit-box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, .3);
    box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, .3);}

  .web_login{padding-bottom:20px;}

  .jianyi{color:#fff;text-align:center;margin-top:25px;color:#B3B8C4;}
  .reg_form li {
    height: 55px;
  }

  .web_login input.inputstyle2:focus, .web_login input.inputstyle:focus {
    border: 1px solid #5796f;
    box-shadow: 0 0 0;
  }
  .web_login .reg_form {
    width: 300px;
    margin: 0 auto;
  }
  .web_login .inputstyle2 {border-radius:2px;width:210px;}
  .web_login .input-tips2 {
    padding-right: 5px;
    width: 80px;_width: 75px;_font-size:12px;}
  .button_blue
  {
    display:inline-block;
    float:left;
    height:41px;border-radius:4px;
    background:#2795dc;border:none;cursor:pointer;
    border-bottom:3px solid #0078b3;*border-bottom:none;
    color:#fff;
    font-size:16px;padding:0 10px;*width:140px;
    text-align:center;outline:none;font-family: "Microsoft Yahei",Arial, Helvetica, sans-serif;
  }
  input.button_blue:hover
  {
    background:#0081c1;
    border-bottom:3px solid #006698;*border-bottom:none;
    color:#fff;
    text-decoration:none;
  }
  a.zcxy {text-decoration: underline;line-height:58px;margin-left:15px;color: #959ca8;}
  .web_login .login_form {margin-top:30px;}
  .web_login .uinArea {
    height: 60px;}
  .header .switch{left:70px;}


</style>

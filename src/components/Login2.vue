<template>
    <div class="bg" id="bg" :style="{height: mapHeight}" >

      <div class="login" style="margin-top:100px;margin-left: 65%;  " v-if="isshowing">
        <div class="header">
          <div class="switch" id="switch">
            <a class="switch_btn_focus" id="switch_qlogin"  tabindex="7" @click="changetag(0)" >快速登录</a>
            <a class="switch_btn" id="switch_login"  tabindex="8" @click="changetag(1)">快速注册</a><div class="switch_bottom" id="switch_bottom" style="position: absolute; width: 64px; left: 0px;"></div>
          </div>
        </div>

        <Form v-show="tagdisplay.flag1" ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
          <FormItem label="用户名：" prop="userID" style="margin-top: 20px">
            <i-input type="text" v-model="formCustom.userID" style="width: 250px" >
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem label="密码：" prop="password">
            <i-input type="password" v-model="formCustom.password" style="width: 250px">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>


          <FormItem >
            <Button type="primary" @click="handleSubmit('formCustom')"  style="margin-left: 2%">登录</Button>
            <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 5%">重置</Button>
            <Button type="default" @click="ForgetPassword" style="margin-left: 5%">忘记密码</Button>
          </FormItem>
        </Form>

        <Modal v-model="model1" :closable='false' :mask-closable=false :width="500" >
          <h3 slot="header" style="color:#2D8CF0">修改密码</h3>
          <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right" :rules="ruleCustom">
            <FormItem label="邮箱" prop="Email">
              <Input v-model="editPasswordForm.Email" placeholder="请输入注册时输入的邮箱" ></Input>
            </FormItem>
            <FormItem label="验证码" prop="IdentityCode">
              <Input v-model="editPasswordForm.IdentityCode" placeholder="请输入验证码" style="float: left;width: 50%" ></Input>
              <Button type="default" @click="sendIdentityCode" style="float: left;margin-left: 10%">发送验证码</Button>
            </FormItem>
            <FormItem label="新密码" prop="newPass">
              <Input type="password" v-model="editPasswordForm.newPass" placeholder="请输入新密码" ></Input>
            </FormItem>
          </Form>
          <div slot="footer">
            <Button type="text" >取消</Button>
            <Button type="primary"  @click="saveEditPass">保存</Button>
            <Button type="ghost" @click="handleReset('editPasswordForm')" style="margin-left: 8px">重置</Button>
          </div>
        </Modal>

        <Form v-show="tagdisplay.flag2" ref="registerformCustom" :model="registerformCustom" :rules="ruleCustom" :label-width="80">
          <FormItem label="用户名：" prop="registeruserID" style="margin-top: 20px">
            <i-input  type="text" v-model="registerformCustom.registeruserID" style="width: 250px" :disabled="can">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem label="密码：" prop="registerPassword">
            <i-input type="password" v-model="registerformCustom.registerPassword" style="width: 250px">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem label="密码确认：" prop="registerPasswordComfirm">
            <i-input type="password" v-model="registerformCustom.registerPasswordComfirm" style="width: 250px">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>

          <FormItem label="电话：" prop="registerTelephone">
            <i-input type="telephone" v-model="registerformCustom.registerTelephone" style="width: 250px">
              <Icon type="ios-call" slot="prepend"></Icon>
            </i-input>
          </FormItem>


          <FormItem label="邮箱：" prop="registerEmail">
            <i-input type="email" id="emailinput" v-model="registerformCustom.registerEmail" style="width: 250px">
              <Icon type="ios-mail" slot="prepend"></Icon>
            </i-input>
          </FormItem>

          <FormItem label="验证码："  prop="registerCode">
            <i-input type="text" v-model="registerformCustom.registerCode" style="width: 100px;float: left"/>
            <Button @click="sendEmail" style="margin-left: 10%" :disabled="canGetIdentifyCode">{{buttonContent}}</Button>
          </FormItem>



          <FormItem label="身份：" >
            <RadioGroup v-model="registerformCustom.registerIdentity" @on-change="changebutton">
              <Radio label="会员"></Radio>
              <Radio label="发起者"></Radio>
            </RadioGroup>

          </FormItem>

          <FormItem>
            <Button id="choose" type="primary"  @click="appear" >选择地址</Button>
            <Button type="primary" @click="handleSubmit('registerformCustom')" style="margin-left: 10px">注册</Button>
            <Button type="ghost" @click="handleReset('registerformCustom')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>




      </div>

      <Modal v-model="showModel" :closable='false' :mask-closable=false :width="500">
        <h3 slot="header" style="color:#2D8CF0">新增地址</h3>

        <Cascader :data="addressdata" v-model="newaddress"></Cascader>

        <label class="form-inline">详细地址：
        <input type="text" class="form-control" v-model="detailaddress" style="width: 250px" placeholder="详细地址"/>
      </label>
        <Table :columns="columns" :data="data"></Table>
        <Button type="primary"  @click="addnewaddress" style="margin-left: 170px" >确认此地址</Button>



        <div slot="footer">
          <Button type="primary"  @click="disappear">确定</Button>
        </div>
      </Modal>



    </div>
</template>



<script>
  export default {
    created(){
    },



    components:{
    },
    data () {
      const validateID = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }
        else {
          callback();
        }
      };
      const validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }  else {
          callback();
        }
      };
      const validateRegisterUserID = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }  else {
          var self=this;
          this.$http.get('api/LoginController/CheckUserID/'+self.registerformCustom.registeruserID)
            .then(function (response) {
              self.userIDExitable=response.data;
              if(self.userIDExitable==false){
                //已经存在.不可以注册
                callback("用户名已经存在不可以注册")
              }else{
                //不存在,可以注册
                callback()
              }
            })
        }
      };

      const validateRegisterPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }  else {
          callback();
        }
      };
      const validateRegisterPasswordComfirm = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        }
        else if(value!=this.registerformCustom.registerPassword){
          callback(new Error('密码不匹配'));
        } else{
          callback();
        }
      };


      const validateRegisterTelephone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入电话'));
        }  else {
          callback();
        }
      };

      const validateCode = (rule, value, callback) => {
        var right=window.localStorage.getItem("code")
        if(value === ''){
          callback(new Error('请输入验证码！'));
        }
        else if(value!=right){
          callback(new Error('验证码错误！'))
        }
        else{
          callback();
        }
      };

      const validateRegisterCode = (rule, value, callback) => {
        if(value === ''){
          callback(new Error('请输入验证码！'));
        }
        else{
          callback();
        }
      };

      const validateRegisterEmail = (rule, value, callback) => {
        var regEmail=new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if(value === ''){
          callback(new Error('请输入邮箱！'));
        }
        else if(!regEmail.test(value)){
          callback(new Error('邮箱格式有误！'));
        }
        else{
          // var self=this;
          // this.$http.get('api/LoginController/CheckEmail/'+self.registerformCustom.registerEmail)
          //   .then(function (response) {
          //     self.EmailExitable=response.data;
          //     console.log(self.EmailExitable)
          //     if(self.EmailExitable==false){
          //       //邮箱已经存在不可以注册
          //       callback("邮箱已经存在不可以注册");
          //     }else{
          //       //邮箱不存在可以注册
          //       callback()
          //     }
          //   })
          callback()
        }
      };

      const validateModifyOldPass = (rule, value, callback) => {
        var regEmail=new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        console.log(value)
        if(value === ''){
          callback(new Error('请输入邮箱！'));
        }
        else if(!regEmail.test(value)){
          callback(new Error('邮箱格式有误！'));
        }
        else{
          // var self=this;
          // this.$http.get('api/LoginController/CheckEmail/'+self.editPasswordForm.Email)
          //   .then(function (response) {
          //     self.EmailExitable=response.data;
          //     console.log(self.EmailExitable)
          //     if(self.EmailExitable==true){
          //       //邮箱已经存在可以修改密码
          //       callback();
          //     }else{
          //       //邮箱不存在不可以修改
          //       callback("不存在该邮箱请重新输入")
          //     }
          //   })
          callback()
        }
      };
      const validateModifyNewPass = (rule, value, callback) => {
        if(value === ''){
          callback(new Error('请输入验证码！'));
        }
        else{
          callback();
        }
      };
      const validateModifyRePass = (rule, value, callback) => {
        if(value === ''){
          callback(new Error('请输入新密码！'));
        }
        else{
          callback();
        }
      };




      return {

        can:false,
        shopID:'',
        showModel:false,
        data:[],
        newaddress:'',
        detailaddress:'',

        columns:[
          {
            title:'地址',
            key:'address'
          },

          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],


        addressdata:[{
          value: '北京',
          label: '北京',
          children: [
            {
              value: '',
              label: '故宫'
            },
            {
              value: '天坛',
              label: '天坛'
            },
            {
              value: '王府井',
              label: '王府井'
            }
          ]
        },
          {
          value: '江苏',
          label: '江苏',
          children: [
            {
              value: '南京',
              label: '南京',
              children: [
                {
                  value: '夫子庙',
                  label: '夫子庙',
                }
              ]
            },
            {
              value: '南通',
              label: '南通',
              children: [
                {
                  value: '海安',
                  label: '海安',
                },
                {
                  value: '如皋',
                  label: '如皋',
                }
              ]
            }
          ],
        }],

        userIDExitable:"",//用户名是否存在
        EmailExitable:"",//邮箱是否存在
        model1:false,
        model2:false,
        isshowing:true,
        buttonContent:'发送验证码',
        canGetIdentifyCode:false,
        tagdisplay:{
          flag1:true,
          flag2:false
        },
        formCustom: {
          userID: '',
          password: '',
          code:'',
        },
        registerformCustom:{
          registeruserID:'',
          registerPassword:'',
          registerPasswordComfirm:'',
          registerIdentity:'会员',
          registerEmail:'',
          registerCode:'',
          registerTelephone:''
        },

        //修改密码
        editPasswordForm: {
          Email: '',//邮箱
          IdentityCode:'',//验证码
          newPass: ''//新密码
        },


        ruleCustom: {
          code:[
            {validator:validateCode,trigger:'blur'}
          ],
          userID: [
            { validator: validateID, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          registeruserID:[
            {validator:validateRegisterUserID,trigger:'blur'}
          ],
          registerPassword:[
            {validator:validateRegisterPassword,trigger:'blur'}
          ],

          registerPasswordComfirm:[
            {validator:validateRegisterPasswordComfirm,trigger:'blur'}
          ],

          registerTelephone:[
            {validator:validateRegisterTelephone,trigger:'blur'}
          ],
          registerEmail:[
            {validator:validateRegisterEmail,trigger:'blur'}
          ],
          registerCode:[
            {validator:validateRegisterCode,trigger:'blur'}
          ],
          Email:[
            {validator:validateModifyOldPass,trigger:'blur'}
          ],
          IdentityCode:[
            {validator:validateModifyNewPass,trigger:'blur'}
          ],
          newPass:[
            {validator:validateModifyRePass,trigger:'blur'}
          ]

        }
      }
    },



    computed: {
      //计算浏览器的高度
      mapHeight() {
        return window.innerHeight +'px'
      }

    },
    methods: {

      getShopID(){
        var self = this
        this.$http.get("api/LoginController/getShopID")
          .then(function (response) {
            self.registerformCustom.registeruserID = response.data
          })
      },

      changebutton(){
        if(this.registerformCustom.registerIdentity=='会员'){
          document.getElementById("choose").disabled = false
          this.can = false
          this.registerformCustom.registeruserID=''
        }

        else{

          document.getElementById("choose").disabled = true
          this.can = true
          this.getShopID()
        }

      },
      remove(index){
        this.data.splice(index,1)
      },
      addnewaddress(){
        //alert(this.newaddress.toString().replace(/,/g,'')+this.newaddress)
        var obj = {
          address:this.newaddress.toString().replace(/,/g,'')+this.detailaddress
        }
        this.data.push(obj)
        this.newaddress=''
        this.detailaddress=''
      },

      appear(){
        this.showModel=true
      },
      disappear(){
        this.showModel=false
      },

      saveEditPass(){
        //根据邮箱去后端找userid来修改密码
        var self=this;
        this.$http.get('api/LoginController/devise/'+self.editPasswordForm.Email+"/"+self.editPasswordForm.IdentityCode
          +"/"+self.editPasswordForm.newPass,{

        }).then(function (response) {
          var result=response.data;
          if(self.EmailExitable==false){
            self.$Message.warning("不存在邮箱请重新输入")
          }else if(self.EmailExitable==true) {
            if (flag == 0) {
              self.$Message.warning("不存在该用户")
            } else if (flag == 1) {
              self.$Message.warning("验证码错误")
            } else {
              self.$Message.success("修改成功")
              self.model1 = false;
            }
          }
        })
      },
      ForgetPassword(){
        this.model1=true;
      },

      sendIdentityCode(){
        var self=this;
        this.$http.get('api/LoginController/SendMail/'+self.editPasswordForm.Email,{

        }).then(function (response) {
          self.$Message.success("发送成功");
        })
      },


      init(){
        this.isshowing=true
      },

      show(){
        console.log("show"+window.localStorage.getItem("code"))
      },

      sendEmail(){
        if(this.registerformCustom.registerEmail===''){
          this.$Message.warning("邮箱不能为空！")
          return
        }
        var m=this;
        this.$http.get('api/LoginController/SendMail/'+m.registerformCustom.registerEmail,{
        }).then(function (response) {
          m.$Message.success("发送成功");
        })
        this.wait()
      },

      //登录方法
      login(){



        var self=this
        var identity;
        var userID=this.formCustom.userID
        this.$http.get('api/LoginController/login/'+this.formCustom.userID+"/"+this.formCustom.password,{
        })
          .then(function (response) {
            identity=response.data
            window.localStorage.removeItem("identity")
            if(identity=='管理员') {
              window.localStorage.setItem("identity","管理员")
              self.$router.push({
                name: 'admin',
              })
            }
            else if(identity=='会员'){
              window.localStorage.setItem("identity","会员")
              self.$router.push({
                name: 'user',
              })
            }
            else if(identity=='餐厅人员'){
              window.localStorage.setItem("identity","餐厅人员")
              self.$router.push({
                name: 'requestor',
              })
            }
            else {
              self.$Message.error(identity)
            }
          } )
          .catch(function (error) {alert(error) })

        window.localStorage.removeItem("userID");
        //将userid保存到localstorage
        window.localStorage.setItem("userID",userID)
        // var curtime = new Date().getTime()
        // window.localStorage.setItem("time",JSON.stringify(curtime))
      },

      //注册
      register(){
        // if(this.userIDExitable==false){
        //   this.$Message.warning("用户名已经存在不可以注册")
        // }else if(this.EmailExitable==false){
        //   this.$Message.warning("邮箱已经存在不可以注册")
        // }else {

          var api = 'api/LoginController/userRegister/'
          if (this.registerformCustom.registerIdentity == '发起者')
            var api = 'api/LoginController/requestorRegister/'
          var self = this



          // var params = new URLSearchParams();
          // params.append("id",this.registerformCustom.registeruserID)
          // params.append("telephone",this.registerformCustom.registerTelephone)
          // params.append("password",this.registerformCustom.registerPassword)
          // params.append("email",this.registerformCustom.registerEmail)
          // params.append("code",this.registerformCustom.registerCode)
          //
          //
          // this.$http.post('api/LoginController/userRegister',params)
          //   .then(function (response) {
          //     this.$Message.success("注册成功")
          //   })


          var params = new URLSearchParams();
          var array = []
          for(var i=0 ;i<this.data.length;i++){
            array.push(this.data[i].address)
          }
          params.append("address",JSON.stringify(array))
          this.$http.post(api
            + self.registerformCustom.registeruserID + '/'
            + self.registerformCustom.registerEmail +  "/"
            + self.registerformCustom.registerCode + "/"
            + self.registerformCustom.registerPassword + "/"
            + self.registerformCustom.registerTelephone,params)
            .then(function (response) {
              var flag = response.data
              if (flag == false) {

              } else {
                self.changetag(0)
              }
            })
            .catch(function (error) {
              console.log(error)
            })

      },


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

      changetag(num){
        if (num==0){
          this.tagdisplay.flag1=true
          this.tagdisplay.flag2=false
        }
        else {
          this.tagdisplay.flag1=false
          this.tagdisplay.flag2=true
        }
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
            if(this.tagdisplay.flag1==true)
              this.login()
            else
              this.register()
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
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

<template>
  <div style="position:absolute;left:0%;top:0;width:100%;height:11%;background-color: #008de1">
    <strong style="position:absolute;left:5%;top:8%;font-size: 35px;color: white;cursor: pointer">Yummy</strong>
    <div @click="mainp" class="bar" style="position:absolute;left:20%;top:0;width:15%;height:100%">
      <p style="position: absolute;top:25%;left:40%;font-size: 20px;color: white">首页</p>
    </div>
    <div onclick="" class="bar" style="position:absolute;left:35%;top:0;width:15%;height:100%">
      <p style="position: absolute;top:25%;left:30%;font-size: 20px;color: white">我的订单</p>
    </div>
    <div class="bar" style="position:absolute;left:50%;top:0;width:15%;height:100%">
      <p style="position: absolute;top:25%;left:30%;font-size: 20px;color: white">加盟合作</p>
    </div>
    <div class="bar" style="position:absolute;left:65%;top:0;width:15%;height:100%">
      <p style="position: absolute;top:25%;left:30%;font-size: 20px;color: white">我的客服</p>
    </div>
    <div style="position:absolute;left:85%;top:30%;width:10%;height:100%" >
      <Dropdown  @on-click="showMenu">
        <a href="javascript:void(0)" style="color: white;font-size: 16px;width: 5px;font-weight: bold">
          {{userID}}
          <Icon type="ios-arrow-down" v-show="flag"></Icon>
        </a>
        <DropdownMenu slot="list" style="z-index: 20" v-show="flag">
          <DropdownItem name="person" ><Icon type="md-person" size="20"/>个人中心</DropdownItem>
          <DropdownItem name="order"><Icon type="md-reorder" size="20"/>我的订单</DropdownItem>
          <DropdownItem name="address"><Icon type="ios-navigate" size="20"/>我的地址</DropdownItem>
          <DropdownItem name="logout" divided><Icon type="md-settings" size="20"/>退出登录</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>

    <router-view style="float:right;margin-top: -100px"></router-view>

  </div>
</template>

<script>
    export default {
      created(){
        this.init()
      },
      data(){
        return{
          flag:false,
          userName:""
        }
      },
      methods:{
        mainp(){
          this.$router.push("/mainpage")
        },
        init:function(){
          var userName = this.$getCookie("userName");
          if(userName != ""){
            this.userID = userName;
            this.flag = true;
          }else{
            this.$router.push("/login");
          }
        },
        showMenu:function(name){
          if(name == "person"){
            this.$router.push("/personalcenter")
          }else if(name == "order"){
            this.$router.push(("/personalorder"))
          }else if(name == "address"){
            this.$router.push("/address");
          }else{
            this.$setCookie("userID","",24*60);
            this.$setCookie("userName","",24*60);
            this.$router.push("/login");
          }
        }
      }
    }
</script>

<style scoped>

</style>

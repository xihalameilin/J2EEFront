<template>
    <div style="background-color: #f5f5f5" :style="{height: mapHeight}">
      <bar></bar>
      <div style="position:absolute;width:15%;height:80%;left:0;margin-top: 70px;"  >
        <Icon style="position:absolute;left:12%;top:3%;color: #696969" type="md-home" size="25"/>
        <p @click="showPerson()" class="title1" style="position:absolute;left:30%;top:3%;cursor: pointer">个人中心</p>

        <Icon style="position:absolute;left:12%;top:15%;color: #696969" type="md-copy" size="25"/>
        <p class="title1" style="position:absolute;left:30%;top:15%;">我的订单</p>
        <p @click="showOrder()" class="title2" style="position:absolute;left:30%;top:23%;">近三个月订单</p>

        <Icon style="position:absolute;left:12%;top:35%;color: #696969" type="md-person" size="25"/>
        <p class="title1" style="position:absolute;left:30%;top:35%;">我的资料</p>
        <p @click="showPersonInfo()" class="title2" style="position:absolute;left:30%;top:43%;">个人资料</p>
        <p @click="showAddress()" class="title2" style="position:absolute;left:30%;top:51%;">地址管理</p>

        <Icon style="position:absolute;left:12%;top:63%;color: #696969" type="logo-usd" size="25"/>
        <p class="title1" style="position:absolute;left:30%;top:63%;">我的资产</p>
        <p class="title2" style="position:absolute;left:30%;top:71%;">我的红包</p>
        <p class="title2" style="position:absolute;left:30%;top:79%;">账户余额</p>
        <p class="title2" style="position:absolute;left:30%;top:87%;">我的金币</p>
      </div>
    </div>
</template>

<script>
  import bar from '@/components/NavBar'
    export default {
      components:{
        bar
      },
      computed: {
        //计算浏览器的高度
        mapHeight() {
          return document.documentElement.scrollHeight +'px'
        }
      },
      methods:{
        showPerson(){
          this.$router.push("/personalcenter")
        },
        showOrder(){
          this.$router.push("/personalorder")
        },
        showPersonInfo(){

        },
        showAddress:function(){

        },
      }
    }
</script>

<style scoped>
  .title1{
    font-size: 18px;
    font-weight: bold;
    color: black;
  }
  .title2{
    font-size: 16px;
    color: #585858;
    cursor: pointer;
  }
</style>

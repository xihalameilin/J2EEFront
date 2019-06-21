<template style="background-color: #9ea7b4">
  <div>
    <ShoppingCart></ShoppingCart>
    <NavBar></NavBar>
    <PersonBar></PersonBar>
    <div :style="ContentStyle" >
      <br>
      <label style="margin-left: 3%">个人资料</label>
      <br>
      <Divider dashed></Divider>
       <label style="margin-left: 5%">头像</label>
      <img src="../images/default_avator.png" style="width:25%; height: 200px">
    </div>
  </div>
</template>
<script>
  import ShoppingCart from '@/components/ShoppingCart'
  import NavBar from '@/components/NavBar'
  import PersonBar from '@/components/PersonBar'
  export default {
    components:{
      ShoppingCart,
      NavBar,
      PersonBar
    },
    data(){
      return{
        ContentStyle:{
          backgroundColor: 'white',
          fontSize: '15px',
          fontWeight: 'bold',
          width: '67%',
          border:' 1px solid #d7dde4',
          marginLeft:'18%',
          float:'left',
          marginTop:'-40%',
        },
      }
    },
    methods:{

    },
  }
</script>

<style scoped>
  div{

    width: 100%;

    height: 100%;

    background-color: #f5f5f5;

  }
</style>

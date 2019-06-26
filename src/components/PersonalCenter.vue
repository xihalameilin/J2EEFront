<template style="background-color: #9ea7b4">
  <div>
    <ShoppingCart></ShoppingCart>
    <NavBar></NavBar>
    <PersonBar></PersonBar>
    <div style="position:absolute;left:20%;top:15%;width:70%;height:70%;font-size: 18px;background-color: white;border:1px solid #d7dde4">
      <label style="position:absolute;;left: 3%;top:0;">个人资料</label>
      <label style="position: absolute;left:5%;top:15%">头像</label>
      <img src="../images/default_avator.png" style="position:absolute;left:15%;top:5%;width:25%; height: 200px">
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
    mounted(){
      document.querySelector('body').setAttribute('style', 'background-color:#f7f7f7');
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

<template>
  <div>
    <div id="Shopping" style="z-index:100;position: fixed;background-color: #333333;width: 1.6%;margin-left: 98.4%;" >
      <Button :long="true" :style="ButtonStyle" @click="ButtonClick" type="primary">
        <Icon type="ios-cart-outline" size="15" />
        <label style="float: left;padding: 0;margin-left: 30%">
          购
        </label>
        <label style="float: left;padding: 0;margin-left: 30%">
          物
        </label>
        <label style="float: left;padding: 0;margin-left: 30%">
          车
        </label>
      </Button>
    </div>

    <Drawer @on-close="DrawerClose" :mask-style="maskStyle" :closable="false" :scrollable="true" :mask="true" title="购物车" width="18" v-model="value4">
      <Table style="position:absolute;height: 90%" :data="ShoppingCartdata" :columns="tableColumns" stripe>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="error" size="small" style="margin-right: 5px" @click="Delete(index)">删除</Button>
        </template>
      </Table>
      <Button type="primary" @click="submit" style="position: absolute;top:93%;">提交</Button>
    </Drawer>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        name:"ShoppingCart",
        tableColumns:[{
          title:'名称',
          key:'name'
        },{
          title:'数量',
          width:50,
          key:'num'
        },{
          title:'价格',
          key:'price',
          width:50
        },{
          title:'操作',
          slot: 'action',
          width: 60,
          align: 'center'
        }],//列
        value4: false,
        ShoppingCartdata:[],//购物车数据
        pStyle: {
          fontSize: '16px',
          color: 'rgba(0,0,0,0.85)',
          lineHeight: '24px',
          display: 'block',
          marginBottom: '16px'
        },
        maskStyle:{
          backgroundColor: 'rgba(255,255,255,0)'
        },
        ButtonStyle:{
          fontSize:'12px',
          textAlign:'center',
          padding:'0px',
          verticalAlign:'middle',
          lineHeight:'22px',
          margin:'0px',
          height:'105px',
          marginTop:'250px',
        },
      }
    },
    mounted(){
      let m =document.getElementById("Shopping")
      m.style.height =window.innerHeight + 'px'
    },
    methods:{
      Delete(index){
        this.ShoppingCartdata.splice(index,index+1)
        this.$setCookie("orderItems",JSON.stringify(this.ShoppingCartdata))
      },
      submit() {
        this.$router.push("/checkout")
      },
      ButtonClick(){
        this.value4=true
        let m =document.getElementById("Shopping")
        m.style.marginLeft= '80.4%'
        this.ShoppingCartdata = JSON.parse(this.$getCookie("orderItems"))
      },
      DrawerClose(){
        let m =document.getElementById("Shopping")
        m.style.marginLeft= '98.4%'
      },
    }
  }
</script>
<style>
  .demo-drawer-profile{
    font-size: 14px;
  }
  .demo-drawer-profile .ivu-col{
    margin-bottom: 12px;
  }
</style>

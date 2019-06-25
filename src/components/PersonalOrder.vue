<template style="background-color: #9ea7b4">
  <div>
    <ShoppingCart></ShoppingCart>
    <NavBar></NavBar>
    <PersonBar></PersonBar>

    <!--订单界面-->
      <div :style="ContentStyle" v-show="orderflag">
        <br>
        <label style="margin-left: 3%">近三个月的订单</label>
        <Divider style="margin-top: 3px;" dashed></Divider>
        <div style="background-color: white">
          <Table :data="tableData1" :columns="tableColumns1" stripe>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">订单详情</Button>
            <Button type="error" size="small" style="margin-right: 5px" @click="Again(index)">再来一份</Button>
          </template>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="total" :current="1" @on-change="changePage"></Page>
            </div>
          </div>
          </Table>
        </div>
      </div>

    <!--订单详情界面-->
    <div :style="ContentStyle" v-show="orderDetail">
      <br>
      <label style="margin-left: 2%">订单详情</label>
      <Button style="margin-left:30%" @click="back">返回</Button>
      <Divider style="margin-top: 3px;" dashed></Divider>
      <!--管理订单状态-->
      <div>

      </div>
      <!--显示单品-->
      <div>

      </div>
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
        orderflag:true,
        orderDetail:false,
        total:0,
        orderdetaildata:[],//订单详情数据
        orderdetail:[],//订单表格内容
        tableData:[],//保存全部订单数据
        tableData1:[//当时改变了页数的订单数据
        ],
        tableColumns1:[{
          title:'下单时间',
          key:'date'
        },{
          title:'支付金额',
          key:'total',
        },{
          title:'状态',
          key:'status',
      },{
          title:'操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }],
        ContentStyle:{
          backgroundColor: 'white',
          fontSize: '15px',
          fontWeight: 'bold',
          width: '70%',
          border:' 1px solid #d7dde4',
          marginLeft:'18%',
          float:'left',
          marginTop:'-40%',
        },

      }
    },
    created(){
      //拿取3个月的订单数据
      var self  = this
      var usercookie = this.$getCookie("userID")
      this.$http.get('api/OrderController/GetThreeMonths/'+usercookie,{
      }).then(function (response) {
        self.tableData=response.data
        for(var i =0 ; i<self.tableData.length ; i++){
          if(self.tableData[i]["state"]==0){
            self.tableData[i]["status"]="待付款"
          }
        }
        self.tableData1=response.data
      })
    },
    methods:{
      //展示详情
      show(index){
        this.orderDetail=true
        this.orderflag=false
        //拿取详情数据
        var orderID = this.tableData1[index]["id"]
        var self = this
        this.$http.get('api/OrderController/getAllOrderItems/'+orderID,{
        }).then(function (response) {
          self.orderdetaildata=response.data
        })
      },
      //再来一份
      Again(index){

      },
      //分页
      changePage () {

      },
      back(){
        this.orderDetail=false
        this.orderflag=true
      }
    }
  }
</script>

<style scoped>
  div{

    width: 100%;

    height: 100%;

    background-color: #f5f5f5;

  }
</style>

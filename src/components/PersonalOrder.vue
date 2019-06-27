<template>
  <div>
    <ShoppingCart></ShoppingCart>
    <NavBar></NavBar>
    <PersonBar></PersonBar>

    <!--订单界面-->
    <div  style="position:absolute;left:20%;top:20%;width:70%;" v-show="orderflag">
      <br>
      <label style="position:absolute;left:0;top:0;margin-left: 3%;font-size: 18px">近三个月的订单</label>
      <div style="position:absolute;left:0%;top:5%;width:100%;height:70%;background-color: white;">
        <Table style="position:absolute;height: 100%" :data="tableData1" :columns="tableColumns1" stripe>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">订单详情</Button>
            <Button type="error" size="small" style="margin-right: 5px" @click="Again(index)">再来一份</Button>
          </template>
        </Table>
      </div>
    </div>

    <!--订单详情界面-->
    <div style="position:absolute;left:20%;top:20%;width:70%;height:70%;" v-show="orderDetail">
      <br>
      <label style="margin-left: 2%">订单详情</label>
      <Divider style="margin-top: 3px;" dashed></Divider>
      <Table style="position:absolute;top:10%" :data="orderdetaildata" :columns="orderdetail"></Table>
      <Button type="primary" style="margin-top: 2%;margin-left:44%" @click="back">返回</Button>
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
        orderdetail:[{
          title:'名称',
          key:'name'
        },{
          title:'数量',
          key:'num'
        },{
          title:'单价',
          key:'price'
        },{
          title:'总价',
          key:'total'
        }],//订单表格内容
        tableData:[],//保存全部订单数据
        tableData1:[//当时改变了页数的订单数据
        ],
        tableColumns1:[{
          title:"商店名称",
          key:'name'
        },{
            title:'下单时间',
            key:'date'
      },{
          title:'支付金额',
          key:'total',
        },{
          title:'操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }],

      }
    },
    mounted(){
      document.querySelector('body').setAttribute('style', 'background-color:#f7f7f7');
    },
    created(){
      //拿取3个月的订单数据
      var self  = this
      var usercookie = this.$getCookie("userID")
      this.$http.get('api/OrderController/GetThreeMonths/'+usercookie,{
      }).then(function (response) {
        response.data.sort(function(a,b){
          return b.date.localeCompare(a.date);
        })
        self.tableData=response.data
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
        var self = this
        var orderID = this.tableData1[index]["id"]
        this.$http.get('api/OrderController/getAllOrderItems/'+orderID,{
        }).then(function (response) {
          self.orderdetaildata=response.data
          var orderItem=[]
          console.log(response.data)
          for (var i =0 ; i<self.orderdetaildata.length ; i++){
            var obj={}
            obj['iid'] = self.orderdetaildata[i]['iid']
            obj['name'] = self.orderdetaildata[i]['name']
            obj['price'] = self.orderdetaildata[i]['price']
            obj['num'] = self.orderdetaildata[i]['num']
            obj['total'] = self.orderdetaildata[i]['total']
            orderItem.push(obj)
          }
          self.$setCookie("orderItems",JSON.stringify(orderItem))
          self.$router.push({
            name:'shopdetail',
            params:{
              id:self.tableData1[index].shopID
            }
          })
        })
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

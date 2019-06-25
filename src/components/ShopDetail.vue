<template>
  <div id="page" style="background-color: #f5f5f5">
    <ShoppingCart></ShoppingCart>

  <div style="float: left;width: 100%">
    <div :style="note">
      <img src="../images/shopHeader.jpg" style="width: 100%;height: 10em"/>
    </div>
    <div style="width: 100%;padding-top: 0.5em;">
      <center>
        <Button type="text" size="large">默认排序
          <Icon type="md-arrow-down"/>
        </Button>
        <Button type="text" size="large">评分
          <Icon type="md-arrow-down"/>
        </Button>
        <Button type="text" size="large">销量
          <Icon type="md-arrow-down"/>
        </Button>
        <Button type="text" size="large">价格
          <Icon type="md-arrow-down"/>
        </Button>
        <Input icon="ios-search" placeholder="搜索美食..." style="width: 30%;padding-left: 10%"/>
      </center>
    </div>
    <div id="suibian" style="background-color: #f5f5f5;width: 100%;border: 1px solid black" >

      <div id="allDishes" style="position:absolute;left:5%;width:60%;height:100%;">

        <div v-for="item in shopList" style="float:left;height: 100px;width:45%;height:20%;background-color: white;margin-left: 2%;margin-top: 3%">
          <div style="position:absolute;margin-left:0;margin-top:0;width:50%;height:20%;">
            <img :src="item.url" style="position:absolute;left:0;top:0;height:100%;width:30%"/>
            <p style="position:absolute;left:35%;top:10%;font-family: 黑体;font-size: 16px;font-weight: bold;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;width: 50%">{{item.name}}</p>
            <p style="position:absolute;left:35%;top:30%;font-family: 黑体;font-size: 14px;font-weight: normal;color: #657180">月售{{item.num}}份</p>
            <Rate style="position:absolute;left:35%;top:45%" disabled allow-half v-model="valueHalf"/>
            <p style="position:absolute;left:35%;top:65%;font-size: 16px;font-weight: bold;color: red">¥{{item.price}}</p>
            <Button style="position:absolute;left:65%;top:65%" type="primary" shape="circle" @click="add(item.id)">加入购物车</Button>
          </div>
        </div>

      </div>

      <div style="float: right;position: relative;right: 5%;margin-top: 2em">
        <Card style="width:25em">
          <p slot="title">
            商家公告
          </p>
          <Button type="primary" @click="submit">提交</Button>
          <p>公告内容</p>
        </Card>

      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import ShoppingCart from '@/components/ShoppingCart'
  export default {
    components:{
      ShoppingCart
    },
    created(){
      this.getAllDishes()
    },

    computed:{
    },
    mounted(){
      document.querySelector('body').setAttribute('style', 'background-color:#f7f7f7');
    },
    data() {
      return {
        //购物车
        shopID:"",
        shopName:"",
        shopCart:[],
        orderItems:[],
        note: {
          backgroundImage: "url(" + require("../images/shopHeader.jpg") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 50px",
          // marginTop: "5px",
        },
        valueHalf: 4.5,
        activeNames: ['1'],
        showShop: false,
        goodsNum: 1,
        shopList: []
      }
    },
    created(){
      this.shopID=this.$route.params.id
      this.shopName = this.$route.params.name
      this.getAllDishes()
    },
    methods: {

      submit(){
        var shopID= this.shopID
        var userID = this.$getCookie("userID")
        var address = "nju"
        var name = this.shopName
        var total = 0;
        for(var i=0;i<this.orderItems.length;i++){
          total+=this.orderItems[i]['total']
        }
        var self = this
        this.$http({
          url:"api/OrderController/insertOrder",
          method:'post',
          headers:{"Content-Type": "application/json;charset=UTF-8"},
          data:JSON.stringify({
            "shopID":shopID,
            "userID":userID,
            "address":address,
            "name":name,
            "total":total,
            "orderItems":self.orderItems
          })
        }).then(function (response) {
          alert(response.data)
        })

      },

      getAllDishes(){
        var self = this
        this.$http.get('api/ShopController/getAllDishes/' + this.shopID).then(function (res) {
          var data = res.data
          for(var i=0;i<data.length;i++){
            data[i]['count']=0
          }
          self.shopList = res.data
        })
      },


      add(id){
        for(var i=0;i<this.shopList.length;i++){
          var shop = this.shopList[i]
          if(id==shop['id']){
            var flag = false;
            for(var j=0;j<this.orderItems.length;j++){
              var orderItem = this.orderItems[j]
              if(orderItem['iid']==id){
                orderItem['num']++;
                orderItem['total']+=orderItem['price']
                flag = true;
                break;
              }
            }
            //不存在
            if(flag == false){
              var obj={};
              obj['iid'] = shop['id']
              obj['name'] = shop['name']
              obj['price'] = shop['price']
              obj['num'] = 1
              obj['total'] = shop['price']
              this.orderItems.push(obj)
            }

            break;
          }
        }
        this.$Message.success("已经增加")
        this.$setCookie("orderItems",JSON.stringify(this.orderItems))
      },

      handleChange(val) {
        // console.log(val);
      },

      viewShopCar() {
        this.showShop = !this.showShop;
      }
    }
  }
  </script>


  < style
  scoped >
  .backgroudDiv
  {
    background - image
  :
    url("../images/shopHeader.jpg");
    height: 50
    px;
    width: 100 %;
    background - size
  :
    cover;
  }

  .text
  {
    font - size
  :
    14
    px;
  }

  .item
  {
    margin - bottom
  :
    18
    px;
  }

  .clearfix:before,
  .clearfix:after
  {
    display: table;
    content: "";
  }

  .clearfix:after
  {
    clear: both
  }

  .box - card
  {
    width: 480
    px;
  }
  <
  /style>

<template>
  <div style="position:absolute;width:100%;height:100%">
    <!--上面的部分-->
    <div style="position:absolute;left:0;top:0;width:100%;height:25%;background-color: white">
      <img src=".././images/logo3.png" style="position:absolute;left:5%;width:20%;height:100%"/>
      <p style="position: absolute;left:28%;top:10%;font-size: 40px;color: #008de1;margin-top: 20px">订单信息</p>
      <Steps :current="1" style="position:absolute;left:60%;top:10%;width: 35%;margin-top: 20px">
        <Step title="选择商品" ></Step>
        <Step title="确认订单信息" ></Step>
        <Step title="成功提交订单" ></Step>
      </Steps>
    </div>

    <div style="position:absolute;left:4%;top:28%;width:30%;height:70%;border: 1px solid #cdcdcd;background-color: white">
      <p style="position:absolute;left:5%;top:1.5%;font-size:20px;font-weight: bold">订单详情</p>
      <div style="position:absolute;left:0%;top:12%;width:100%;height: 1px;background-color: #cdcdcd"></div>
      <p style="position:absolute;left:10%;top:15%;font-size: 15px">商品</p>
      <p style="position: absolute;left: 45%;top:15%;font-size: 16px">份数</p>
      <p style="position: absolute;left: 70%;top:15%;font-size: 16px">小计（元）</p>
      <div style="position:absolute;left:0%;top:24%;width:100%;height: 1px;background-color: #cdcdcd"></div>
      <div class="overflow" style="position:absolute;left:0;top:25%;width:100%;height:60%">
        <div id="goodsDiv" v-for="item in goodsList" style="float:left;width:100%;height:25%;">
          <div style="position:absolute;left:0;width:100%;height:20%;">
            <p style="position:absolute;left:10%;top:20%;font-size: 16px">{{item.name}}</p>
            <p style="position: absolute;left: 45%;top:20%;font-size: 16px">x{{item.num}}</p>
            <p style="position: absolute;left: 70%;top:20%;font-size: 16px">￥{{item.price}}</p>
            <div style="position:absolute;left:0%;top:80%;width:100%;height: 1px;background-color: #cdcdcd"></div>
          </div>
        </div>
      </div>
      <p style="position:absolute;left:30%;bottom:5%;font-size: 30px;color: black;">总计：</p>
      <p style="position:absolute;left:55%;bottom:2%;font-size: 45px;color: red;">¥35.5</p>
    </div>

    <div style="position:absolute;right:4%;top:28%;width:60%;height:70%;border: 1px solid #cdcdcd;background-color: white">
      <p style="position:absolute;left:3%;top:3%;font-size: 20px;font-weight: bold">收货地址</p>
      <Icon type="ios-navigate-outline" size="40" style="position:absolute;left:3%;top:13%;" />
      <Select v-model="address" size="large" style="position:absolute;left:10%;top:13%;width:80%;">
        <Option v-for="item in addressList" :value="item.address" :key="item.address">{{ item.address }}</Option>
      </Select>

      <p style="position:absolute;left:3%;top:27%;font-size: 20px;font-weight: bold">选择优惠</p>
      <p style="position:absolute;left:4%;top:40%;font-size: 16px">使用红包</p>
      <p style="position:absolute;left:15%;top:40%;font-size: 16px;color: grey;width: 50%">无可用红包</p>
      <p style="position:absolute;left:4%;top:50%;font-size: 16px">使用优惠券</p>
      <p style="position:absolute;left:18%;top:50%;font-size: 16px;color: grey">网站不支持</p>
      <p style="position:absolute;left:29%;top:50%;font-size: 16px;color: orangered">(仅手机客户端可用)</p>
      <p style="position:absolute;left:3%;top:60%;font-size: 20px;font-weight: bold">其他信息</p>
      <p style="position:absolute;left:4%;top:70%;font-size: 16px;">配送方式&ensp;&ensp;&ensp;本订单由<span style="color: #008de1">蜂鸟专送</span>配送</p>

      <Button type="error" style="position:absolute;left:5%;top:85%">确认下单</Button>
    </div>
  </div>
</template>

<script>
    export default {
      mounted(){
        document.querySelector('body').setAttribute('style', 'background-color:#f7f7f7');
      },
      data(){
          return{
            address:'',
            addressList:[
              {

              }
            ],
            goodsList:[
              {name:"冒菜",num:"2",price:"15.00"},
              {name:"冒菜",num:"2",price:"15.00"},
              {name:"冒菜",num:"2",price:"15.00"},
              {name:"冒菜",num:"2",price:"15.00"},
              {name:"冒菜",num:"2",price:"15.00"},
              {name:"冒菜",num:"2",price:"15.00"}
            ]
          }
      },


      created(){

      },

      methods:{
        getAllAddresses(){
          var self = this
          this.$http.get()
            .then(function(response){
            self.addressList = response.data
          })
        }
      }
    }
</script>

<style scoped>

</style>

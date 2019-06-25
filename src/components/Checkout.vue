<template>
  <div>
    <!--上面的部分-->
    <div style="height: 130px;border: 2px solid black">
      <div style="margin-left: 10%;float: left">
        <img src=".././images/logo3.png" style="float: left"/>
        <p style="float: left;font-size: 45px;color: #008de1;margin-top: 20px">|订单信息</p>
      </div>
      <Steps :current="1" style="float: right;width: 40%;margin-top: 20px">
        <Step title="选择商品" ></Step>
        <Step title="确认订单信息" ></Step>
        <Step title="成功提交订单" ></Step>
      </Steps>
    </div>




    <div style="border: 1px solid black;width: 20%;height: 500px;float: left;margin-left: 20%;margin-top: 20px">
      <div style="height: 50px;border: #8f8f8f solid 0.5px">
        <p style="font-size: 20px ">订单详情</p>
      </div>
      <p style="margin-top: 20px">&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;商品&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;份数&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;小计(元)</p>
      <div style="height: 40px;border: #d0d0d0 1px solid;background-color: #e1e1e1">
        每一项内容
      </div>

      <p style="font-size: 50px;color: red;float: right;">¥35.5</p>
    </div>






    <div style="border: 2px solid black;width: 30%;height: 500px;float: left;margin-left: 5%;margin-top: 20px">
      <p style="font-size: 20px;margin-left: 20px">收货地址</p>
      <div style="width: 100%;height: 50px">
        <Icon type="ios-navigate-outline" size="40" style="margin-left: 10%;float: left" />
        <Select v-model="address" size="large" style="width:300px;margin-left: 8%">
          <Option v-for="item in addressList" :value="item.address" :key="item.address">{{ item.address }}</Option>
        </Select>
      </div>

      <p style="font-size: 20px;margin-top: 20px;margin-left: 20px">选择优惠</p>
      <p style="font-size: 12px;margin-top: 20px;margin-left: 50px;float: left">使用红包&ensp;&ensp;&ensp;</p>
      <p style="font-size: 12px;margin-top: 20px;margin-left: 20px;float: left;color: lightgrey;width: 50%">无可用红包&ensp;&ensp;&ensp;&ensp;</p>

      <p style="font-size: 12px;margin-top: 20px;margin-left: 50px;float: left">使用优惠券&ensp;&ensp;&ensp;</p>
      <p style="font-size: 12px;margin-top: 20px;margin-left: 20px;float: left;color: lightgrey">网站不支持</p>
      <p style="font-size: 12px;margin-top: 20px;margin-left: 20px;float: left;color: orangered;width: 50%">(仅手机客户端可用)</p>


      <p style="font-size: 20px;margin-top: 80px;margin-left: 20px">其他信息</p>
      <p style="font-size: 12px;margin-top: 20px;margin-left: 50px;float: left;width: 100%">配送方式&ensp;&ensp;&ensp;本订单由蜂鸟专送配送</p>

      <Button type="error" style="margin-left: 10%;margin-top: 50px">确认下单</Button>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
          return{
            address:'',
            addressList:[
              {

              }
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

<template>
  <div style="width: 80%;float:left;">
    <Table stripe height="400" :columns="columns" :data="data"></Table>



    <label  style="margin-left: 5px">送货地址：
      <Select style="width:200px" @on-change="changeaddress">
        <Option v-for="item in address" :value="item.address" >{{item.address}}</Option>
      </Select>
    </label>


    <label style="margin-left: 50px">总价:
    <i-input  type="text" v-model="total" style="width: 100px" disabled>
      <Icon type="ios-person-outline" ></Icon>
    </i-input>
    </label>

    <label style="margin-left: 50px">优惠:
      <i-input  type="text" v-model="discount" style="width: 100px" disabled>
        <Icon type="ios-person-outline" ></Icon>
      </i-input>
    </label>

    <label style="margin-left: 50px">最终价格:
      <i-input  type="text" v-model="last" style="width: 100px" disabled>
        <Icon type="ios-person-outline" ></Icon>
      </i-input>
    </label>

    <Button type="primary" @click="submit"  style="margin-left: 50px">确认订单</Button>



    <Modal v-model="showModel" :closable='false' :mask-closable=false :width="500">


      <h3 >{{content}}</h3>

      <div slot="footer">
        <Button type="primary"  @click="pay">确定下单</Button>
        <Button type="primary"  @click="cancel">取消下单</Button>
      </div>



    </Modal>
  </div>
</template>

<script>
  export default {
    created(){
      this.shopID = this.$route.params.shopID
      this.init()
    },

    data() {

      return {
        point:0,

        orderID:0,

        showModel:false,
        content:'10秒内完成付款,超时取消订单',
        timer:{},

        address:[],

        detailaddress:'',

        total:0,
        discount:0,

        last:0,

        shopID:'',
        data:[],
        columns: [
          {
            title: '菜名',
            key: 'name',

          },
          {
            title: '单价',
            key: 'price',
          },
          {
            title: '数量',
            key: 'count',
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginLeft: '5px'
                  },
                  on: {
                    click: () => {
                      this.add(params.index)
                    }
                  }
                }, '加一份'),

                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginLeft: '5px'
                  },
                  on: {
                    click: () => {
                      this.minus(params.index)
                    }
                  }
                }, '减一份'),

              ]);
            }
          }
        ]

      }
    },

    methods:{
      appear(){
        this.content='10秒内完成付款,超时取消订单'
        this.showModel = true
      },

      disappear(){
        this.showModel = false
        this.clear()
      },

      clear(){
        clearInterval(this.timer)

      },

      wait(){
        let timeLast = 10;
        this.timer = setInterval(() => {
          if (timeLast >= 0) {
            this.content = timeLast + '秒内完成付款,超时取消订单';
            timeLast -= 1;
          } else {
            this.content = '订单已经取消';
            this.disappear()
            clearInterval(timer);

          }
        }, 1000);
      },

      cancel(){
        var orderID = this.orderID
        this.$http.post('api/OrderController/changeState/'+orderID+'/'+1)
          .then(function () {
            this.$Message.success("下单成功")
          })

        this.disappear()
      },

      pay(){
        var orderID = this.orderID
        this.$http.post('api/OrderController/changeState/'+orderID+'/'+2)
          .then(function () {
            this.$Message.success("取消成功")
          })

        this.disappear()
      },


      submit(){


        var shopID = this.shopID
        var userID = window.localStorage.getItem("userID")
        var address = this.detailaddress
        var total = this.last

        var params = new URLSearchParams()
        var array = []
        for(var i=0;i<this.data.length;i++){
          if(this.data[i]['count'] != 0){
            var obj = this.data[i]['id']+" "+this.data[i]['name']+" "+this.data[i]['price']+" "+this.data[i]['count']
            array.push(obj)
          }
        }
        params.append("item",JSON.stringify(array))


        var self = this
        this.$http.post('api/OrderController/insertOrder/'+userID+'/'+shopID+'/'+address+'/'+total,params)
          .then(function (response) {
             self.orderID = response.data
             self.appear()
             self.wait()
          })
          .catch(function (error) {

          })
      },

      changeaddress(address){
       this.detailaddress = address
      },

      add(index){
        //添加商品
        this.data[index]['count']++;
        this.total+= this.data[index]['price']

        if(this.point<100){
          this.discount = this.total*0.1
          this.last = this.total - this.discount
        }
        else if(this.point<200){
          this.discount = this.total*0.2
          this.last = this.total - this.discount
        }
        else {
          this.discount = this.total*0.6
          this.last = this.total - this.discount
        }



      },

      minus(index){
        if( this.data[index]['count']>0) {
          this.data[index]['count']--
          this.total -= this.data[index]['price']
        }
        else {
          this.$Message.warning("你还未点单")
        }

        this.discount = this.total/10
        this.last = this.total - this.discount
      },

      init(){
        let self = this
        this.$http.get('api/QueryController/getAllDishes/'+this.shopID)
          .then(function (response) {
            var data = response.data
            for(var i=0;i<data.length;i++){
              data[i]['count']=0
            }
            self.data = data

          })
          .catch(function (error) {

          })


        //得到所有的地址
        this.$http.get('api/QueryController/getAllAddresses/'+window.localStorage.getItem("userID"))
          .then(function (response) {
            console.log(response.data)
            self.address = response.data
          })
          .catch(function (error) {

          })


        this.$http.get('api/QueryController/getUser/'+window.localStorage.getItem("userID"))
          .then(function (response) {
            self.point = response.data.point

          })
          .catch(function (error) {

          })

      }
    },


  }
</script>

<style scoped>

</style>

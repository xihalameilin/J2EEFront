<template>
    <div style="width: 80%;float:left;">

      <label> 类型:
        <Select v-model="type" clearable style="width:200px;margin-left: 50px" @on-change="changeType" >
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </label>
      <Table stripe height="400" :columns="columns" :data="data"></Table>


      <Modal v-model="showModel" :closable='false' :mask-closable=false :width="500">


        <Table stripe height="400" :columns="columnsII" :data="detail"></Table>


        <div slot="footer">
          <Button type="primary"  @click="disappear">确定</Button>
        </div>
      </Modal>

    </div>
</template>

<script>
    export default {

      created(){
        this.init()

      },


       data(){
         return{

           showModel:false,
           cityList: [
             {
               value: '未支付',
               label: '未支付'
             },
             {
               value: '取消',
               label: '取消'
             },
             {
               value: '支付成功',
               label: '支付成功'
             }
           ],
           type: '取消',



           detail:[],
           data:[],
           ordersnotpaied:[],
           orderspaied:[],
           orderscanceled:[],


           columns:[
             {
               title: '餐厅编号',
               key: 'shopID',
             },
             {
               title: '时间',
               key: 'date',
             },
             {
               title: '总价',
               key: 'total',
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
                         this.show(params.index)
                       }
                     }
                   }, '查看详情'),



                 ]);
               }
             }
           ],

           columnsII:[
             {
               title: '商品',
               key: 'name',
             },
             {
               title: '数量',
               key: 'num',
             },
             {
               title: '单价',
               key: 'price',
             },
           ]
         }
       },


       methods:{
         init(){

           this.getOrdersCanceled()

         },

        appear(){
          this.showModel = true
        },

         disappear(){
           this.showModel = false
         },


        show(index){
         this.getOrderItems(this.data[index]['id'])
          this.appear()
        },

         changeType(item){
          if(item === '未支付'){
            this.getOrdersNotPaied()
          }
          else if(item === '取消'){
            this.getOrdersCanceled()
          }
           else if(item === '支付成功'){
            this.getOrdersPaied()
          }
         },

        getOrderItems(id){
          var self = this
          this.$http.get('api/QueryController/getAllOrderItems/'+id)
            .then(function (response) {
              self.detail = response.data
            })
        },

        getOrdersNotPaied(){
          var self = this
          var userID = window.localStorage.getItem("userID")
          this.$http.get('api/QueryController/getAllOrders/'+userID+'/'+0)
            .then(function (response) {
              self.data = response.data
            })
         },
         getOrdersCanceled(){
           var self = this
           var userID = window.localStorage.getItem("userID")
           this.$http.get('api/QueryController/getAllOrders/'+userID+'/'+1)
             .then(function (response) {
               self.data = response.data
             })
         },
         getOrdersPaied(){
           var self = this
           var userID = window.localStorage.getItem("userID")
           this.$http.get('api/QueryController/getAllOrders/'+userID+'/'+2)
             .then(function (response) {
               self.data = response.data
             })
         },


       }
    }
</script>

<style scoped>

</style>

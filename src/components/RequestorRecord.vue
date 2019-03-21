<template>
    <div style="width: 80%;float:left;">
      <Table stripe height="400" :columns="columns" :data="data"></Table>
    </div>
</template>

<script>
    export default {
      created(){
        this.getAllOrdersByShopID()
      },

       data(){
         return{
           data:[],
           columns:[
             {
               title: '时间',
               key: 'date',
               sortable: true

             },
             {
               title: '总价',
               key: 'total',
               sortable: true

             },
             {
               title: '会员',
               key: 'userID',
               sortable: true

             },
             {
               title: '送货地址',
               key: 'address',
             },
           ]
         }
       },

      methods:{
        getAllOrdersByShopID(){
          var self = this
          this.$http.get('api/QueryController/getAllOrdersByShopID/'+window.localStorage.getItem("userID"))
            .then(function (response) {
              self.data = response.data
            })
        }
      }
    }
</script>

<style scoped>

</style>

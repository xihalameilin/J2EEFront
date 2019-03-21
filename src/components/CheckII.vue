<template>
  <div style="width: 80%;float:left;">
    <Table stripe height="400" :columns="columns" :data="data"></Table>
  </div>

</template>

<script>
  export default {


    created(){
      this.getAllShopInfo()
    },
    data(){
      return{


        showModel:false,
        data:[],
        detail:[],
        columns:[
          {
            title: '编号',
            key: 'shopID',
          },
          {
            title: '地址',
            key: 'address',
          },
          {
            title: '类型',
            key: 'type',
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
                      this.approve(params.index)
                    }
                  }
                }, '通过'),


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
                      this.disapprove(params.index)
                    }
                  }
                }, '不通过'),

              ]);
            }
          }
        ],


      }
    },



    methods:{


      approve(index){

        var id = this.data[index]['id']
        var address = this.data[index]['address']
        var type = this.data[index]['type']
        var shopID = this.data[index]['shopID']
        this.data.splice(index,1)
        this.$http.post('/api/ShopController/changeShopInfoState/'+id+'/'+1+'/'+address+'/'+type+'/'+shopID)
      },

      disapprove(index){

        var id = this.data[index]['id']
        var address = this.data[index]['address']
        var type = this.data[index]['type']
        var shopID = this.data[index]['shopID']
        this.data.splice(index,1)
        this.$http.post('/api/ShopController/changeShopInfoState/'+id+'/'+2+'/'+address+'/'+type+'/'+shopID)
      },

      changeShopState(shopID){
        this.$http.post('/api/ShopController/changeState/'+shopID+'/'+1)
      },
      getAllShopInfo(){
        var self = this
        this.$http.get('api/QueryController/getAllShopChange')
          .then(function (response) {
            self.data = response.data
          })
      }
    }
  }
</script>

<style scoped>

</style>

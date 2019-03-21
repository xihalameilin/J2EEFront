<template>
  <div style="width: 80%;float:left;">
    <Table stripe height="400" :columns="columns" :data="data"></Table>
  </div>

</template>

<script>
  export default {


    created(){
      this.getAllMoneyRecord()
    },
    data(){
      return{

        data:[],
        detail:[],
        columns:[
          {
            title: '编号',
            key: 'shopID',
          },
          {
            title: '价格',
            key: 'money',
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

              ]);
            }
          }
        ],


      }
    },



    methods:{


      approve(index){

        var id = this.data[index]['id']
        var total = this.data[index]['money']
        var shopID = this.data[index]['shopID']
        this.data.splice(index,1)
        this.$http.post('/api/ShopController/changeMoneyRecordState/'+id+'/'+1+'/'+total+'/'+shopID)
      },


      getAllMoneyRecord(){
        var self = this
        this.$http.get('api/QueryController/getAllMoneyRecord')
          .then(function (response) {
            self.data = response.data
          })
      }
    }
  }
</script>

<style scoped>

</style>

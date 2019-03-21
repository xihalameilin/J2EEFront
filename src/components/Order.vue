<template>
  <div style="width: 80%;float:left;">
    <Table stripe height="400" :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
    export default {
      created(){
        this.init()
      },

      data() {
        return {
          data:[],
          columns: [

            {
              title: '姓名',
              key: 'shopID',

            },
            {
              title: '店铺名',
              key: 'name',
            },
            {
              title: '操作',
              key: 'action',
              width: 150,
              align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.jumpToDetail(params.index)
                      }
                    }
                  }, '进入店铺'),

                ]);
              }
            }
            ]

        }
      },

      methods:{
        init(){
          let self = this
          this.$http.get('api/QueryController/getAll')
            .then(function (response) {
              self.data = response.data
            })
            .catch(function (error) {

            })
        } ,

        jumpToDetail(index){
          //根据索引进入对应的详细界面
          this.$router.push({
            name:'orderdetail',
              params:{
                shopID:this.data[index].shopID
              }
          }
          )
        }
      },


    }
</script>

<style scoped>

</style>

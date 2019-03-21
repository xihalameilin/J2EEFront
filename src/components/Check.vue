<template>
  <div style="width: 80%;float:left;">
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
        this.getAllShopsNew()
      },
        data(){
          return{


            showModel:false,
            data:[],
            detail:[],
            columns:[
              {
                title: '名字',
                key: 'name',
              },
              {
                title: '地址',
                key: 'address',
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
                    }, '查看'),

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


            columnsII:[
              {
                title: '菜名',
                key: 'name',

              },
              {
                title: '单价',
                key: 'price',
              }
              ]
          }
        },



      methods:{
        appear(){
          this.showModel = true
        },

        disappear(){
          this.showModel = false
        },

        approve(index){
          this.changeShopState(this.data[index]['shopID'])
          this.data.splice(index,1)
        },

        show(index){
          this.appear()
          this.getDetail(this.data[index]['shopID'])
        },

        getDetail(id){
          var self = this
          this.$http.get('api/QueryController/getAllDishes/'+id)
            .then(function (response) {
              self.detail = response.data
            })
        },

        changeShopState(shopID){
          this.$http.post('/api/ShopController/changeState/'+shopID+'/'+1)
        },
        getAllShopsNew(){
            var self = this
            this.$http.get('api/QueryController/getAllShopsNew')
              .then(function (response) {
                self.data = response.data
              })
        }
      }
    }
</script>

<style scoped>

</style>

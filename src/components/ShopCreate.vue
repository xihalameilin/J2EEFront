<template>

  <div style="float: left;width: 100%" >

    <div class="hello" >

      <!--<label  class="form-inline" style="margin-left: 100px">结束时间：-->
        <!--<DatePicker type="date"  v-model="ddl" :options="option" format="yyyy-MM-dd" placeholder="select data" style="width: 120px;opacity: 0.8"></DatePicker></label><br>-->


      <label class="form-inline" style="margin-left: 5px">餐厅名：<input type="text" class="form-control" v-model="shopname" placeholder="餐厅名" style="opacity: 0.8;width: 100px"/></label>

      <label class="form-inline" style="margin-left: 5px">地址：<input type="text" class="form-control" v-model="address" placeholder="地址" style="opacity: 0.8;width: 200px"/></label>

      <label  style="margin-left: 5px">类型：
        <Select style="width:200px" @on-change="changetype">
          <Option v-for="item in types" :value="item" >{{item}}</Option>
        </Select>
      </label>

      <Button type="primary" @click="appear">新增菜品</Button>


      <input type="button" class="btn btn-primary" value="提交此餐厅"  @click="submit" style="margin-left: 20%">

      <Button type="primary" @click="appearII" style="margin-left: 20%" >更新信息</Button>

    </div>

    <Modal v-model="showModel" :closable='false' :mask-closable=false :width="500">
      <h3 slot="header" style="color:#2D8CF0">新增菜品</h3>

      <Table :columns="columns" :data="preTypes"></Table>
      <label class="form-inline">新增菜品：
        <input type="text" class="form-control" v-model="newtype" style="width: 250px" placeholder="菜品名"/>
      </label>

      <label class="form-inline"> &ensp;单价 ：&ensp;
        <input type="text" class="form-control" v-model="price" style="width: 250px" placeholder="单价"/>
        <Button type="primary" @click="addNewType">新增此菜品</Button>
      </label>

      <div slot="footer">
        <Button type="primary"  @click="disappear">确定</Button>
      </div>
    </Modal>


    <Modal v-model="showModel2" :closable='false' :mask-closable=false :width="500">
      <label class="form-inline">新地址：
        <input type="text" class="form-control" v-model="nnaddress" style="width: 250px" placeholder="新地址"/>
      </label>

      <label  style="margin-left: 5px">新类型：
        <Select style="width:200px" @on-change="changetypeII">
          <Option v-for="item in types" :value="item" >{{item}}</Option>
        </Select>
      </label>

      <div slot="footer">
        <Button type="primary"  @click="update">确定</Button>
      </div>

    </Modal>

  </div>

</template>



<script>

  export default {

    filters:{
      dateFormat(val) {
        let year = val.getFullYear().toString();
        let month = val.getMonth() >= 9
          ? (val.getMonth() + 1).toString()
          : "0" + (val.getMonth() + 1);
        let date = val.getDate() >= 9
          ? val.getDate().toString()
          : "0" + val.getDate();
        return year + "-" + month + "-" + date;
      }
    },


    computed:{
      lastTypes(){
        var temp=''
        for(var i=0;i<this.preTypes.length;i++)
          temp=temp+' '+this.preTypes[i].type
        return temp
      }
    },

    data() {

      return {
        nnaddress:'',
        nntype:'',


        showModel:false,
        showModel2:false,
        address:'',
        newtype:'',
        preTypes:[],
        size: 0,
        shopname:'',
        price:0,
        prePrice:[],
        types:['中餐','西餐'],
        type:'',
        option: {
          disabledDate(date){
            return date && date.valueOf() < Date.now()-86400000;
          }
        },

        columns:[
          {
            title:'菜名',
            key:'type'
          },
          {
            title:'单价',
            key:'price'
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
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ]

      }

    },

    methods: {

      update(){
        var shopID = window.localStorage.getItem("userID")
        var self = this
        this.$http.post('api/ShopController/insertShopInfo/'+shopID+'/'+this.nnaddress+'/'+this.nntype)
          .then(function () {
            self.$Message.success("已提交管理员审核")
          })

        this.disappearII()
      },

      changetype(type){
        this.type = type
      },


      changetypeII(type){
        this.nntype= type
      },


      //设置

      addNewType(){
        if(this.newtype===''){
          this.$Message.error('类型不能为空')
          return
        }
        for(var i=0;i<this.preTypes.length;i++){
          if(this.newtype===this.preTypes[i].type){
            this.$Message.error('不能重名')
            this.newtype=''
            return
          }
        }
        if(this.price ===0){
          this.$Message.error('价格不合适')
          return
        }

        var object ={
          type:this.newtype,
          price:this.price
        }


        this.preTypes.push(object)

        this.newtype=''
        this.price=0
      },

      appear(){
        this.showModel=true
      },
      disappear(){
        this.showModel=false
      },


      appearII(){
        this.showModel2=true
      },
      disappearII(){
        this.showModel2=false
      },


      remove(index){
        this.preTypes.splice(index,1)
      },





      clear(){

        this.ddl=''
        this.shopname=''
        this.price=0
        this.size=0
        this.preTypes=[]


      },
      dateFormat(val) {
        let year = val.getFullYear().toString();
        let month = val.getMonth() > 9
          ? (val.getMonth() + 1).toString()
          : "0" + (val.getMonth() + 1);
        let date = val.getDate() > 9
          ? val.getDate().toString()
          : "0" + val.getDate();
        return year + "-" + month + "-" + date;
      },

      submit(){
        var self=this
        var array=[]
        var array2=[]
        for(var i=0;i<self.preTypes.length;i++){
          array.push(self.preTypes[i].type)
          array2.push(self.preTypes[i].price)
        }





        var params = new URLSearchParams();
        params.append("shopID",window.localStorage.getItem("userID"))
        params.append("name",self.shopname)
        params.append("dish",JSON.stringify(array))
        params.append("price",JSON.stringify(array2))
        params.append("address",self.address)
        params.append("type",self.type)



        this.$http.post('api/ShopController/registerShop',params)
          .then(function (response) {
              self.$Message.success({
                content: "发布成功"
              })
              self.clear()

          }).catch(function (error) {
          console.log("发起者发起任务错误："+error)
        })

      }


    }

  }

</script>

<style scoped>

  .upload_warp_img_div_del {

    position: absolute;

    top: 6px;

    width: 16px;

    right: 4px;

  }



  .upload_warp_img_div_top {

    position: absolute;

    top: 0;

    width: 100%;

    height: 30px;

    background-color: rgba(0, 0, 0, 0.4);

    line-height: 30px;

    text-align: left;

    color: #fff;

    font-size: 12px;

    text-indent: 4px;

  }



  .upload_warp_img_div_text {

    white-space: nowrap;

    width: 80%;

    overflow: hidden;

    text-overflow: ellipsis;

  }



  .upload_warp_img_div img {

    max-width: 100%;

    max-height: 100%;

    vertical-align: middle;

  }



  .upload_warp_img_div {

    position: relative;

    height: 100px;

    width: 120px;

    border: 1px solid #ccc;

    margin: 0px 30px 10px 0px;

    float: left;

    line-height: 100px;

    display: table-cell;

    text-align: center;

    background-color: #eee;

    cursor: pointer;

  }



  .upload_warp_img {

    border-top: 1px solid #D2D2D2;

    padding: 14px 0 0 14px;

    overflow: hidden

  }



  .upload_warp_text {

    text-align: left;

    margin-bottom: 10px;

    padding-top: 10px;

    text-indent: 14px;

    border-top: 1px solid #ccc;

    font-size: 14px;

  }



  .upload_warp_right {

    float: left;

    width: 57%;

    margin-left: 2%;

    height: 100%;

    border: 1px dashed #999;

    border-radius: 4px;

    line-height: 130px;

    color: #999;

  }



  .upload_warp_left img {

    margin-top: 32px;

  }



  .upload_warp_left {

    float: left;

    width: 40%;

    height: 100%;

    border: 1px dashed #999;

    border-radius: 4px;

    cursor: pointer;

  }



  .upload_warp {

    margin: 14px;

    height: 130px;

  }



  .upload {

    border: 1px solid #ccc;

    background-color: #fff;

    width: 650px;

    box-shadow: 0px 1px 0px #ccc;

    border-radius: 4px;

  }



  .hello {

    width: 650px;

    margin-left: 30%;

  }

</style>

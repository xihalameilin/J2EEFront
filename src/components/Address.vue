<template>
    <div style="background-color: #f5f5f5" :style="{height: mapHeight}">
      <person-bar></person-bar>

      <div style="position: absolute;width:80%;height:80%;left:15%;top:15%;background-color: white">
        <strong style="position:absolute;left:5%;top:0%;font-size: 20px">地址管理</strong>
        <div style="position:absolute;left:5%;width:90%;top:7%;height:2px;background-color: #aeaeae"></div>
        <div id="showAddressDiv" class="overflow" style="position:absolute;left:4%;top:10%;width:90%;height:85%;">
          <div v-for="item in addressList" style="float:left;width:32%;height:23.5%;margin-left: 1%;margin-top: 1%">
            <div style="position:absolute;margin-left:0%;margin-top:0%;width:32%;height:23.5%;border: 1px solid #cdcdcd">
              <p class="font3" style="position:absolute;left:5%;top:0%;width:90%">{{item.address}}</p>
              <Button @click="deleteAddress(item.id)"  style="position:absolute;left:5%;top:60%;width:20%;height:30%">删除</Button>
              <Button type="success" @click="setDefaultAddress(item.id,item.state)" :disabled="(item.state>0)?true:false"   style="position:absolute;right:5%;top:60%;width:40%;height:30%">设为默认地址</Button>
            </div>
          </div>
          <div style="float:left;width:32%;height:23.5%">
            <div @click="showAddAddress" class="but-div" style="position:relative;margin-left:3%;margin-top:3%;width:100%;height:100%;border: 1px solid #cdcdcd">
              <p class="font3" style="position:absolute;left:5%;top:30%;width:90%"><Icon type="ios-add-circle-outline" size="20"/>添加新地址</p>
            </div>
          </div>
        </div>
      </div>

      <!--取消弹窗-->
      <Modal title="添加新地址" v-model="addShow" class-name="vertical-center-modal" footer-hide>
        <p style="font-size: 16px;">&#12288&#12288位置：<Cascader :data="addressdata" v-model="newaddress" style="position:absolute;width:66%;left:19%;top:30%;font-size: 16px"/></p>
        <p style="font-size: 16px;margin-top: 20px">详细地址：<Input v-model="tip2" placeholder="" size="large" clearable style="width: 70%;left:1%" /></p>
        <Button  @click="addAddress" style="margin-top: 1%;margin-left: 40%">取消</Button>
        <Button type="primary" @click="addAddress" style="margin-top: 1%;margin-left: 2%">确认</Button>
      </Modal>

    </div>
</template>

<script>
  import personBar from '@/components/PersonBar'
    export default {
      components:{
        personBar
      },
      computed: {
        //计算浏览器的高度
        mapHeight() {
          return document.documentElement.scrollHeight +'px'
        }
      },
      created(){
        this.getAllAddress()
      },
      data() {
        return{
          flag:false,
          addressdata:[{
            value: '北京',
            label: '北京',
            children: [
              {
                value: '故宫',
                label: '故宫'
              },
              {
                value: '天坛',
                label: '天坛'
              },
              {
                value: '王府井',
                label: '王府井'
              }
            ]
          },
            {
              value: '江苏',
              label: '江苏',
              children: [
                {
                  value: '南京',
                  label: '南京',
                  children: [
                    {
                      value: '夫子庙',
                      label: '夫子庙',
                    }
                  ]
                },
                {
                  value: '南通',
                  label: '南通',
                  children: [
                    {
                      value: '海安',
                      label: '海安',
                    },
                    {
                      value: '如皋',
                      label: '如皋',
                    }
                  ]
                }
              ],
            }],
          newaddress:[],
          deleteShow:false,
          addShow:false,
          addressList:[],
          locationList:[
            {locate:"南京市鼓楼区"},
            {locate:"南京市玄武区"},
            {locate:"南京市栖霞区"},
          ],
          tip2:"单元、门牌号",
        }
      },
      methods:{
        getAllAddress:function(){
          var userID = this.$getCookie("userID");
          var self = this;
          this.$http.get('api/UserController/getAllAddresses/'+userID).then(function (response) {
            self.addressList = response.data
          })
        },
        deleteAddress:function(aid){

          this.$http.post("api/UserController/deleteAddress/"+aid);
          this.$Message.success("地址已删除")
          this.getAllAddress()
        },
        setDefaultAddress:function(aid,state){
          var userID = this.$getCookie("userID");
          var self = this;
          this.$http.post('api/UserController/setDefaultAddress/'+userID+"/"+aid).then(function () {
            self.$Message.success("已设置为默认地址")
            self.getAllAddress()
          })
        },
        showAddAddress:function(){
          this.addShow = true;
        },
        addAddress:function(){
          var userID = this.$getCookie("userID");
          var address = this.newaddress.toString().replace(/,/g,'')+this.tip2;
          var self = this
          this.$http.post('api/UserController/addAddress/'+userID+"/"+address).then(function () {
            self.$Message.success("已添加")
            self.addShow=false
            self.getAllAddress()
          })
        }
      }
    }
</script>

<style scoped>
  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }
</style>

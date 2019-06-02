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
              <button @click="deleteAddress" class="button3" style="position:absolute;left:5%;top:60%;width:20%;height:30%">删除</button>
              <button @click="setDefaultAddress" class="button1" style="position:absolute;right:5%;top:60%;width:40%;height:30%">设为默认地址</button>
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
      <Modal title="添加新地址" v-model="addShow" class-name="vertical-center-modal">
        <p style="font-size: 16px;">&#12288&#12288位置：
            <Select placeholder="请输入小区、大厦或学校" size="large" filterable style="width: 70%">
              <Option v-for="item in locationList" :value="item.value" :key="item.value" style="color:black">{{ item.locate }}</Option>
            </Select>
        </p>
        <p style="font-size: 16px;margin-top: 20px">详细地址：<Input v-model="tip2" placeholder="" size="large" clearable style="width: 70%;left:1%" /></p>
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
      data() {
        return{
          deleteShow:false,
          addShow:false,
          addressList:[
            {address: "南京市鼓楼区"},
            {address: "南京市鼓楼区"},
            {address: "南京市鼓楼区"},
            {address: "南京市鼓楼区"},
            {address: "南京市鼓楼区"},
          ],
          locationList:[
            {locate:"南京市鼓楼区"},
            {locate:"南京市玄武区"},
            {locate:"南京市栖霞区"},
          ],
          tip1:"请输入小区、大厦或学校",
          tip2:"单元、门牌号",
        }
      },
      methods:{
        deleteAddress:function(aid){
          this.$Message.success("地址已删除")
        },
        setDefaultAddress:function(aid){
          this.$Message.success("已设置为默认地址")
        },
        showAddAddress:function(){
          this.addShow = true;
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

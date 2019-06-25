<template>
  <div>
    <Input placeholder="输入商家的名字" style="width: auto" class="right" v-model="key"   />
    <Button shape="circle" icon="ios-search" @click="changeKey"></Button>
    <br>

    <!-- 商家分类的div -->
    <div class="border">
      <br>
      <div style="width: 10%;height:100%;float: left;font-family:PingFang SC;font-size: 15px">
         商家分类:
      </div>

      <div style="width: 80%;height: 100%;float:left;">
        <br>
        <Button type="primary" ghost style="margin-left: 1%" v-for="item in typeList" @click="changeType(item)">{{item }}</Button>&nbsp
      </div>
    </div>

    <!-- 具体商家的div -->
    <div class="border2">
      <div id="1" class="every" @mouseenter="show"  @mouseleave="disappear">
        <div class="leftpart">
          <img src=".././images/login_bg.jpg" class="img" />
          25分钟
        </div>

        <div class="rightpart">
          <strong style="font-size:15px">商店名</strong>
          <Rate allow-half   style="size: 20px" />
          <label>配送费￥5</label>
        </div>

      </div>
    </div>

    <Modal v-model="flag" draggable scrollable width="350" footer-hide="true">
      <strong style="font-size:15px">商店名</strong>
      <Rate allow-half   style="size: 20px" />
      <label>配送费￥5</label>
      <p>亲爱的顾客请在17点之前下单以便我们制作与配送,谢谢你的配合</p>
    </Modal>




  </div>
</template>

<script>
    export default {
        data(){
          return{
            typeList:["全部商家","美食","快餐便当","特色菜系","异国料理","小吃夜宵","甜品饮品","果蔬生鲜","商店超市","鲜花绿植"],
            flag:false,
            key:''
          }
        },
      methods:{

          changeType(item){
            alert(item)
          },
          changeKey(){
            alert(this.key)
          },

          show(){
            // alert(document.getElementById("1").getBoundingClientRect().left +" " +document.getElementById("1").getBoundingClientRect().right)
            // this.flag = true
          },

          disappear(){
            // this.flag = false
          }
      }
    }
</script>

<style scoped>
  .border{
    border: solid black 0.3px;
    width: 80% ;
    height: 100px;
    margin: 0 auto;
    background-color: ghostwhite;
    margin-top: 20px;
  }

  .border2{
    border: solid black 0.3px;
    width: 80% ;
    height:500px;
    margin: 0 auto;
    background-color: ghostwhite;
    margin-top: 20px;
  }

  .every{
    margin-left: 1%;
    margin-top: 2px;
    width: 24%;
    height: 100px;
    border: red 2px solid;
    background-color: whitesmoke;
   }
  .leftpart{
    float: left;
    margin-left: 10%;
    width: 30%;
    height: 100px;
    text-align: center;
  }
  .rightpart{
    float: left;
    margin-left: 10%;
    width: 50%;
    height: 95px;
    text-align: center;
  }

  .img{
    margin-left: 5px;
    margin-top: 10px;
    width: 70px;
    height: 70px;


  }

  .right{
    margin-left: 80%;
  }

</style>

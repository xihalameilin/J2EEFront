<template>
  <div style="float: left;width: 100%">
    <div :style="note">
      <!--<img src="../images/shopHeader.jpg" style="width: 100%;height: 10em"/>-->
    </div>
    <div style="width: 100%;padding-top: 0.5em;">
      <center>
        <Button type="text" size="large">默认排序
          <Icon type="md-arrow-down"/>
        </Button>
        <Button type="text" size="large">评分
          <Icon type="md-arrow-down"/>
        </Button>
        <Button type="text" size="large">销量
          <Icon type="md-arrow-down"/>
        </Button>
        <Button type="text" size="large">价格
          <Icon type="md-arrow-down"/>
        </Button>
        <Input icon="ios-search" placeholder="搜索美食..." style="width: 30%;padding-left: 10%"/>
      </center>
    </div>
    <div style="background-color: #F7F7F7;width: 100%;min-height: 41em">

      <div style="float: left;width: 60%;border: red 2px solid ;position: relative;left: 5%">

        <div style="height: 100px;width: 45%;background-color: white;float: left;margin-top: 2em">
          <img src="../images/elm.png" width="100px" height="100px" style="float: left"/>
          <div style="float: left;padding-left: 1em">
            <p style="font-family: 黑体;font-size: 16px;font-weight: bold">米饭</p>
            <p style="font-family: 黑体;font-size: 14px;font-weight: normal;color: #657180">月售800+份</p>
            <Rate disabled allow-half v-model="valueHalf"/>
            <p style="font-size: 16px;font-weight: bold;color: red">¥9</p>
          </div>
          <div style="float: right;padding-top: 5em">
            <Button type="primary" shape="circle">加入购物车</Button>
          </div>
        </div>

        <div style="height: 100px;width: 45%;background-color: white;float: right;margin-top: 2em">
          <img src="../images/elm.png" width="100px" height="100px" style="float: left"/>
          <div style="float: left;padding-left: 1em">
            <p style="font-family: 黑体;font-size: 16px;font-weight: bold">米饭</p>
            <p style="font-family: 黑体;font-size: 14px;font-weight: normal;color: #657180">月售800+份</p>
            <Rate disabled allow-half v-model="valueHalf"/>
            <p style="font-size: 16px;font-weight: bold;color: red">¥9</p>
          </div>
          <div style="float: right;padding-top: 5em">
            <Button type="primary" shape="circle">加入购物车</Button>
          </div>
        </div>

        <div style="height: 100px;width: 45%;background-color: white;float: left;margin-top: 2em">
          <img src="../images/elm.png" width="100px" height="100px" style="float: left"/>
          <div style="float: left;padding-left: 1em">
            <p style="font-family: 黑体;font-size: 16px;font-weight: bold">米饭</p>
            <p style="font-family: 黑体;font-size: 14px;font-weight: normal;color: #657180">月售800+份</p>
            <Rate disabled allow-half v-model="valueHalf"/>
            <p style="font-size: 16px;font-weight: bold;color: red">¥9</p>
          </div>
          <div style="float: right;padding-top: 5em">
            <Button type="primary" shape="circle">加入购物车</Button>
          </div>
        </div>

      </div>

      <div style="float: right;position: relative;right: 5%;margin-top: 2em">
        <Card style="width:25em">
          <p slot="title">
            商家公告
          </p>
          <p>公告内容</p>
        </Card>

        <!--<el-collapse v-model="activeNames" @change="handleChange">-->
        <!--<el-collapse-item title="一致性 Consistency" name="1">-->
        <!--<div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>-->
        <!--<div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>-->
        <!--</el-collapse-item>-->
        <!--</el-collapse>-->

      </div>


      <!--<div style="position: relative;float: right;margin-top: 5em;right: 5%;">-->
      <!--<el-collapse v-model="activeNames" @change="handleChange" style="width: 29em;height: 100px">-->
      <!--<el-collapse-item title="购物车" name="1">-->
      <!--<div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>-->
      <!--</el-collapse-item>-->
      <!--</el-collapse>-->
      <!--</div>-->

      <el-card class="box-card"
               style="position: relative;float: right;margin-top: 5em;right: 5%;width: 29em;min-height: 100px">
        <div slot="header" class="clearfix">
          <span>购物车</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="viewShopCar">展开/收起<<</el-button>
        </div>
        <div v-for="o in shopList" :key="o" class="text item" v-show="showShop">
          <div style="width: 100%;min-height: 50px">
            <p style="float: left">{{o.name}}</p>
            <p style="float: right">{{o.price}}</p>
            <el-input-number v-model="goodsNum" @change="handleChange" :min="0" :max="100" label="" :precision="0"
                             style="float: right;right:2.5em" size="mini"></el-input-number>

          </div>

        </div>
      </el-card>
      <!--商品卡-->
      <!--<div style="height: 100px;width: 400px;background-color: white">-->
      <!--<img src="../images/elm.png" width="100px" height="100px" style="float: left"/>-->
      <!--<div style="float: left;padding-left: 1em">-->
      <!--<p style="font-family: 黑体;font-size: 16px;font-weight: bold">米饭</p>-->
      <!--<br>-->
      <!--<p style="font-family: 黑体;font-size: 14px;font-weight: normal;color: #657180">月售800+份</p>-->
      <!--<br>-->
      <!--<p style="font-size: 16px;font-weight: bold;color: red">¥9</p>-->
      <!--</div>-->
      <!--<div style="float: right;padding-top: 5em">-->
      <!--<Button type="primary" shape="circle">加入购物车</Button>-->
      <!--</div>-->
      <!--</div>-->


    </div>
  </div>
</template>

<script>
  export default {
    name: "ShopDetail",

    data() {
      return {
        note: {
          backgroundImage: "url(" + require("../images/shopHeader.jpg") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 50px",
          // marginTop: "5px",
        },
        valueHalf: 4.5,
        activeNames: ['1'],
        showShop: false,
        goodsNum: 1,
        shopList: [{
          'name': '香锅一号',
          'price': 19.9,
          'num': 2
        },
          {
            'name': '香锅二号',
            'price': 19.9,
            'num': 3
          },
          {
            'name': '香锅三号',
            'price': 21.9,
            'num': 2
          },
        ]
      }
    },

    methods: {
      handleChange(val) {
        // console.log(val);
      },

      viewShopCar() {
        this.showShop = !this.showShop;
      }
    }
  }
</script>


<style scoped>
  .backgroudDiv {
    background-image: url("../images/shopHeader.jpg");
    height: 50px;
    width: 100%;
    background-size: cover;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>

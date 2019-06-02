<template>
  <div style="background-color: #f5f5f5" :style="{height: mapHeight}">
    <bar></bar>
    <div id="mainPageDiv">
      <img src="../images/logo4.png" style="position:absolute;left:10%;top:13%"/>
      <input id="i-store" class="input" placeholder="搜索商家、美食..." style="position:absolute;right:5%;top:15%;width:35%;height:9%;border: 2px solid rgba(197, 196, 198, 0.53)"/>
      <button onclick="queryStoreByName()" class="button1" title="搜索商家、美食..." style="position:absolute;right:5%;top:15%;width:5%;height:8.7%;">搜索</button>
      <!搜索标签-->
      <div style="position:absolute;left:5%;top:28%;width:90%;height:20%;background-color: white;border: 1px solid gray">
        <p style="position:absolute;left:2%;top:15%;color: #8f8f8f;font-size: 18px">商家分类：</p>
        <button onclick="getAllStore()" class="button4" style="position:absolute;left:10%;top:12%;width:10%;height:36%">全部商家</button>
        <button onclick="queryStoreByType('快餐便当')" class="button4" style="position:absolute;left:21%;top:12%;width:10%;height:36%">快餐便当</button>
        <button onclick="queryStoreByType('特色菜系')" class="button4" style="position:absolute;left:32%;top:12%;width:10%;height:36%">特色菜系</button>
        <button onclick="queryStoreByType('异国料理')" class="button4" style="position:absolute;left:43%;top:12%;width:10%;height:36%">异国料理</button>
        <button onclick="queryStoreByType('小吃夜宵')" class="button4" style="position:absolute;left:54%;top:12%;width:10%;height:36%">小吃夜宵</button>
        <button onclick="queryStoreByType('甜品饮品')" class="button4" style="position:absolute;left:65%;top:12%;width:10%;height:36%">甜品饮品</button>
        <button onclick="queryStoreByType('果蔬生鲜')" class="button4" style="position:absolute;left:76%;top:12%;width:10%;height:36%">果蔬生鲜</button>
        <button onclick="queryStoreByType('商店超市')" class="button4" style="position:absolute;left:87%;top:12%;width:10%;height:36%">商店超市</button>
        <button onclick="queryStoreByType('鲜花绿植')" class="button4" style="position:absolute;left:10%;top:52%;width:10%;height:36%">鲜花绿植</button>
        <button onclick="queryStoreByType('医药健康')" class="button4" style="position:absolute;left:21%;top:52%;width:10%;height:36%">医药健康</button>
      </div>
      <!店铺信息展示-->
      <div id="showStoreDiv" style="position:absolute;left:5%;top:52%;width:90%;height:80%;background-color: white;border: 1px solid gray">
        <div v-for="item in storeList" style="float:left;width:25%;height:30%;">
          <div @mouseenter="showStoreDialog($event)" @mouseleave="unshowStoreDialog" class="storeDiv" title="麻辣香锅南京店" style="position:absolute;margin-left:0;margin-top:0;width:25%;height:30%">
            <img src="../images/storeLogo1.png" style="position:absolute;left:8%;top:15%;width:30%;height:55%"/>
            <strong class="font3" style="position:absolute;left:45%;top:15%;width:45%">{{item.storeName}}</strong>
            <span class="starIcon" style="position:absolute;left:45%;top:38%">★★★★★</span>
            <p class="font1" style="position:absolute;left:45%;top:58%;font-size: 15px">配送费￥2</p>
            <p class="font1" style="position:absolute;left:15%;top:75%;font-size: 15px">30分钟</p>
          </div>
        </div>
      </div>
      <!店铺弹窗信息展示-->
      <div id="storeDialog" style="position:absolute;left:30%;top:30%;width:25%;height:40%;border: solid 2px #e1e1e1;background-color: white;display: none">
        <strong class="font3" style="position:absolute;left:10%;top:5%;width:80%;">麻辣香锅(南京店)</strong>
        <p class="font1" style="position:absolute;left:10%;top:17%;font-size: 15px">快餐便当</p>
        <div style="position:absolute;left:10%;top:29%;width:80%;height:2px;background-color: #e1e1e1"></div>
        <div style="position:absolute;left:10%;top:35%;width:80%;height:15%;background-color: #ebebeb">
          <p class="font1" style="position:absolute;left:5%;top:15%;font-size: 14px">配送费￥5.8</p>
          <p class="font1" style="position:absolute;left:42%;top:15%;font-size: 14px">|</p>
          <p class="font1" style="position:absolute;left:50%;top:15%;font-size: 14px">平均<span style="color:red">30</span>分钟送达</p>
        </div>
        <p class="font1" style="position:absolute;left:10%;top:60%;width:80%;font-size: 14px;white-space:normal;">{{storeDescription}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import bar from '@/components/NavBar'
    export default {
      components:{
        bar
      },
      computed: {
        //计算浏览器的高度
        mapHeight() {
          return document.documentElement.scrollHeight +'px'
        }
      },
      data(){
        return{
          storeDescription:"欢迎您选择麻辣香锅(南京店)，顾客的满意就是我们最大的追求。本店支持电子发票，请扫描开具。",
          storeList:[
            {storeName:"麻辣香锅(南京店)"},
            {storeName:"麻辣香锅1(南京店)"},
            {storeName:"麻辣香锅2(南京店)"},
            {storeName:"麻辣香锅3(南京店)"},
            {storeName:"麻辣香锅4(南京店)"},
            {storeName:"麻辣香锅5(南京店)"},
            {storeName:"麻辣香锅6(南京店)"},
          ]
        }
      },
      methods:{
        getAllStore:function(){

        },
        queryStoreByType:function(){

        },
        queryStoreByName:function(){

        },
        showStoreDialog:function(event){
          var e = event.currentTarget;
          var e_div = document.getElementById("showStoreDiv");
          var left = e.offsetLeft+e_div.offsetLeft+e.offsetWidth;
          var dialog_width = document.documentElement.clientWidth * 0.25;
          var top = e.offsetTop+e_div.offsetTop;
          if(left+dialog_width > document.documentElement.clientWidth){
            left = e.offsetLeft+e_div.offsetLeft-dialog_width;
          }
          document.getElementById("storeDialog").style.left = left+"px";
          document.getElementById("storeDialog").style.top = top+"px";
          document.getElementById("storeDialog").style.display = "block";
        },
        unshowStoreDialog:function(){
          document.getElementById("storeDialog").style.display = "none";
        }
      }
    }
</script>

<style scoped>

</style>

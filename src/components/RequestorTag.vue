<template>
  <div >
    <myheader></myheader>
    <Menu mode="vertical" theme="dark" >
      <Icon type="person"  size="50" style="float: left"></Icon>
      <MenuItem name="1" >
        <Icon type="md-add"></Icon>
        <router-link to="/shopcreate">发起新的餐厅</router-link>
      </MenuItem>
      <MenuItem name="2">
        <Icon type="md-albums"></Icon>
        <router-link to="/requestorrecord">送餐记录</router-link>
      </MenuItem>

      <!--<MenuItem name="3">-->
        <!--<Icon type="stats-bars"></Icon>-->
        <!--<router-link to="/requesteranalysis">统计分析</router-link>-->
      <!--</MenuItem>-->

    </Menu>
    <br>
    <router-view style="float:right;margin-top: -100px"></router-view>
  </div>
</template>
<script>
  import myheader from '@/components/Header'
  export default {
    data () {
      return {
        theme3: 'light'
      }
    },

    components:{
      myheader
    }
  }
</script>

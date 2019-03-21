<template>
  <div>
    <myheader></myheader>
    <div style="float:left;border: red 2px;width: 500px">
      <Menu mode="vertical" theme="dark"  width="300px">

        <MenuItem name="1" >
          <Icon type="md-add"></Icon>
          <router-link to="/check">审批店铺</router-link>
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-copy"></Icon>
          <router-link to="/checkII">审批信息修改</router-link>
        </MenuItem>

        <MenuItem name="3">
          <Icon type="ios-flower"></Icon>
          <router-link to="/checkIII">支付到餐厅</router-link>
        </MenuItem>

        <MenuItem name="4">
          <Icon type="ios-albums"></Icon>
          <router-link to="/analysis">统计</router-link>
        </MenuItem>

      </Menu>
    </div>


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

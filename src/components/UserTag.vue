<template>
  <div>
    <myheader></myheader>
    <div style="float:left;border: red 2px;width: 500px">
      <Menu mode="vertical" theme="dark"  width="300px">

        <MenuItem name="1" >
          <Icon type="md-add"></Icon>
          <router-link to="/order">订餐</router-link>
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-copy"></Icon>
          <router-link to="/userrecord">我的记录</router-link>
        </MenuItem>

        <MenuItem name="3">
          <Icon type="ios-flower"></Icon>
          <router-link to="/personal">个人信息</router-link>
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

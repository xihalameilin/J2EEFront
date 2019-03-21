<template>
    <div style="width: 80%;float:left">

      <label style="width: 250px;margin-left: 200px">会员数:
      <i-input  type="text"   v-model="usercount" disabled>
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </i-input>
      </label>
      <br>
      <label style="width: 250px;margin-left: 200px">餐厅数:
      <i-input type="email" v-model="shopcount" disabled>
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </i-input>
      </label>
      <br>
      <label style="width: 250px;margin-left: 200px">营业额:
      <i-input type="telephone" v-model="total"  disabled>
        <Icon type="ios-call" slot="prepend"></Icon>
      </i-input>
      </label>
    </div>
</template>

<script>
    export default {

      created(){
        this.getdata()
      },
      data(){
        return{
          usercount:0,
          shopcount:0,
          total:0,
        }
      },

      methods:{
        getdata(){
          var self =this
          this.$http.get('api/QueryController/getdata')
            .then(function (response) {
              self.usercount = response.data.split(" ")[0]
              self.shopcount = response.data.split(" ")[1]
              self.total = response.data.split(" ")[2]

            })
        }
      }
    }
</script>

<style scoped>

</style>

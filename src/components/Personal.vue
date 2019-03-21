<template>
    <div style="width: 80%;float:left">
      <i-input  type="text"  style="width: 250px;margin-left: 200px" v-model="this.user.id" disabled>
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </i-input>
      <br>

      <i-input type="email" v-model="this.user.email" style="width: 250px;margin-left: 200px" disabled>
        <Icon type="ios-mail" slot="prepend"></Icon>
      </i-input>
      <br>

      <i-input type="telephone" v-model="this.user.telephone" style="width: 250px;margin-left: 200px" disabled>
        <Icon type="ios-call" slot="prepend"></Icon>
      </i-input>

      <Button type="primary" @click="appear"  style="width: 50px;margin-left: 300px">更新</Button>


      <Modal v-model="showModel" :closable='false' :mask-closable=false :width="500">

        <i-input type="email" v-model="newemail" style="width: 250px;margin-left: 100px">
          <Icon type="ios-mail" slot="prepend"></Icon>
        </i-input>
        <br>

        <i-input type="telephone" v-model="newtelephone" style="width: 250px;margin-left: 100px">
          <Icon type="ios-call" slot="prepend"></Icon>
        </i-input>

        <div slot="footer">
          <Button type="primary"  @click="disappear">更新</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
    export default {

      created(){
        this.getUserInfo()
      },

      data(){
        return{
          user:{},
          showModel:false,
          newemail:'',
          newtelephone:''
        }
      },

      methods:{
        appear(){
          this.showModel = true
        },
        disappear(){
          this.update()
          this.showModel = false
        },

        getUserInfo(){
          var userID = window.localStorage.getItem("userID")
          var self = this
          this.$http.get('api/QueryController/getUser/'+userID)
            .then(function (response) {
              self.user = response.data
            })
        },


        update(){
          var userID = window.localStorage.getItem("userID")
          this.user.email = this.newemail
          this.user.telephone = this.newtelephone
          this.$http.post('api/LoginController/update/'+userID+'/'+this.newemail+'/'+this.newtelephone)

        }
      }
    }
</script>

<style scoped>

</style>

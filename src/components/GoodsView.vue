<template>

  <div>
    <div v-for="item in goodslist">
      {{item.name}}+{{item.price}}
    </div>
    <Page :total="100" @on-change="changepage" />

  </div>
</template>

<script>
    export default {
      created(){

      },
      methods:{
        changepage(index){
          alert(index)
        }
      },
      data(){
        return{
          goodslist:[
            {name:1,price:5},
            {name:2,price:5354},
            {name:3,price:554},
            {name:4,price:4},
            {name:5,price:75},
            {name:6,price:15},
            ]
        }
      }
    }
</script>

<style scoped>

</style>

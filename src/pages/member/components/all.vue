<template>
        <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block">
      <a class="block-item js-address-item address-item " @click="toEdit(list)"
      v-for="list in lists" :class="{'address-item-default':list.isDefault}">
        <div class="address-title">{{list.name}}{{list.tel}}</div>
        <p class="address-more">{{list.proviceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
      </a>
    </div>
    <div class="block stick-bottom-row center">
      <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" :to="{name:'form',query:{type:'add'}}">
            新增地址
        </router-link>
    </div>
  </div>
</template>

<script>
import address from 'js/addressService.js'
  export default{
    data(){
       return {
        lists: null
       }
    },
    created(){
       address.list().then(res=>{
        this.lists = res.data.lists
       })
    },
    methods:{
      toEdit(list){
        this.$router.push({name:'form',query:{
          type:'edit',
          instance:list
        }})
      }
    }
  }
</script>

<style scoped>
   @import "./address.css";
  @import "./address_base.css";
</style>

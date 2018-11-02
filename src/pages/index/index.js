// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './index.css'
import 'css/common.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import FootNav from 'components/FootNav.vue'
import Swiper from 'components/swiper.vue'

import { InfiniteScroll } from 'mint-ui';

Vue.use(InfiniteScroll);

/* eslint-disable no-new */
new Vue({
  el: '#app',
   data:{
   	lists:null,
   	 pageNum:1,
     pageSize:6,
     loading:false,
     loaded:false,
     bannerLists:null
   },
   created(){
    this.getLists()
    this.getBanner()
   },
   methods:{
     getLists(){
      if(this.loaded) return //数据是否加载完毕
      this.loading = true
      axios.post(url.hotLists,{
      pageNum:this.pageNum,
      pageSize:this.pageSize
      }).then(res=>{
        let curLists = res.data.lists
        if(curLists.length > this.pageSize){
          this.loaded = true
        }
        if(this.lists){
        this.lists = this.lists.concat(curLists)
        }else{
          //初始化
          this.lists = curLists
        }
         //console.log(this.lists)
         this.pageNum++
          this.loading = false
      })
    },
    getBanner(){
      axios.post(url.banner).then(res=>{
        console.log(res.data)
        this.bannerLists = res.data.lists
      })
    }
   },
  components:{
  	FootNav,
    Swiper
  }
})

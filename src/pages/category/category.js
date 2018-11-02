import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import Foot from 'components/FootNav.vue'

import mixin from 'js/mixin.js'

new Vue({
  el: '#app',
  data: {
    topLists: null,
    topIndex: 0,
    subData: null,
    rankData: null
  },
  created() {
    this.getTopList()
    this.getSublists(0)
  },
  methods: {
     getTopList(){
      axios.get(url.topLists).then(res=>{
        this.topLists = res.data.lists;
        //console.log(this.topLists)
      }).catch(res=>{
        console.log('nothing!')
      })
     },
     getSublists(index,id){
       this.topIndex = index;
       if(index===0){
         this.getRank()
       }else{
             axios.get(url.subLists,{id}).then(res=>{
        this.subData = res.data.data;
        console.log(this.subData)
      })
       }
      },
     getRank(){
         axios.get(url.rank).then(res=>{
        this.rankData = res.data.data;
     })
    },
     toSearch(item) {
      location.href = `search.html?keyword=${item.name}&id=${item.id}`
    }
     },
  components: {
    Foot
  },
    mixins: [mixin]
})
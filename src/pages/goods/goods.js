import "./goods_common.css"
import "./goods_custom.css"
import "./goods.css"
import "./goods_theme.css"
import "./goods_mars.css"
import "./goods_sku.css"
import "./goods_transition.css"



import Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'
import mixin from 'js/mixin.js'
import qs from 'qs'
import Swipe from 'components/swiper.vue'

let {id} = qs.parse(location.search.substr(1))
 

new Vue({
  el:"#goods",
  data:{
   details:null,
   detailsTab:['商品详情','本店成交'],
   tabIndex:0,
   dealList:null,
   bannerLists:null,
   skuType:1,
   showSku:false,
   goodsNum:1,
   Addcarted:false,
   id,
   showMessage:false
  },
  created(){
   this.getDetails()
  },
  methods:{
      getDetails(){
        axios.post(url.details,{id}).then(res =>{
          this.details = res.data.data
          //console.log(res.data.data)
          this.bannerLists = [],
          this.details.imgs.forEach(item=>{
            this.bannerLists.push({
              clickUrl:'',
              img:item
            })
          })
        })
      },
      changeTab(index){
        this.tabIndex = index
        if(index){
          this.getDeal()
        }
      },
      getDeal(){
          axios.post(url.deal,{id}).then(res =>{
          //console.log(res.data.data)
          this.dealList = res.data.data.lists
        })
      },
      chooseSku(type){
        this.skuType = type
        this.showSku = true
      },
      changeNum(num){
        if(num<0 && this.goodsNum ===1) return

        this.goodsNum+=num
      },
      addCart(){
        axios.post(url.addCart,{id,
          num:this.goodsNum
        }).then(res=>{
          if(res.data.status==200){
           this.showSku = false
           this.Addcarted = true
           this.showMessage = true

           setTimeout(()=>{
            this.showMessage = false
          },1000)
          }
        })
      }

  },
  components:{
    Swipe
  },
  watch:{
    showSku(val,oldVal){
      document.body.style.overflow = val ? "hidden": "auto";
      document.querySelector('html').style.overflow = val ? "hidden": "auto";
       document.body.style.height = val ? "100%": "auto";
      document.querySelector('html').style.height = val ? "100%": "auto";
    }
  },
  mixins: [mixin]
})
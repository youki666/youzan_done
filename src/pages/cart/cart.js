import "./cart_base.css"
import "./cart_trade.css"
import "./cart.css"


import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import qs from 'qs'
import Volecity from 'velocity-animate'
//import Swipe from 'components/Swipe.vue'


new Vue({
	el:'.container',
	data: {
      lists:null,
      total:0,
      editingShop:null,
      editingShopIndex:-1,
      removePopup:false,
      removeData:null,
      removeMsg:''
	},
	computed: {
     allSelected:{
         get(){
         	if(this.lists &&this.lists.length){
               return this.lists.every(shop=>{
               	//shop.goodsList.forEach()
               	return shop.checked
               })
         	}
         	return false
         },
         set(newVal){
       this.lists.forEach(shop=>{
       	shop.checked = newVal
       	shop.goodsList.forEach(good=>{
       		good.checked = newVal
       	})
       })
         }
     },
     allRemoveSelected:{
     	get(){
           if(this.editingShop){
           	return this.editingShop.removeChecked
           }
           return false
     	},
     	set(newVal){
            if(this.editingShop){
            	this.editingShop.removeChecked = newVal
            	this.editingShop.goodsList.forEach(good=>{
            		good.removeChecked = newVal
            	})
            }
     	}
     },
     selectedList(){
          if(this.lists &&this.lists.length){
          	let arr = []
          	let total = 0
            this.lists.forEach(shop=>{
              shop.goodsList.forEach(good=>{
       		   if(good.checked){
       		   	arr.push(good)
       		   	total += good.price * good.number
       		   }
       	      })
            })
            this.total =total
            return arr
          }
          return []
     },
     removeList(){
          if(this.editingShop){
          	let arr = []
          	this.editingShop.goodsList.forEach(good=>{
          		if(good.removeChecked){
          			arr.push(good)
          		}
          	})
          	return arr
          }
          return []
     }
	},
	created(){
      this.getList()
	},
	methods: {
    checkOut(){
         alert('您需要支付￥'+this.total+'元！')
    },
       getList(){
       	  axios.post(url.cartLists).then(res =>{
       	  	//console.log(res)
       	let lists = res.data.cartList
       	 lists.forEach(shop => {
       	 	shop.checked = true
       	 	shop.editing = false
       	 	shop.editingMsg = '编辑'
       	 	shop.removeChecked = false
       	  shop.goodsList.forEach(good=>{
       	  	good.checked = true
       	  	good.removeChecked = false
       	  })
        })
       	 this.lists = lists
      })
      },
      selectGoods(shop,good){
      	let attr = this.editingShop?'removeChecked':'checked'
      	good[attr] = !good[attr]
      	shop[attr] =shop.goodsList.every( good=>{
      		return good[attr]
      	})
      	//console.log(good.checked)
      },
      selectShop(shop){
      	let attr = this.editingShop?'removeChecked':'checked'
      	//shop.checked = !shop.checked
      	shop[attr] = !shop[attr]
      	shop.goodsList.forEach(good=>{
      		good[attr] =shop[attr]
      	})
      },
      selectAll(){
      	let attr = this.editingShop?'allRemoveSelected':'allSelected'
      	this[attr] = !this[attr]
      },
      edit(shop,index){
      	shop.editing = !shop.editing
      	shop.editingMsg = shop.editing ? '编辑':'完成'
      	this.lists.forEach((item,i)=>{
      		if(index !== i){
      			item.editing = false
      			item.editingMsg = shop.editing ? '':'编辑'
      		}
      	})
      	this.editingShop = shop.editing ? shop : null
         this.editingShopIndex = shop.editing ? index : -1
      },
      reduce(good){
           if(good.number===1) return
      	axios.post(url.cartReduce,{
      		id:good.id,
      		number:1
      	}).then(res=>{
      		good.number--
      	})
      },
      add(good){
      	axios.post(url.addCart,{
      		id:good.id,
      		number:1
      	}).then(res=>{
      		good.number++
      	})
      },
     remove(shop,index,good,goodIndex){
     	//console.log('ff')
             this.removePopup = true
             this.removeMsg = '确认删除该商品吗？'
             this.removeData={shop,index,good,goodIndex}
     },
     removeConfirm(){
     	let {shop,index,good,goodIndex} = this.removeData
     	 axios.post(url.cartRemove,{
     	 	id:good.id
     	 }).then(res=>{
     	 	shop.goodsList.splice(goodIndex,1)
     	 	if(!shop.goodsList.length){
     	 		this.lists.splice(index,1)
     	 		this.removeShop()
     	 	}
     	 	this.removePopup = false
     	 	//this.$refs[`goods-${index}-${goodIndex}`][0].style.left = '0px'
     	 })
     },
     removeShop(){
     	this.editingShop = null
     	this.editingShopIndex = -1
     	this.lists.forEach(shop=>{
     		shop.editing = false
     		shop.editingMsg = '编辑'
     	})
     },
         start(e,good) {
      good.startX = e.changedTouches[0].clientX
    },
    end(e,index,good,goodIndex) {
      let endX = e.changedTouches[0].clientX
      let left = '0'
      if(good.startX - endX > 100) {
        left = '-60px'
      }
      if(endX - good.startX > 100) {
        left = '0px'
      }
      // console.log(this.$refs[`goods-${shopIndex}-${goodIndex}`])
      Volecity(this.$refs[`goods-${index}-${goodIndex}`], {
        left
      })
    }
	},
	mixins: [mixin]
})
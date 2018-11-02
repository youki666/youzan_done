let url = {
  hotLists: '/index/hotLists',
  banner: '/index/banner',
  topLists:'/category/topList',
  subLists:'/category/subList',
  rank:'/category/rank',
  searchList:'/search/list',
  details:'/goods/details',
  deal:'/goods/deal',
  addCart:'/cart/add',
  cartRemove: '/cart/remove',
  cartMremove: '/cart/mremove',
  cartReduce: '/cart/reduce',
  cartLists: '/cart/list',
  cartUpdate: '/cart/update',
  addressList:'/address/list',
  addressAdd:'/address/add',
  addressRemove:'/address/remove',
  addressUpdata:'/address/updata',
  addressSetDefault:'/address/setDefault',
}

//let host = 'http://rapapi.org/mockjsdata/23334'
let host = 'http://rap2api.taobao.org/app/mock/7058'

for (let key in url) {
  if (url.hasOwnProperty(key)) {
    url[key] = host + url[key]
  }
}

export default url
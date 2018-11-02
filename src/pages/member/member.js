
import Vue from 'vue/dist/vue.common.js'
import Router from 'vue-router'

Vue.use(Router)

const routes = [{
	path:'/',
	component: () => import('./components/member.vue')
},{
	path:'/address',
	component: require('./components/address.vue').default,
	children:[{
		path:'/',
		//component:require('./components/all.vue').default
		redirect:'all'
	},{
		path:'all',
		name:'all',
		component:require('./components/all.vue').default
	},{
		path:'form',
		name:'form',
		component:require('./components/form.vue').default
	}]
}]
let router = new Router({
   routes
}) 

new Vue({
	el:"#app",
	router
})
import { createStore } from 'vuex';

export default createStore({
	state: {
		isLoading: true
	},
	getters: {
		checkLoading(state){
			return state.isLoading
		}
	},
	mutations: {
		loading(state, value){
			state.isLoading = value
		}
	},
	actions: {}
})
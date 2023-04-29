<template>
	<div class="wrapper" :class="{light : white}">
	<TheHeader/>
		<Transition>
		<main class="page" v-if="isLoading">
			<div class="page__container">
				<div class="page__loader">
					<div class="page__scanner">
						<span>Loading...</span>
					</div>
				</div>
			</div>
		</main>
		<main class="page" v-else>
			<div class="page__container">
				<h1 class="page__title" :style="{color: white ? 'black' : 'white'}">Сапер</h1>
				<div class="sidebar">
					<h3 class="sidebar__title">Настройки</h3>
					<div class="ya-share2" data-curtain data-shape="round" data-limit="0" data-more-button-type="short" data-services="vkontakte,odnoklassniki,telegram,twitter,viber"></div>
						<button class="sidebar__button" @click="soundFunc">{{ soundBtn }}</button>
						<button class="sidebar__button" @click="showFunc">{{ showBtn }}</button>
						<button class="sidebar__button" @click="themeFunc">{{ themeBtn }}</button>
						<select class="sidebar__select" v-model="selectedLvl" @change="changeLvl">
							<option value="" disabled>Выберите режим игры</option>
							<option v-for="lvl in gameLevel" :key="lvl.value" :value="lvl.value">{{ lvl.label }}</option>
						</select>
				</div>
				<TheGame :sound="sound" :show="show" :lvl="selectedLvl"/>
			</div>
		</main>
	</Transition>
	<TheFooter/>
	</div>
</template>
<script>
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'
import TheGame from '../components/TheGame.vue'
export default {
	components: {
		TheHeader, TheFooter, TheGame
	}, 
	data(){
		return {
			sound: true,
			show: false,
			white: false,
			selectedLvl: "low",
			isLoading: this.$store.getters.checkLoading,
			gameLevel: [
				{
					label: 'Новичок',
					value: 'low'
				},
				{
					label: 'Средний',
					value: 'average'
				},
				{
					label: 'Сложный',
					value: 'hard'
				},
			]
		}
	},
	computed: {
		soundBtn(){
			return this.sound ? "Выключить звук" : "Включить звук"
		},
		showBtn(){
			return this.show ? "Скрыть бомбы" : "Показать бомбы"
		},
		themeBtn(){
			return this.white ? "Включить темную тему" : "Включить белую тему"
		}
	},
	watch: {
		selectedLvl(lvl){
			localStorage.setItem('lvl', lvl)
		}
	},
	methods: {
		soundFunc(){
			this.sound = !this.sound
			localStorage.setItem('sound', this.sound)
		},
		showFunc(){
			this.show = !this.show	
			localStorage.setItem('show', this.show)
		},
		themeFunc(){
			this.white = !this.white
			localStorage.setItem('theme', this.white)
		},
	},
	mounted(){
		setTimeout(() => {
			this.$store.commit('loading', false)
			this.isLoading = this.$store.getters.checkLoading
		}, 2250);

		if (localStorage.getItem('sound') !== null){
			this.sound = JSON.parse(localStorage.getItem('sound'))
		}
		if (localStorage.getItem('show') !== null){
			this.show = JSON.parse(localStorage.getItem('show'))
		}
		if (localStorage.getItem('theme') !== null){
			this.white = JSON.parse(localStorage.getItem('theme'))
		}
		if (localStorage.getItem('lvl') !== null){
			this.selectedLvl = localStorage.getItem('lvl')
		}
	}
}
</script>

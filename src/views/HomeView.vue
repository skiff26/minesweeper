
import TheHeader from '../components/TheHeader.vue';

<template>
<div class="wrapper" :class="{light : white}">
<TheHeader/>
	<main class="page">
		<div class="page__container">
			<h1 class="page__title" :style="{color: white ? 'black' : 'white'}">Сапер</h1>
			<div class="sidebar">
				<h3 class="sidebar__title">Настройки</h3>
				<div class="ya-share2" data-curtain data-shape="round" data-limit="0" data-more-button-type="short" data-services="vkontakte,odnoklassniki,telegram,twitter,viber"></div>
					<button class="sidebar__button" @click="soundFunc">{{ soundBtn }}</button>
					<button class="sidebar__button" @click="showFunc">{{ showBtn }}</button>
				<button class="sidebar__button" @click="themeFunc">{{ themeBtn }}</button>
			</div>
			<TheGame :sound="sound" :show="show"/>
		</div>
	</main>
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
		}
	},
	mounted(){
		if (localStorage.getItem('sound') !== null){
			this.sound = JSON.parse(localStorage.getItem('sound'))
		}
		if (localStorage.getItem('show') !== null){
			this.show = JSON.parse(localStorage.getItem('show'))
		}
		if(localStorage.getItem('theme') !== null){
			this.white = JSON.parse(localStorage.getItem('theme'))
		}
	}
}
</script>

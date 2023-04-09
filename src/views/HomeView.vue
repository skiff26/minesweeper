
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
					<button class="sidebar__button" v-if="sound" @click="sound = !sound">Выключить звук</button>
					<button class="sidebar__button" v-else @click="sound = !sound">Включить звук</button>
					<button class="sidebar__button" v-if="!show" @click="show = !show">Показать бомбы</button>
					<button class="sidebar__button" v-else @click="show = !show">Скрыть бомбы</button>
				<button class="sidebar__button" v-if="!white" @click="white = !white">Включить белую тему</button>
				<button class="sidebar__button" v-else @click="white = !white">Включить темную тему</button>
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
}
</script>

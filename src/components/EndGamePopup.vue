<template>
<teleport to='body'>
	<div class="popup">
		<div class="popup__container">
			<audio ref="mouse" src="/audio/mouse.mp3"></audio>
			<h2 class="popup__title">Игра закончена</h2>
			<div class="popup__content" v-show="lose">Вы наступили на мину :( <br> <br> Попробуйте еще раз</div>
			<div class="popup__footer">
				<div class="popup__buttons">
					<button class="popup__btn" @click="$emit('again')">Играть заново</button>
					<button class="popup__btn" @click="$emit('close')">Закрыть</button>
				</div>
			</div>
		</div>
	</div>
</teleport>
</template>
<script>
export default {
	emits: ['close', 'again'],
	props: ['lose'],
}
</script>
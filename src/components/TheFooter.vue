<template>
	<footer class="footer">
		<div class="footer__container">
			<ul class="footer__content">
				<li class="footer__item" v-for="item of items" :key="item.label"><a :href="item.link" class="footer__link">{{ item.label }}</a></li>
			</ul>
		</div>
		<div class="footer__copy">Copyright © {{ year }} All rights reserved</div>
	</footer>
</template>

<script>
export default {
	setup() {
		const year = new Date().getFullYear()

		const items = [
			{
				label: 'Сапёр',
				link: 'https://ru.wikipedia.org/wiki/%D0%A1%D0%B0%D0%BF%D1%91%D1%80_(%D0%B8%D0%B3%D1%80%D0%B0)'
			},
			{
				label: 'Правила игры',
				link: 'https://ru.wikipedia.org/wiki/%D0%A1%D0%B0%D0%BF%D1%91%D1%80_(%D0%B8%D0%B3%D1%80%D0%B0)'
			},
			{
				label: 'Сообщить об ошибке',
				link: 'mailto:artem.kulchitsky@gmail.com'
			}
		]

		return {
			year,
			items
		}
	}
}
</script>
<template>
	<header class="header">
		<div class="header__container">
			<ul class="header__content">
				<li v-for="item in items" :key="item.link" class="header__item"><a :href="item.link" target="_blank" class="header__link">{{ item.label }}</a></li>
			</ul>
		</div>
	</header>
</template>
<script>
export default {
  setup() {
    const items = [
      {
        label: 'Автор',
        link: 'https://skiff26.github.io/portfolio/#/'
      },
      {	
        label: 'Шахматы',
        link: 'https://skiff26.github.io/chess/'
      },
      {
        label: 'Другие',
        link: 'https://skiff26.github.io/portfolio/#/works'
      }
    ]
    return {
      items
    }
  }
}
</script>

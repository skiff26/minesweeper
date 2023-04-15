<template>
	<div class="page__game game">
		<audio ref="grass" src="./audio/sound.mp3"></audio>
		<audio ref="blast" src="./audio/blast.mp3"></audio>
		<audio ref="gameover" src="./audio/gameover.mp3"></audio>
		<audio ref="win" src="./audio/win.mp3"></audio>
		<audio ref="click" src="./audio/click.mp3"></audio>
		<div ref="board" class="game__board">
			<div ref="row" class="row" v-for="(row, rowIndex) in board" :key="rowIndex">
				<div ref="square" v-for="(square, colIndex) in row" :key="colIndex"
				:class="getClass(rowIndex, colIndex, square)" 
				@click="clearMine(rowIndex, colIndex, square, $event)"
				@click.right.prevent="setFlag(rowIndex, colIndex, $event)"
				@touchstart="start($event)"
				@touchend.prevent="end(rowIndex, colIndex, $event)"
				@touchmove="move">
					<svg height="35" width="35" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" v-if="square === bomb" v-show="show || isOpen || blockGame" v-html="square"></svg>
					<p v-else>{{ square }}</p>
				</div>
			</div>
		</div>
		<DialogForGameEnd v-if="isOpen" @close="close" @again="again($event)" :lose="lose" :sound="sound"/>
	</div>
</template>
<script>
import icons from '../icons'
import sound from '../utils/sound'
import createBombs from '../utils/createBombs'
import DialogForGameEnd from './DialogForGameEnd.vue'
export default {
	components: { DialogForGameEnd },
	props: ['sound', 'show', 'lvl'],
	data () {
		return {
			board: [
				['', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', ''],
			],
			bomb: icons['bomb'],
			flag: icons['flag'],
			blockGame: false,
			isOpen: false,
			touchStart: 0,
			touchEnd: 0,
			lose: true,
			moved: null,
			level: this.lvl,
		}
	},
	methods: {
		getClass(rowIndex, colIndex) {
 			let className = "square"
 			if ((rowIndex + colIndex) % 2 === 0) {
 				className += " white"
 			} else {
 				className += " black"
 			}
			return className
		},
		clearMine(row, col, square, event){
			if (this.blockGame){
				this.isOpen = true
				return
			}
			if (square === this.bomb){
				sound(this.sound, this.$refs, 'blast')
				sound(this.sound, this.$refs, 'gameover')
			   this.blockGame = true
				this.isOpen = true
			} else if (this.board[row][col] !== ""){
				alert("This place is already unmine")
			} else {
				const offsets = [  
					[-1, -1], [-1, 0], [-1, 1],
					[0, -1], [0, 1],
					[1, -1], [1, 0], [1, 1]
				];

				if (!event.target.classList.contains('flag')){
					this.generateMoves(row, col, event)

					sound(this.sound, this.$refs)

					for (const [x, y] of offsets) {
						const newRow = row + x;
						const newCol = col + y;
						if (this.board?.[newRow]?.[newCol] !== this.bomb) {
							this.generateMoves(newRow, newCol)
						}
					}
				}
			}
		},
		generateMoves(row, col){
			const offsets = [  
				[-1, -1], [-1, 0], [-1, 1],
				[0, -1], [0, 1],
				[1, -1], [1, 0], [1, 1]
			];
			if(this.board?.[row]?.[col] == ""){
				this.board[row][col] = 0
			} else {
				return
			}
			for (const [x, y] of offsets) {
				const newRow = row + x;
				const newCol = col + y;
				if (this.board?.[newRow]?.[newCol] === this.bomb){
					this.board[row][col]++
				}
			}

			this.$nextTick(() => {
				const allSquares = [...this.$refs.square]
				const sortSquares = allSquares.filter((el) => el.lastChild.localName === 'p').filter((el) => el.innerText != "")
				const sortForWin = allSquares.filter((el) => el.lastChild.localName === 'p').filter((el) => el.innerText === "")

				if (sortSquares.length > 0) {
					for (let square of sortSquares){
						if (!square.classList.contains('flag')){
							if (!square.classList.contains('unmine')) {
								square.classList += " unmine"
							}
						} else {
							square.children[0].innerText = ""
							console.log(sortSquares)
						}
					}
				} 
				if (!sortForWin.length > 0){
					sound(this.sound, this.$refs, 'win')
					this.lose = false
					this.isOpen = true
					this.blockGame = true
				}
			})
		},
		setFlag(row, col, event){
			if (!event.target.classList.contains('unmine') && !event.target.parentElement.classList.contains('unmine')){
				if (this.board[row][col] !== this.bomb) {
					if (event.target.classList.contains('flag')){
						this.board[row][col] = ""
						event.target.classList.remove('flag')
					} else {
						this.board[row][col] = ""
						event.target.classList += " flag"
					}
				} else {
					if (event.target.classList.contains('square')){
						event.target.classList.toggle('flag')
					} else if (event.target.parentElement.classList.contains('square')){
						event.target.parentElement.classList.toggle('flag')
					} else if (event.target.parentElement.parentElement.classList.contains('square')){
						event.target.parentElement.parentElement.classList.toggle('flag')
					}	
				}
			} 
		},
		start(event){
			this.touchStart = event.timeStamp
		},
		end(row, col, event){
			if (this.moved > 30){
				this.moved = null
				return false
			}

			this.touchEnd = event.timeStamp

			let resultTime = this.touchEnd - this.touchStart
			if (resultTime.toFixed(2) > 300){
				this.setFlag(row, col, event)
			} else {
				this.clearMine(row, col, this.board[row][col], event)
			}
		},
		move(){
			this.moved++
		},
		close(){
			this.isOpen = !this.isOpen
			this.blockGame = true
			sound(this.sound, this.$refs, 'click')
		},
		again(){
			this.setLvl()
			sound(this.sound, this.$refs, 'click')
			const board = this.$refs.board;
			const unmineElements = board.querySelectorAll('.unmine');
			const minesElements = board.querySelectorAll('.flag');
			unmineElements.forEach(element => {
				element.classList.remove('unmine');
			});
			minesElements.forEach(element => {
				element.classList.remove('flag')
			})
			this.blockGame = false
			this.isOpen = false
			this.lose = true
		},
		setLvl(){
			if (this.level === "hard"){
				this.rows = 16
				this.cols = 9
			} else if (this.level === "average"){
				this.rows = 11
				this.cols = 9
			} else {
				this.rows = 8
				this.cols = 8
			}
			this.board = Array.from({ length: this.rows }, () => Array.from({ length: this.cols }, () => ''));
			createBombs(this.board, this.bomb)
		}
	},
	watch: {
		lvl(newValue){
			this.level = newValue
			this.again()
			this.setLvl()
		}
	},
	mounted() {
		if (localStorage.getItem("lvl") !== null) {
			this.lavel = localStorage.getItem("lvl")
		}
		this.setLvl()
	},
}
</script>
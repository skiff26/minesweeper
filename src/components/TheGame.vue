<template>
	<div class="page__game game">
		<div ref="board" class="game__board">
			<audio ref="grass" src="/audio/sound.mp3"></audio>
			<audio ref="blast" src="/audio/blast.mp3"></audio>
			<div ref="row" class="row" v-for="(row, rowIndex) in board" :key="rowIndex">
				<div ref="square" class="square" v-for="(square, colIndex) in row" :key="colIndex"
				:class="getClass(rowIndex, colIndex, square)" 
				@click="clearMine(rowIndex, colIndex, square, $event)"
				@click.right.prevent="setFlag(rowIndex, colIndex, $event)"> 
					<svg height="35" width="35" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" v-if="square === bomb" v-show="show || isOpen || blockGame" v-html="square"></svg>
					<p v-else>{{ square }}</p>
				</div>
			</div>
		</div>
		<EndGamePopup v-if="isOpen" @close="close" @again="again($event)" :lose="lose" />
	</div>
</template>
<script>
import icons from '../icons'
import EndGamePopup from '../components/EndGamePopup.vue'
export default {
	components: {
		EndGamePopup
	},
	props: ['sound', 'show'],
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
			lose: true,
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
				if (this.sound) {
					const audio = this.$refs.blast
					audio.play()
				}
				this.isOpen = true
			} else if (this.board[row][col] !== ""){
				alert("This place is already unmine")
			} else {
				if (this.sound){
					const audio = this.$refs.grass
					audio.play()
				}

				const offsets = [  
					[-1, -1], [-1, 0], [-1, 1],
					[0, -1], [0, 1],
					[1, -1], [1, 0], [1, 1]
				];

				if (!event.target.classList.contains('flag')){
					this.generateMoves(row, col, event)

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

				if (sortSquares.length > 0) {
					for (let square of sortSquares){
						if (!square.classList.contains('flag')){
							square.classList += " unmine"
						} else {
							square.children[0].innerText = ""
							console.log(sortSquares)
						}
					}
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
		close(){
			this.isOpen = !this.isOpen
			this.blockGame = true
		},
		again(){
			this.board = [
				['', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', ''],
			]
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
			this.createBombs(this.board)
		},
		createBombs(board){
			for (let i = 0; i < board.length; i++){
				for (let j = this.getRandomInt(5); j < board[i].length; j += this.getRandomInt(5)){	
					board[i][j] = this.bomb
				}	
			}
		},
		getRandomInt(max) {
			return Math.floor(Math.random() * max);
		}
	},
	mounted(){
		this.createBombs(this.board)
	}
}
</script>
import getRandomInt from './randomInt'

export default function createBombs(board, bomb, times = 5){
	for (let i = 0; i < board.length; i++){
		for (let j = getRandomInt(times); j < board[i].length; j += getRandomInt(times)){	
			board[i][j] = bomb
		}	
	}
}
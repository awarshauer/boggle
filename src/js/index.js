import { Timer } from './timer.js';
import {wordList, addWordsToList, wordInput, countWordList, getAdjacentLetters, onCallSolve, solveList, displayResults, solveListObj} from './wordlist.js';
// import { Wordlist } from './wordlist.js';
import {reset, shake, grid, makeGrid, board} from './board.js';
export {newGame}


let myTimer = new Timer(180);

// New Game
function newGame() {
	reset();
	shake();
	makeGrid(board);
	onCallSolve();
	
	//title
	document.getElementById('heading').innerHTML = "Let's go!";
	startbtn.innerHTML = 'Again?';

	//timer

	myTimer.stopTimer();
	myTimer.resetTimer();
	myTimer.setTimer();
	myTimer.startTimer();

	//wordlist reset
	let list = [];
	const tiles = document.querySelectorAll('div.grid-cell');
	tiles.forEach(tile => tile.classList.remove('selectedTile'));


	//ux visibility
	stopbtn.style.display = "inline";
	addbtn.style.display = "inline";
	document.querySelector('#report').style.display = "block";
	document.querySelector('#report').style.visibility = "hidden";
	document.querySelector('#words').style.display = "inline";
	document.querySelector('.c-results').style.display = "none";
}

function stopGame(){
	myTimer.stopTimer();
	myTimer.gameOver();
}

//Event Listeners
let startbtn = document.querySelector('#btn-new');
let addbtn = document.querySelector('#add-btn');
let stopbtn = document.querySelector('#btn-stop');
let displayList = document.querySelector('div.wordlist');
// let wordInput = document.getElementById('words');



startbtn.addEventListener('click', newGame);
stopbtn.addEventListener('click', stopGame);
addbtn.addEventListener('click', addWordsToList);
wordInput.addEventListener('keypress', function(e) {
	if (e.key === 'Enter') {
		if (!this.value) return;
		addWordsToList();
	}
});


/* To build

*/


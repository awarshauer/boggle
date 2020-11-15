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
	document.getElementById('heading').innerHTML = "Let's a go!";
	startbtn.innerHTML = 'Again?';

	//timer

	myTimer.stopTimer();
	myTimer.resetTimer();
	myTimer.setTimer();
	myTimer.startTimer();

    let list = [];

	// while (displayList.firstChild) {
	// 	displayList.removeChild(displayList.firstChild);
	// }

	stopbtn.style.visibility = "visible";
	addbtn.style.visibility = "visible";
	document.querySelector('#words').style.visibility = "visible";
	document.querySelector('.c-results').style.visibility ="hidden";
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


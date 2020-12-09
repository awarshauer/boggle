import { Timer } from './timer.js';
import {wordList, addWordsToList, addMouseWordsToList, wordInput, countWordList, getAdjacentLetters, onCallSolve, solveList, displayResults, solveListObj, inArray} from './wordlist.js';
// import { Wordlist } from './wordlist.js';
import {reset, shake, grid, makeGrid, board} from './board.js';
export {mouseWord};


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


//Mouse over select

let isWording = false;
let mouseWord = ''
let usedTiles = [];

function startingWord(){
	mouseWord += this.innerHTML
	usedTiles.push(this.id);
	this.classList.add('selectedTile')
	isWording = true;
}

function nextLetter(){
	if (isWording === true && !inArray(usedTiles, this.id)){
		mouseWord += this.innerHTML;
		usedTiles.push(this.id);
		this.classList.add('selectedTile')
	}
};

function endWord(){
	if (isWording === true){
		addMouseWordsToList();
		isWording = false;
		mouseWord = ''
		usedTiles = [];
		tiles2.forEach(tile => tile.classList.remove('selectedTile'));
	}
}

const tiles2 = document.querySelectorAll('div.tile');

tiles2.forEach(div => div.addEventListener('mousedown', startingWord));
tiles2.forEach(div => div.addEventListener('mouseenter', nextLetter));
tiles2.forEach(div => div.addEventListener('mouseup', endWord));



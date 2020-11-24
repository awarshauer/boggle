export {wordList, addWordsToList, wordInput, countWordList, Trie, myTrie, getAdjacentLetters, onCallSolve, solveList, solveListObj, displayResults}
import {grid} from './board.js'

class Trie{

    constructor(){
    }
    
    add(word){
        if (word == null || word === '') {
            return;
        }

        let currentNode = this;
        word.toLowerCase().split('').forEach((letter, index) => {
            if (!currentNode[letter]) {
                currentNode[letter] = {};
            }
            // reached the end of the word?
            if (index === word.length - 1) {
                currentNode.$ = 1;
            } else {
                currentNode = currentNode[letter];
            }
        });
    }

    containsWord(word) {
        if (typeof word !== 'string') {
            throw `Invalid parameter passed to Trie.containsWord(string word): ${word}`;
        }
    
        if (!word) {
            return false;
        }
    
        let currentNode = this;
        // console.log(`When running containsWord, current node: ${currentNode}`);
        return word.split('').every((letter, index) => {
              if (!currentNode[letter]) {
                return false;
            }
            currentNode = currentNode[letter];
    
            if (index === word.length - 1) {
                return currentNode.$ === 1;
            }
            return letter;
        });
    }

    isValidPrefix(prefix) {
        let currentNode = this;
        return prefix.toLowerCase().split('').every((letter) => {
            if (!currentNode[letter]) {
                return false;
            }
            currentNode = currentNode[letter];
            return true;
        });
    }
}

//trie
let myTrie = new Trie();

fetch('./dictionary/collinsscrabble2019.txt')
	.then((response) => {
		return response.text();
	})
	.then((response) => {
		response.split('\n').forEach((word) => {
			myTrie.add(word);
        });
    })


let displayList = document.querySelector('div.wordlist');
let alertArea =  document.querySelector('#report');
let wordList = [];
let wordInput = document.getElementById('words');
let enteredWord = '';


function addWordsToList() {
    enteredWord = wordInput.value.toLowerCase();
    alertArea.style.visibility = "visible";
	if(inArray(solveList, enteredWord) && !inArray(wordList, enteredWord) && enteredWord.length > 2){
	wordList.push(enteredWord);
    alertArea.innerHTML = `${enteredWord} - That's a boggle!`;
} else{
    alertArea.innerHTML = `${enteredWord} is not a valid word`;
}
	wordInput.value = '';
}

function countWordList() {
    let score = 0;
	let points = 0;
	for(let words of wordList){
		if (words.length < 5){
			points = 1
		} else if (words.length === 5){
			points = 2
		} else if (words.length === 6){
			points = 3
		}else if (words.length === 7){
			points = 5
		}else if (words.length >= 8){
			points = 11
		}
        score = score += points;
		}
		document.getElementById('heading').innerHTML = `Your score was ${score}`;
    }



// Solver credit: Lyndsey Browning http://lyndseyb.co.uk/posts/boggle-solver#trie-structure

const directions = [ [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1] ];
let solveListObj = [];
let coords = [];
let solveList = [];

//DOM
const numdWords = document.getElementById('num-words');
const solvedWords = document.getElementById('num-solve');
const solvedWordList = document.getElementById('word-list');

function inArray(arr, item) {
    return (arr.indexOf(item) !== -1);
}

function arrayMatch(first, second) {
    return first.some((item) => {
         return item.every((x, index) => {
        return x === second[index];
    });
  });
}

function onCallSolve(){
    wordList = []
    solveListObj = [];
    solveList = [];
    solvedWordList.innerHTML = ''
    solvedWords.innerText = '0'
    grid.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            solveBoard(grid[rowIndex][colIndex].toLowerCase(), [rowIndex, colIndex]);
        });
        });
}

function solveBoard(currentWord, currentPosition, coords = [], usedPositions = []) {
    const [row, col] = currentPosition;
    const positions_copy = usedPositions.slice();
    const coords_copy = coords.slice();

    coords_copy.push(currentPosition);
    
    if(currentWord.length >= 3 && myTrie.containsWord(currentWord) && !inArray(solveList, currentWord)) {
        solveList.push(currentWord);
    solveListObj.push({
        word: currentWord,
        coords: coords_copy
    });
    coords = [];
    }

    const adjacents = getAdjacentLetters(currentWord, currentPosition, usedPositions);
    adjacents.forEach(adjacent => {
        positions_copy.push(currentPosition);
    const [x,y] = adjacent;
    const letter = grid[x][y].toLowerCase();
    const word = currentWord + letter;
    solveBoard(word, adjacent, coords_copy, positions_copy);
    });
    return;
}

function getAdjacentLetters(currentWord, position, usedPositions) {
    const _directions = directions.slice(0);
    const [row,col] = position;
        return _directions.reduce((acc, direction) => {
        const [x, y] = direction;
        const rowSum = (x < 0) ? row - Math.abs(x) : row + x;
        const colSum = (y < 0) ? col - Math.abs(y) : col + y;
    
        if((rowSum >= 0 && colSum >= 0) && (rowSum < 4 && colSum < 4)) {
            let adjacent = [rowSum, colSum];
            let adjacentWord = currentWord + grid[rowSum][colSum];

        if(!arrayMatch(usedPositions, adjacent) && myTrie.isValidPrefix(adjacentWord)){
            acc.push(adjacent);
        }}
        return acc;
    }, []);
    }

function displayResults(solveListObj) {
    // sort available words by length, descending
    solveListObj = solveListObj.sort((a,b) => {return b.word.length - a.word.length});
    solvedWords.innerText =`You solved ${wordList.length} / ${solveList.length}`

    solvedWordList.innerHTML = solveListObj.reduce((acc, obj) => {
        if (inArray(wordList, obj.word)){
            return acc + `<li class="c-found" cdata coords="${JSON.stringify(obj.coords)}">${obj.word}</li>`;  
        } else {
        return acc + `<li cdata coords="${JSON.stringify(obj.coords)}">${obj.word}</li>`;
    }
    }, '');

    const tiles = document.querySelectorAll('div.grid-cell');

    solvedWordList.addEventListener('click', (e) => {
        [].forEach.call(tiles, tile => {
            tile.classList.remove('selectedTile');
        });

        const word = e.target;
        if(!word.nodeName === 'LI' && !word.getAttribute('coords')) {
            return;
          }
        const coords = JSON.parse(word.getAttribute('coords'));
        coords.forEach((coord, index) => {
            const [row, col] = coord;
            setTimeout(() => {
                tiles[4 * row + col].classList.add('selectedTile');
            }, index * 300);
        });
    });
}
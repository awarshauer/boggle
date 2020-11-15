export {reset, shake, grid, makeGrid, board}
let takenSpaces = [];
let availableSpaces = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ];
let board = [];
let grid = [[],[],[],[]];
let dice = [
	[ 'A', 'A', 'E', 'E', 'G', 'N' ],
	[ 'A', 'B', 'B', 'J', 'O', 'O' ],
	[ 'A', 'C', 'H', 'O', 'P', 'S' ],
	[ 'A', 'F', 'F', 'K', 'P', 'S' ],
	[ 'A', 'O', 'O', 'T', 'T', 'W' ],
	[ 'C', 'I', 'M', 'O', 'T', 'U' ],
	[ 'D', 'E', 'I', 'L', 'R', 'X' ],
	[ 'D', 'E', 'L', 'R', 'V', 'Y' ],
	[ 'D', 'I', 'S', 'T', 'T', 'Y' ],
	[ 'E', 'E', 'G', 'H', 'N', 'W' ],
	[ 'E', 'E', 'I', 'N', 'S', 'U' ],
	[ 'E', 'H', 'R', 'T', 'V', 'W' ],
	[ 'E', 'I', 'O', 'S', 'S', 'T' ],
	[ 'E', 'L', 'R', 'T', 'T', 'Y' ],
	[ 'H', 'I', 'M', 'N', 'U', 'Qu' ],
	[ 'H', 'L', 'N', 'N', 'R', 'Z' ]
];

//Dice Roll/Placement functions wtih lots of help from Michael Bishop

function reset(){
	takenSpaces = [];
	availableSpaces = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ];
	board = [];
}

function pick(arr) {
	const idx = Math.floor(Math.random() * arr.length);
	return arr[idx];
}

function checkSpace(space) {
	return takenSpaces.includes(space);
}

function freeSpace() {
	let targetSpace = Math.floor(Math.random() * availableSpaces.length);
	if (checkSpace(targetSpace) == false) {
		return targetSpace;
	} else {
		return freeSpace();
	}
}

function shake() {
dice.forEach(die => {
	let targetSpace = freeSpace();
	takenSpaces.push(targetSpace);
	board[targetSpace] = pick(die);
}) };

function makeGrid(arr){
let col = 3;
let k = 0;
let l = 0;
for(let [idx, tiles] of arr.entries()){  
    grid[k][l] = tiles;
    document.getElementById(`tile${idx}`).textContent = tiles;
    if(l<col){
        l++
    }else{
     k++
     l=0  
    }}}
import { countWordList, displayResults, solveListObj, solveList} from './wordlist.js';
export class Timer{

    constructor(time_limit){
this.FULL_DASH_ARRAY = 283;
this.WARNING_THRESHOLD = 60;
this.ALERT_THRESHOLD = 10;
this.COLOR_CODES = {
	info: {
		color: 'green'
	},
	warning: {
		color: 'orange',
		threshold: this.WARNING_THRESHOLD
	},
	alert: {
		color: 'red',
		threshold: this.ALERT_THRESHOLD
	}};

this.time_limit = time_limit;
this.timePassed = 0;
this.timeLeft = time_limit;
this.timerInterval = null;
this.remainingPathColor = this.COLOR_CODES.info.color;
}

// Credit: Mateusz Rybczonec: https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/


setTimer() {
	document.getElementById('timer').innerHTML = `
<div class="base-timer">
<svg class="base-timer__svg" viewbox="-50 -50 100 100" xmlns="http://www.w3.org/2000/svg">
	<g class="base-timer__circle">
		<circle class="base-timer__path-elapsed" cx"50" cy"50" r="45" />
		<path id="base-timer-path-remaining"
		stroke-dasharray="283"
		class="base-timer__path-remaining ${this.remainingPathColor}"
		d="
			M 25, 20
			m -70, 80
			a 45,45 0 1,0 90, 0
			a 45,45 0 1,0 -90, 0
		"></path> 
	</g>
</svg>
<span id="base-timer-label" class="base-timer__label">
${this.formatTimeLeft(this.timeLeft)} 
</span>
</div>`;
}

formatTimeLeft(time) {
	//the largest round integer less than or equal to the result of time divided being by 60.
	const minutes = Math.floor(time / 60);
	// Seconds are the remainder of the time divided by 60 (modulus operator)
	let seconds = time % 60;
	// If the value of seconds is less than 10, dispaly seconds with a leading zero
	if (seconds < 10) {
		seconds = `0${seconds}`;
	}
	//The output in MM:SS format
	return `${minutes}:${seconds}`;
}

calculateTimeFraction() {
	const rawTimeFraction = this.timeLeft / this.time_limit;
	return rawTimeFraction - 1 / this.time_limit * (1 - rawTimeFraction);
}

setCircleDasharray() {
    const circleDasharray = `${(this.calculateTimeFraction() * this.FULL_DASH_ARRAY).toFixed(0)} 283`;
	document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', circleDasharray);
}

startTimer() {
	document.getElementById('base-timer-label').innerHTML = this.formatTimeLeft(this.time_limit);
	this.timerInterval = setInterval(() => {
		this.timePassed = this.timePassed += 1;
		this.timeLeft = this.time_limit - this.timePassed;
		document.getElementById('base-timer-label').innerHTML = this.formatTimeLeft(this.timeLeft);
		this.setCircleDasharray();
		this.setRemainingPathColor(this.timeLeft);

		if (this.timeLeft === 0) {
			this.stopTimer();
            this.gameOver();
		}
	}, 1000);
}


stopTimer() {
	clearInterval(this.timerInterval);
}

gameOver() {
	countWordList();
	if(solveList.length) {
        displayResults(solveListObj);
    }
	document.querySelector('#words').style.display = "none";
	document.querySelector('#btn-stop').style.display = "none";
	document.querySelector('#add-btn').style.display = "none";
	document.querySelector('#report').style.display = "none";
	document.querySelector('.c-results').style.display = "block";
}

resetTimer(){
    this.timePassed = 0
}

setRemainingPathColor(timeLeft) {
	const { alert, warning, info } = this.COLOR_CODES;
	// If the remaining time is less than or equal to 5, remove the "warning" class and apply the "alert" class.
	if (this.timeLeft <= alert.threshold) {
		document.getElementById('base-timer-path-remaining').classList.remove(warning.color);
		document.getElementById('base-timer-path-remaining').classList.add(alert.color);

		// If the remaining time is less than or equal to 10, remove the base color and apply the "warning" class.
	} else if (this.timeLeft <= warning.threshold) {
		document.getElementById('base-timer-path-remaining').classList.remove(info.color);
		document.getElementById('base-timer-path-remaining').classList.add(warning.color);
	}
}
}
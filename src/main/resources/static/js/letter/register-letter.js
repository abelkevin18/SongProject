var songAudio = document.getElementById('songAudio');
var inputStartTime = document.getElementById('inputStartTime');
var inputFinishTime = document.getElementById('inputFinishTime');
var letterEnglish = document.getElementById('letterEnglish');
var letterSpanish = document.getElementById('letterSpanish');

var listLetters = document.getElementById('listLetters');
var dataLetters = [];

let inputLettersEnglish = document.getElementById('inputLettersEnglish');
let inputLettersSpanish = document.getElementById('inputLettersSpanish');

function Letter(startTime, endTime, letterEnglish, letterSpanish) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.letterEnglish = letterEnglish;
    this.letterSpanish = letterSpanish;
}

function playSong() {
    songAudio.play();
}

function pauseSong() {
    songAudio.pause();
}

function markStart() {
    let timeStart = Math.round(songAudio.currentTime);
    inputStartTime.value = timeStart;
}

function markFinish() {
    let timeFinish = Math.round(songAudio.currentTime);
    inputFinishTime.value = timeFinish;
}

function addRange() {
    let li = createLi(inputStartTime.value, inputFinishTime.value, letterEnglish.value, letterSpanish.value);
    dataLetters.push(new Letter(inputStartTime.value, inputFinishTime.value, letterEnglish.value, letterSpanish.value));
    $("#listLetters").append(li);
    inputStartTime.value = '';
    inputFinishTime.value = '';
    letterEnglish.value = '';
    letterSpanish.value = '';
}

function saveLetters() {
    console.log(dataLetters);

    let currentUrl = window.location.href;
    let divisiones = currentUrl.split("/");
    let id = divisiones[divisiones.length-1];
    console.log(divisiones[divisiones.length-1])
    fetch('/letter/register/'+id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataLetters)
    })
    .then(res => res.json())
    .then(res => {
    	let status = res.status;
    	console.log(status)
    	if(status === true) {
    		location.href = '/song/list';
    	}
    });
    

}

function createLi(ts, tf, en, es) {
    let li = `<li class="list-group-item">
                    <small class="d-block"><b>TS: </b>${ts}<b> TF: </b>${tf}</small> 
                    <small class="d-block"><b>EN: </b>${en}</small> 
                    <small class="d-block"><b>ES: </b>${es}</small> 
                </li>`;
    return li;

}


function backward() {
	const backTime = songAudio.currentTime - 3;
	songAudio.currentTime = backTime;
	playSong();
	
}

function forward() {
	const advanceTime = songAudio.currentTime + 3;
	songAudio.currentTime = advanceTime;
	playSong();
}

function loadLetters() {
	console.log(inputLettersEnglish.value);
	console.log(inputLettersSpanish.value);
	
	
	let theArray = inputLettersEnglish.value.split("\n"); 
	console.log(theArray)
}

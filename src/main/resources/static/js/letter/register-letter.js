var songAudio = document.getElementById('songAudio');
var inputStartTime = document.getElementById('inputStartTime');
var inputFinishTime = document.getElementById('inputFinishTime');
var letterEnglish = document.getElementById('letterEnglish');
var letterSpanish = document.getElementById('letterSpanish');

var listLetters = document.getElementById('listLetters');
var dataLetters = [];

var inputLettersEnglish = document.getElementById('inputLettersEnglish');
var inputLettersSpanish = document.getElementById('inputLettersSpanish');
var countAdditionalLetters = 0;

var arrayLettersEnglish = [];
var arrayLettersSpanish = [];
var btnAdd = document.getElementById('btnAdd');
var nextLetter = document.getElementById('nextLetter');


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
	
    let li = createButtonList(inputStartTime.value, inputFinishTime.value, letterEnglish.value, letterSpanish.value);
    dataLetters.push(new Letter(inputStartTime.value, inputFinishTime.value, letterEnglish.value, letterSpanish.value));
    $("#listLetters").append(li);
    inputStartTime.value = '';
    inputFinishTime.value = '';
    letterEnglish.value = '';
    letterSpanish.value = '';
    
    countAdditionalLetters++;
    if(countAdditionalLetters === arrayLettersEnglish.length) {
    	nextLetter.value = "No more letters"
    	document.getElementById("btnAdd").disabled = true;
    	return false;
    }
    letterEnglish.value = arrayLettersEnglish[countAdditionalLetters];
	letterSpanish.value = arrayLettersSpanish[countAdditionalLetters];
	nextLetter.value = arrayLettersEnglish[countAdditionalLetters + 1];
	
	
    
}

function saveLetters() {

    let currentUrl = window.location.href;
    let divisiones = currentUrl.split("/");
    let id = divisiones[divisiones.length-1];

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

function createButtonList(ts, tf, en, es) {
    /*let li = `<li class="list-group-item">
                    <small class="d-block"><b>TS: </b>${ts}<b> TF: </b>${tf}</small> 
                    <small class="d-block"><b>EN: </b>${en}</small> 
                    <small class="d-block"><b>ES: </b>${es}</small> 
                </li>`;
    return li;*/
    
    return `<button type="button" class="list-group-item list-group-item-action" onclick="listenFragmentSong(${countAdditionalLetters})">
    				<small class="d-block"><b>TS: </b>${ts}<b> TF: </b>${tf}</small> 
                    <small class="d-block"><b>EN: </b>${en}</small> 
                    <small class="d-block"><b>ES: </b>${es}</small>
    		</button>`;

}


function backward(second) {
	const backTime = songAudio.currentTime - second;
	songAudio.currentTime = backTime;
	playSong();
	
}

function forward(second) {
	const advanceTime = songAudio.currentTime + second;
	songAudio.currentTime = advanceTime;
	playSong();
}

function loadLetters() {
	
	arrayLettersEnglish = inputLettersEnglish.value.split("\n"); 
	arrayLettersSpanish = inputLettersSpanish.value.split("\n"); 
	
	letterEnglish.value = arrayLettersEnglish[0];
	letterSpanish.value = arrayLettersSpanish[0];
	
	nextLetter.value = arrayLettersEnglish[1];

}

function listenFragmentSong(index) {
	console.log(dataLetters[index])
	playLetter(dataLetters[index].startTime, dataLetters[index].endTime)
	
}


function playLetter(ts, tf) {
	songAudio.currentTime = ts;
	playSong();
	
	const intervalDuration = 1 + parseInt(tf) - parseInt(ts);

	setTimeout(function(){
		songAudio.pause();
    }, intervalDuration*1000);
}

function tryFragment(){
	
	playLetter(inputStartTime.value, inputFinishTime.value)
}

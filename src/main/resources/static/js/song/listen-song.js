let songAudio = document.getElementById('songAudio');
const durationAudio = songAudio.duration;
let iconPlay;
let isPlay = false;
function playLetter(ts, tf, index) {
	if(isPlay == true) {
		alert("esperar a que termine la reproducción actual")
		return false;
	}
	songAudio.currentTime = ts;
	playSong(index);
	
	const intervalDuration = 1 + parseInt(tf) - parseInt(ts);

	setTimeout(function(){
		//songAudio.pause();
		pauseSong(index);
    }, intervalDuration*1000);
}

function playSong(index) {
	isPlay = true;
    songAudio.play();
    iconPlay =  document.getElementById('iconPlay_'+index);
    iconPlay.classList.remove('text-secondary');
    iconPlay.classList.add('text-danger');
}

function pauseSong(index) {
	isPlay = false;
    songAudio.pause();
    iconPlay =  document.getElementById('iconPlay_'+index);
    iconPlay.classList.remove('text-danger');
    iconPlay.classList.add('text-secondary');
}

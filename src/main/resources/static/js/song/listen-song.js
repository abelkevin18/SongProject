let songAudio = document.getElementById('songAudio');
const durationAudio = songAudio.duration;
function playLetter(ts, tf) {
	songAudio.currentTime = ts;
	playSong();
	
	const intervalDuration = parseInt(tf) - parseInt(ts);

	setTimeout(function(){
		songAudio.pause();
    }, intervalDuration*1000);
}

function playSong() {
    songAudio.play();
}

function pauseSong() {
    songAudio.pause();
}


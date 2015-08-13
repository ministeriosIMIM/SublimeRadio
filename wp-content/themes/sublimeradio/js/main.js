var reproductor = document.getElementById('reproductor'); // id for audio element
var audio = document.getElementById('audio'); // id for audio element
var volumen = document.getElementById('volumen'); // id for audio element
var timeline = document.getElementById('timeline'); // timeline
var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

//setup inicial
audio.volume = 0.9;
playhead.style.marginLeft = timelineWidth*0.9 + "0px";
volumen.style.width = timelineWidth*0.9 + "0px";

//Play and Pause
function play() {
	// start audio
	if (audio.paused) {
		audio.play();
		// remove play, add pause
		reproductor.className = "on";
		pButton.className = "";
		pButton.className = "pause";
	} else { // pause audio
		audio.pause();
		// remove pause, add play
		reproductor.className = "";
		pButton.className = "";
		pButton.className = "play";
	}
}

//Makes timeline clickable
timeline.addEventListener("click", function (event) {
	moveplayhead(event);
}, false);

// returns click as decimal (.77) of the total timelineWidth
function volumenPorcentaje(e) {
	return (e.pageX - $('#timeline').offset().left) / timelineWidth;
}

playhead.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

var onplayhead = false;
// mouseDown EventListener
function mouseDown() {
    onplayhead = true;
    window.addEventListener('mousemove', moveplayhead, true);
    //music.removeEventListener('timeupdate', timeUpdate, false);
}

function mouseUp(e) {
    if (onplayhead == true) {
        moveplayhead(e);
        window.removeEventListener('mousemove', moveplayhead, true);
    }
    onplayhead = false;
}
 
function moveplayhead(e) {
    var newMargLeft = e.pageX - $('#timeline').offset().left;
    if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
        playhead.style.marginLeft = newMargLeft + "px";
		volumen.style.width = newMargLeft + "px";
		audio.volume = volumenPorcentaje(e);
    }
    if (newMargLeft < 0) {
        playhead.style.marginLeft = "0px";
		volumen.style.width = "0px";
		audio.volume = 0;
    }
    if (newMargLeft > timelineWidth) {
        playhead.style.marginLeft = timelineWidth + "px";
		volumen.style.width = timelineWidth + "px";
		audio.volume = volumenPorcentaje(e);
    }
	
}
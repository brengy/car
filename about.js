
const buttonClickAudio5 = new Audio('chim.mp3');

document.addEventListener('DOMContentLoaded', function() {
	buttonClickAudio5.play();
});


const buttonSound = document.getElementById('buttonSound');

function playSound() {
    buttonSound.currentTime = 0; // Rewind to the start
    buttonSound.play();
}

document.getElementById('mainButton').addEventListener('click', function() {
    playSound();
    window.location.href = 'main.html';
});

document.getElementById('monitorButton').addEventListener('click', function() {
    playSound();
    window.location.href = 'monitor.html';
});

document.getElementById('gpsButton').addEventListener('click', function() {
    playSound();
    window.location.href = 'gps.html';
});

document.getElementById('networkButton').addEventListener('click', function() {
    playSound();
    window.location.href = 'network.html';
});

document.getElementById('indButton').addEventListener('click', function() {
    playSound();
    window.location.href = 'index.html';
});

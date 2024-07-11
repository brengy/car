// Play sound on page load
 const buttonClickAudio6 = new Audio('chim.mp3');

document.addEventListener('DOMContentLoaded', function() {
	buttonClickAudio6.play();
});


// Function to play button sound
function playButtonSound(soundId) {
    document.getElementById(soundId).play();
}

// Redirect to appropriate page on button click with sound
document.getElementById('broButton').addEventListener('click', function() {
    playButtonSound('broButtonSound');
    window.location.href = 'bro3.html';
});

document.getElementById('conButton').addEventListener('click', function() {
    playButtonSound('conButtonSound');
    window.location.href = 'Bindex.html';
});

// Play sound on page load
const buttonClickAudio6 = new Audio('chim.mp3');

document.addEventListener('DOMContentLoaded', function() {
    buttonClickAudio6.play();
});

// Function to play button sound
function playButtonSound(soundId) {
    document.getElementById(soundId).play();
}

// Function to check if the user is on a mobile device
function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

// Redirect to appropriate page on button click with sound
document.getElementById('broButton').addEventListener('click', function() {
    playButtonSound('broButtonSound');
    if (isMobile()) {
        window.location.href = 'bro.html';
    } else {
        window.location.href = 'bro2.html';
    }
});

document.getElementById('conButton').addEventListener('click', function() {
    playButtonSound('conButtonSound');
    window.location.href = 'Bindex.html';
});

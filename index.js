// Play sound on page load
    document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('pageLoadSound').play();
});

// Function to play button sound
function playButtonSound(soundId) {
    document.getElementById(soundId).play();
}

// Redirect to appropriate page on button click with sound
document.getElementById('broButton').addEventListener('click', function() {
    playButtonSound('broButtonSound');
    window.location.href = 'bro.html';
});

document.getElementById('conButton').addEventListener('click', function() {
    playButtonSound('conButtonSound');
    window.location.href = 'Bindex.html';
});

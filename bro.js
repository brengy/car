document.addEventListener('DOMContentLoaded', function() {
    const Atext = `
        حبيب قلبي انت هنا ؟
        Here we will showcase the amazing features and details of our innovative car project.
        Stay tuned for more information.
    `.trim().split('\n');

    let lineIndex = 0;
    let charIndex = 0;
    const speed = 50; // Adjust typing speed here (lower is faster)

    // Create and configure the audio element
    const audio = new Audio('typing.mp3'); // Replace with the path to your audio file
    audio.volume = 1; // Adjust volume if needed

    function AtypeWriter() {
        if (lineIndex < Atext.length) {
            if (charIndex < Atext[lineIndex].length) {
                document.getElementById('typingEffect').innerHTML += Atext[lineIndex].charAt(charIndex);
                charIndex++;
               audio.play(); 
              
                setTimeout(AtypeWriter, speed);
            } else {
                document.getElementById('typingEffect').innerHTML += '<br>';
                lineIndex++;
                charIndex = 0;
				  audio.play(); // Play the audio
                setTimeout(AtypeWriter, speed);
            }
        }
    }

 const Etext = `
        Here we will showcase the amazing features and details of our innovative car project.
        Stay tuned for more information.
    `.trim().split('\n');

function EtypeWriter() {
        if (lineIndex < Etext.length) {
            if (charIndex < Etext[lineIndex].length) {
                document.getElementById('typingEffect').innerHTML += Etext[lineIndex].charAt(charIndex);
                charIndex++;
               audio.play(); 
              
                setTimeout(EtypeWriter, speed);
            } else {
                document.getElementById('typingEffect').innerHTML += '<br>';
                lineIndex++;
                charIndex = 0;
				  audio.play(); // Play the audio
                setTimeout(EtypeWriter, speed);
            }
        }
    }
	
    document.getElementById('AstartButton').addEventListener('click', function() {
        // Hide the button after clicking
        this.style.display = 'none';
		document.getElementById('EstartButton').style.display = 'none';
        AtypeWriter();
    });
	
	 document.getElementById('EstartButton').addEventListener('click', function() {
        // Hide the button after clicking
        this.style.display = 'none';
		document.getElementById('AstartButton').style.display = 'none';
        EtypeWriter();
    });

	
});

 document.getElementById('IndexButton').addEventListener('click', function() {
	//	playButtonSound('conButtonSound');
		window.location.href = 'index.html';
});
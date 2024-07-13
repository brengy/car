document.addEventListener('DOMContentLoaded', function() {
    let Atext = [];
    let Etext = [];
    let Aimages = [];
    let Eimages = [];
    let lineIndex = 0;
    const delay = 100; // Delay between lines in milliseconds

    // Create and configure the audio element
    const audio = new Audio('typing.mp3'); // Replace with the path to your audio file
    audio.volume = 1; // Adjust volume if needed

    async function fetchTextFromSheet() {
        const apiKey = 'AIzaSyBh82Bqe-FfnZdzjGSVwmrpdKiURhhHaZ4'; // Replace with your Google Sheets API key
        const sheetId = '1Vn9sSmLbbMvZ9lJO1HxhuU4v1Sjs7Hs7jOlZT2c-9ms'; // Replace with your Google Sheet ID
        const range = 'Sheet2!A1:C'; // Adjust the range according to your needs

        try {
            const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(`Error fetching data: ${data.error.message}`);
            }

            // Extract Arabic and English text and images, and filter out headers
            data.values.slice(1).forEach(row => {
                if (row[0]) Atext.push(row[0]);
                if (row[1]) Etext.push(row[1]);
                if (row[2]) {
                    Aimages.push(row[2]);
                    Eimages.push(row[2]);
                }
            });

            console.log('Atext:', Atext);
            console.log('Etext:', Etext);
            console.log('Aimages:', Aimages);
            console.log('Eimages:', Eimages);

        } catch (error) {
            console.error('Error fetching text and images:', error);
        }
    }

    function displayText(textArray, imagesArray, elementId) {
        if (lineIndex < textArray.length) {
            const typingEffectElement = document.getElementById(elementId);
            typingEffectElement.innerHTML += textArray[lineIndex] + '<br>';
            displayImage(imagesArray[lineIndex]);
            lineIndex++;
            audio.play();
            setTimeout(() => displayText(textArray, imagesArray, elementId), delay);
        }
    }

    function displayImage(url) {
        if (url) {
            const imageContainer = document.getElementById('imageContainer');
            if (imageContainer) {
                const img = document.createElement('img');
                img.src = url;
                img.alt = 'Image from sheet';
                img.style.maxWidth = '200px';
                img.style.margin = '10px';
                imageContainer.appendChild(img);
            } else {
                console.error('Image container element not found.');
            }
        }
    }

    document.getElementById('AstartButton').addEventListener('click', function() {
        // Hide the button after clicking
        this.style.display = 'none';
        document.getElementById('EstartButton').style.display = 'none';
        lineIndex = 0; // Reset line index
        displayText(Atext, Aimages, 'typingEffect');
    });

    document.getElementById('EstartButton').addEventListener('click', function() {
        // Hide the button after clicking
        this.style.display = 'none';
        document.getElementById('AstartButton').style.display = 'none';
        lineIndex = 0; // Reset line index
        displayText(Etext, Eimages, 'typingEffect');
    });

    document.getElementById('IndexButton').addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    fetchTextFromSheet().then(() => {
        console.log('Text and images fetched successfully.');
    }).catch(error => {
        console.error('Error fetching text and images:', error);
    });
});

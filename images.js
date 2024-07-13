document.addEventListener('DOMContentLoaded', function() {
    let Eimages = [];

    async function fetchImagesFromSheet() {
        const apiKey = 'AIzaSyBh82Bqe-FfnZdzjGSVwmrpdKiURhhHaZ4'; // Replace with your Google Sheets API key
        const sheetId = '1Vn9sSmLbbMvZ9lJO1HxhuU4v1Sjs7Hs7jOlZT2c-9ms'; // Replace with your Google Sheet ID
        const range = 'Images!A1:C'; // Adjust the range according to your needs

        try {
            const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(`Error fetching data: ${data.error.message}`);
            }

            // Extract English images, and filter out headers
            data.values.slice(1).forEach(row => {
                if (row[2]) Eimages.push(row[2]);
            });

            console.log('Eimages:', Eimages);

        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }

    function displayImages(imagesArray, elementId) {
        const imageContainer = document.getElementById(elementId);
        imagesArray.forEach(url => {
            if (url) {
                const img = document.createElement('img');
                img.src = url;
                img.alt = 'Image from sheet';
                imageContainer.appendChild(img);
            }
        });
    }

    fetchImagesFromSheet().then(() => {
        console.log('Images fetched successfully.');
        displayImages(Eimages, 'imageContainer');
    }).catch(error => {
        console.error('Error fetching images:', error);
    });
});

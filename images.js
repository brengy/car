document.addEventListener('DOMContentLoaded', function() {
    let images = [];
    const apiKey = 'AIzaSyBh82Bqe-FfnZdzjGSVwmrpdKiURhhHaZ4'; // Replace with your Google Sheets API key
    const sheetId = '1Vn9sSmLbbMvZ9lJO1HxhuU4v1Sjs7Hs7jOlZT2c-9ms'; // Replace with your Google Sheet ID
    const range = 'Images!C1:C'; // Adjust the range according to your needs

    async function fetchImagesFromSheet() {
        try {
            const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(`Error fetching data: ${data.error.message}`);
            }

            images = data.values.slice(1).flat(); // Remove headers and flatten the array
            displayImages(images);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }

    function displayImages(imagesArray) {
        const imageContainer = document.getElementById('imageContainer');
        imagesArray.forEach(url => {
            if (url) {
                const img = document.createElement('img');
                img.src = url;
                img.alt = 'Image from sheet';
                img.onclick = () => openModal(url);
                imageContainer.appendChild(img);
            }
        });
    }

    function openModal(src) {
        const modal = document.getElementById('modal');
        const modalImage = document.getElementById('modalImage');
        modal.style.display = 'block';
        modalImage.src = src;
    }

    function closeModal() {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
    }

    document.getElementById('closeModal').onclick = closeModal;

    fetchImagesFromSheet();
});

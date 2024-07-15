document.addEventListener('DOMContentLoaded', function() {
    let content = [];
    const apiKey = 'AIzaSyBh82Bqe-FfnZdzjGSVwmrpdKiURhhHaZ4'; // Replace with your Google Sheets API key
    const sheetId = '1Vn9sSmLbbMvZ9lJO1HxhuU4v1Sjs7Hs7jOlZT2c-9ms'; // Replace with your Google Sheet ID
    const range = 'Images!C1:C'; // Adjust the range according to your needs

    async function fetchContentFromSheet() {
        try {
            const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(`Error fetching data: ${data.error.message}`);
            }

            content = data.values.slice(1).flat(); // Remove headers and flatten the array
            displayContent(content);
        } catch (error) {
            console.error('Error fetching content:', error);
        }
    }

    function displayContent(contentArray) {
        const contentContainer = document.getElementById('contentContainer');
        contentArray.forEach(url => {
            if (url) {
                if (url.endsWith('.mp4')) {
                    createVideoElement(url);
                } else {
                    createImageElement(url);
                }
            }
        });
    }

    function createImageElement(src) {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Image from sheet';
        img.onclick = () => openModal(src, 'image');
        document.getElementById('contentContainer').appendChild(img);
    }

    function createVideoElement(src) {
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.onclick = () => openModal(src, 'video');
        document.getElementById('contentContainer').appendChild(video);
    }

    function openModal(src, type) {
        const modal = document.getElementById('modal');
        const modalImage = document.getElementById('modalImage');
        const modalVideo = document.getElementById('modalVideo');
        modal.style.display = 'block';
        if (type === 'image') {
            modalImage.style.display = 'block';
            modalVideo.style.display = 'none';
            modalImage.src = src;
        } else if (type === 'video') {
            modalVideo.style.display = 'block';
            modalImage.style.display = 'none';
            modalVideo.src = src;
        }
    }

    function closeModal() {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
        document.getElementById('modalImage').src = '';
        document.getElementById('modalVideo').src = '';
    }

    document.getElementById('closeModal').onclick = closeModal;

    fetchContentFromSheet();
});

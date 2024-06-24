document.addEventListener('DOMContentLoaded', function () {
    const keyForm = document.getElementById('keyForm');
    const keyInput = document.getElementById('keyInput');
    const statusMessage = document.getElementById('statusMessage');
    const sheetId = '1Vn9sSmLbbMvZ9lJO1HxhuU4v1Sjs7Hs7jOlZT2c-9ms';
    const apiKey = 'AIzaSyBh82Bqe-FfnZdzjGSVwmrpdKiURhhHaZ4';

    // Fetch the valid password keys from the Google Sheets
    async function fetchPasswordKeys() {
        try {
            const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`);
            const data = await response.json();
            return data.values.flat();
        } catch (error) {
            console.error('Error fetching password keys:', error);
            return [];
        }
    }

    // Function to save the key to localStorage
    function saveKey(key) {
        localStorage.setItem('mqttKey', key);
    }

    // Function to validate the key
    async function validateKey(key) {
        const validPasswordKeys = await fetchPasswordKeys();
        return validPasswordKeys.includes(key);
    }

    // Event listener for form submission
    keyForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const key = keyInput.value;

        if (await validateKey(key)) {
            saveKey(key);
            statusMessage.textContent = 'Key saved successfully!';
            statusMessage.style.color = 'green';
			  window.location.href = 'main.html';
        } else {
            statusMessage.textContent = 'Invalid key!';
            statusMessage.style.color = 'red';
        }
    });
});

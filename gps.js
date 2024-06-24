// Function to get the key from localStorage
function getKey() {
    return localStorage.getItem('mqttKey');
}

// Function to send MQTT message
function sendMqttMessage(topic, message) {
    client.publish(topic, message, function (err) {
        if (!err) {
            console.log('Message sent: ', message);
        } else {
            console.error('Failed to send message: ', err);
        }
    });
}

var ali = '';

document.getElementById('gpsButton').addEventListener('click', function() {
    const action = 'gps';
    const key = getKey(); // Fetch the key from localStorage
    sendMqttMessage(key, action); // Use the key as the topic

    var gpsLabel = document.getElementById('gpsLabel');
    gpsLabel.textContent = 'Location: ';
	
});

var gkey = ' ';

// Connect to the MQTT broker
const client = mqtt.connect('wss://mqtt-dashboard.com:8884/mqtt');

client.on('connect', function () {
    console.log('Connected to MQTT broker');
    const gkey = getKey(); // Fetch the key from localStorage
    client.subscribe(gkey, function (err) {
        if (!err) {
        //    console.log('Subscribed to topic: ', key);
        } else {
            console.error('Failed to subscribe to topic: ', err);
        }
    });
});

client.on('message', function (topic, message) {
    const msg = message.toString();
	if (topic == gkey) { gpsLabel.textContent = msg; }
	
});

function displayMessage(topic, msg) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = `<strong>${topic}:</strong> ${msg}`;
    messagesDiv.appendChild(messageElement);
}

document.getElementById('mainButton').addEventListener('click', function() {
    window.location.href = 'main.html';
});

document.getElementById('monitorButton').addEventListener('click', function() {
    window.location.href = 'monitor.html';
});

document.getElementById('gpsButton').addEventListener('click', function() {
    window.location.href = 'gps.html';
});

document.getElementById('networkButton').addEventListener('click', function() {
    window.location.href = 'network.html';
});

document.getElementById('aboutButton').addEventListener('click', function() {
    window.location.href = 'about.html';
});

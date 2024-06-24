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


var vkey = ' ';
var tkey = ' ';


document.getElementById('voltButton').addEventListener('click', function() {
   
	const action = 'volt';
    const key = getKey(); 
    sendMqttMessage(key, action); // Use the key as the topic

    var voltLabel = document.getElementById('voltLabel');
    voltLabel.textContent = 'Voltage: ' +  'V';
	
});

document.getElementById('tempButton').addEventListener('click', function() {
   
   const action = 'temp';
    const key = getKey(); // Fetch the key from localStorage
    sendMqttMessage(key, action); // Use the key as the topic

    var tempLabel = document.getElementById('tempLabel');
    tempLabel.textContent = 'Temperature: ' + '°C';
	
});

// Connect to the MQTT broker
const client = mqtt.connect('wss://mqtt-dashboard.com:8884/mqtt');

client.on('connect', function () {
    console.log('Connected to MQTT broker');
   

    vkey = getKey() + '/voltresp'; 
   client.subscribe(vkey, function (err) {
   if (!err) {} else { console.error('Failed to subscribe to topic: ', err); }	
    });

    tkey = getKey() + '/tempresp'; 
   client.subscribe(tkey, function (err) {
   if (!err) {} else { console.error('Failed to subscribe to topic: ', err); }	
    });	
	
});

client.on('message', function (topic, message) {
    // Message is a Buffer, so convert it to string
    const msg = message.toString();
   // console.log('Received message:', msg);
 //   displayMessage(topic, msg);
	if (topic == tkey) {
	tempLabel.textContent = msg +  ' T';
	}
	else if (topic == vkey) {
	voltLabel.textContent = msg +  ' V'; 
	}
});

function displayMessage(topic, msg) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = `<strong>${topic}:</strong> ${msg}`;
    messagesDiv.appendChild(messageElement);
}

window.onload = function() {
    document.getElementById('voltPanel').classList.add('move-left');
    document.getElementById('tempPanel').classList.add('move-right');
};

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

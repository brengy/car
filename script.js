
document.addEventListener("DOMContentLoaded", function () {
    // Function to toggle panels
    function togglePanels(panelClassToShow, panelClassesToHide) {
        var panelsToShow = document.querySelectorAll(panelClassToShow);
        var panelsToHide = document.querySelectorAll(panelClassesToHide);
        
        panelsToHide.forEach(function(panel) {
            panel.style.display = 'none';
        });
        
        panelsToShow.forEach(function(panel) {
            panel.style.display = 'flex';
        });
    }

    // Function to get the key from local storage
    function getKey() {
        return localStorage.getItem("mqttKey");
    }

 /*   // Function to set the value of the action textbox
    function setActionText(action) {
        const key = getKey();
        document.getElementById('actionTextBox').value = key ? `${key} - ${action}` : action;
    }
*/
    var ali = '';
  
  // Event listeners for button clicks
    document.querySelectorAll('.equal-button').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.innerText.replace(' ', '').toLowerCase();
            const key = getKey(); // Fetch the key from local storage
           // setActionText(action);
			ali = 'hh';
            if (key) {
                sendMqttMessage(key, action); // Here we use the key as the topic
				 playSound();
            } else {
                alert("No key found. Please set the key in the network settings.");
            }
        });
    });

    document.getElementById('motorButton').addEventListener('click', function() {
        togglePanels('.panel-2', '.panel-1, .panel-3');
    });

    document.getElementById('safetyButton').addEventListener('click', function() {
        togglePanels('.panel-3', '.panel-1, .panel-2');
    });

    document.getElementById('tableauButton').addEventListener('click', function() {
        togglePanels('.panel-1', '.panel-2, .panel-3');
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

    // MQTT setup
    const client = mqtt.connect('wss://mqtt-dashboard.com:8884/mqtt');

   
    function sendMqttMessage(topic, message) {
        client.publish(topic, message, function (err) {
            if (err) {
                console.error('MQTT publish error:', err);
            } else {
                console.log('MQTT message sent:', message);
            }
        });
    }
	
	
	const buttonSound = document.getElementById('buttonSound');

	function playSound() {
    buttonSound.currentTime = 0; // Rewind to the start
    buttonSound.play();
}

	
});

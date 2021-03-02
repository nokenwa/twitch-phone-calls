// use ws:// if you are testing using your localhost
const websocket = new WebSocket(`wss://${window.location.host}`);

const notification = new Audio("/assets/notification.mp3")
const alert = document.getElementById('alert');

document.addEventListener("DOMContentLoaded", async () => {
	const response = await fetch('/token',{method: 'POST'});
	const data = await response.json();
	const device = new Twilio.Device(data.token);

	device.on("ready", (device) => {
		console.log("Browser Phone Device Operational");
	});

	device.on("incoming", (connection) => {
		console.log('incoming', connection);
		websocket.send(JSON.stringify({ message: 'incomingCall' }))

		alert.classList.add('visible')
		websocket.addEventListener("message", (event) => {
			const data = JSON.parse(event.data);
			switch (data.message) {
				case "answer":
					connection.accept();
					break;
				case "end":
					connection.reject();
					console.log('REJECT CALL');
					alert.classList.remove('visible');
					break;
				default:
					break;
			}
		});
	});

	device.on("connect", (connection) => {
		console.log('connect', connection);
		websocket.send(JSON.stringify({ message: 'incomingCall' }))
	
		websocket.addEventListener("message", (event) => {
			const data = JSON.parse(event.data);
			switch (data.message) {
				case "end":
					connection.disconnect();
					console.log('DISCONNECT CALL');
					alert.classlist.remove('visible');
					break;
				default:
					break;
			}
		});
	});
});

// UNCOMMENT IF YOU NEED TO PREVENT YOUR SERVER FROM SHUTTING DOWN DUE TO LACK OF REQUESTS
// E.G. KEEPING HEROKU DYNO'S ALLIVE **BE CAREFUL, THIS COULD LEAD TO A BIGGER BILL**
//stayalive = setInterval( ()=>{fetch('/stay-alive');} , 50000);

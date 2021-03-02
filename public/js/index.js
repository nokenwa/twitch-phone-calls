// use ws:// if you are testing using your localhost
const websocket = new WebSocket(`wss://${window.location.host}`);

const notification = new Audio("/assets/notification.mp3")
const alert = document.getElementById('alert');
const callInfo = document.getElementById('call-info')

document.addEventListener("DOMContentLoaded", async () => {
	const response = await fetch('/token',{method: 'POST'});
	const data = await response.json();
	const device = new Twilio.Device(data.token);
	let activeConnection;

	device.on("ready", (device) => {
		console.log("Browser Phone Device Operational");
	});

	device.on("incoming", (connection) => {
		console.log('incoming', connection);
		activeConnection = connection;
		websocket.send(JSON.stringify({ message: 'incomingCall' }))
		callInfo.innerText = "Incoming Phone Call..."
		alert.classList.add('visible')
	});

	device.on("connect", (connection) => {
		console.log('connect', connection);
		callInfo.innerText = "Phone Call Connected.."
	});

	device.on("disconnect", (connection) => {
		console.log('disconnect', connection);
		callInfo.innerText = "Call Ended";
		alert.classList.remove('visible');
	})

	websocket.addEventListener("message", (event) => {
		const data = JSON.parse(event.data);
		switch (data.message) {
			case "answer":
				if (activeConnection.status() === 'pending') {
					activeConnection.accept();
				}
				break;
			case "end":
				if (activeConnection.status() === 'pending') {
					activeConnection.reject();
				} else activeConnection.disconnect();
				
				break;
			default:
				break;
		}
	});


});

// UNCOMMENT IF YOU NEED TO PREVENT YOUR SERVER FROM SHUTTING DOWN DUE TO LACK OF REQUESTS
// E.G. KEEPING HEROKU DYNO'S ALLIVE **BE CAREFUL, THIS COULD LEAD TO A BIGGER BILL**
//stayalive = setInterval( ()=>{fetch('/stay-alive');} , 50000);

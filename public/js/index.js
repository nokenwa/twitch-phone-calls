const websocket = new WebSocket(`wss://${window.location.hostname}`);
const notification = new Audio("notification.mp3")
const alert = document.getElementById('alert');

document.addEventListener("DOMContentLoaded", async () => {
	const response = await fetch(
		"TWILIO FUNCTION URL GOES HERE /generate-voice-token"
	);
	const data = await response.json();
	const device = new Twilio.Device(data.token);

	device.on("ready", (device) => {
		console.log("Browser Phone Device Operational");
	});

	websocket.addEventListener("message", (event) => {
		const data = JSON.parse(event.data);
		switch (data.message) {
			case "answer":
				device.connect();
				break;
			case "end":
				device.activeConnection().disconnect();
				break;
			case "queueMembers":
				console.log("Queue Updateed")
				if (data.payload.length > 0) {
					notification.play();
					alert.classList.add("visible");
					const callerId = document.getElementById('callerId');
					callerId.innerText = data.payload[0].username;
				} else if (data.payload.length == 0) {
					alert.classList.remove("visible")
				}
			default:
				break;
		}
	});
});

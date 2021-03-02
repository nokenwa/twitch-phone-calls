const answer = document.getElementById("answerButton");
const end = document.getElementById("endButton");
const queue = document.getElementById("queue");
const notification = new Audio("/assets/notification.mp3")


// use ws:// if you are testing using your localhost
const websocket = new WebSocket(`wss://${window.location.host}`);

websocket.onmessage = (event) => {
	const data = JSON.parse(event.data);
	console.log('websockeet:', data);

	switch (data.message) {
		case "incomingCall":
			answer.style.backgroundColor = "green";
			break;
		default:
			break;
	}
};

answer.addEventListener("click", () => {
	websocket.send(JSON.stringify({ message: "answer" }));
	answer.style.backgroundColor = "";
});

end.addEventListener("click", () => {
	websocket.send(JSON.stringify({ message: "end" }));
	answer.style.backgroundColor = "";
});

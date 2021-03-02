const answer = document.getElementById("answerButton");
const end = document.getElementById("endButton");
const queue = document.getElementById("queue");
const notification = new Audio("notification.mp3")

const websocket = new WebSocket(`ws://${window.location.host}`);

websocket.onmessage = (event) => {
	const data = JSON.parse(event.data);

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

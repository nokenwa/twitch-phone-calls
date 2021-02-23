const answer = document.getElementById("answerButton");
const end = document.getElementById("endButton");
const queue = document.getElementById("queue");
const notification = new Audio("notification.mp3")

const websocket = new WebSocket(`wss://${window.location.hostname}`);

websocket.onmessage = (event) => {
	const data = JSON.parse(event.data);

	switch (data.message) {
		case "incomingCall":
			answer.style.backgroundColor = "green";
			break;

		case "queueMembers":
			updateQueue(data.payload);
			break;
		default:
			break;
	}
};

answer.addEventListener("click", () => {
	websocket.send(JSON.stringify({ message: "answer" }));
	answer.style.backgroundColor = "gray";
});

end.addEventListener("click", () => {
	websocket.send(JSON.stringify({ message: "end" }));
	answer.style.backgroundColor = "gray";
});

updateQueue = function (members) {
	queue.innerHTML = "";
	
	members.length > 0 ? notification.play() : null;

	members.forEach((member) => {
		const caller = document.createElement("li");
		const text = document.createTextNode(
			`Phone Call waiting... ${member.username}`
		);

		caller.appendChild(text);
		queue.appendChild(caller);

		const kickOut = document.createElement("button");
		kickOut.innerText = "Kick out";
		kickOut.onclick = async function (event) {
			const caller = member.callSid;
			fetch("/kick", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					caller,
				}),
			});
		};

		const blockButton = document.createElement("button");
		blockButton.innerText = "Add to block list";
		blockButton.onclick = async function () {
			const caller = member;
			console.log(member);
			fetch("/block", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(caller),
			});
		};

		queue.appendChild(kickOut);
		queue.appendChild(blockButton);
	});
};

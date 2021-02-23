require('dotenv').config();

//Setup Express HTTP Server alongside Websocket Server
const express = require('express');
const ws = require('ws');
const app = express();
const server = require('http').createServer(app);
const wss = new ws.Server({ server });
const PORT = process.env.PORT;

//Express Middleware
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile("/public/index.html", {root: __dirname});
});

app.get("/dialpad", (req, res) => {
	res.sendFile("/public/dialpad.html", {root: __dirname});
});

wss.on("connection", (ws) => {
	ws.on("message", (message) => {
		wss.clients.forEach((client) => {
			client.send(message);
		});
	});
});


server.listen(PORT, () => console.log(`App is listening at ${PORT}`))

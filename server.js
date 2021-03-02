require('dotenv').config();

//Setup Express HTTP Server alongside Websocket Server
const express = require('express');
const ws = require('ws');
const app = express();
const server = require('http').createServer(app);
const wss = new ws.Server({ server });
const PORT = process.env.PORT;
const axios = require('axios');
const Twilio = require('twilio')

//Express Middleware
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile("/public/index.html", {root: __dirname});
});

app.get("/dialpad", (req, res) => {
	res.sendFile("/public/dialpad.html", {root: __dirname});
});

app.post('/stay-alive', (req, res) => {
    res.send(`I'm alive`)
})

//WEBSOCKETS

wss.on("connection", (ws) => {
	console.log('connection made')
	ws.on("message", (message) => {
		wss.clients.forEach((client) => {
			client.send(message);
		});
	});
});

//FOR TWILIO

const VoiceResponse = require('twilio').twiml.VoiceResponse;
app.post('/twilio', (req, res) => {
	res.contentType('xml');
	const twiml = new VoiceResponse();
	twiml.say('Connecting')
	const dial = twiml.dial();
	dial.client('twitch_overlay')
	res.send(twiml.toString());
})

app.post('/token', async (req, res) => {
	const Identity = process.env.IDENTITY;
	const AccessToken = Twilio.jwt.AccessToken;
	const VoiceGrant = AccessToken.VoiceGrant;

	const accessToken = new AccessToken(process.env.TWILIO_ACCOUNT_SID, process.env.API_KEY, process.env.API_SECRET);
	accessToken.identity = Identity;
	const grant = new VoiceGrant({
		incomingAllow: true,
	});
	accessToken.addGrant(grant);
	res.send({
		identity: Identity,
		token: accessToken.toJwt(),
	})
})


server.listen(PORT, () => console.log(`App is listening at ${PORT}`))

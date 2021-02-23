exports.handler = function (context, event, callback) {

	const twiml = new Twilio.twiml.VoiceResponse();
	const dial = twiml.dial();
	dial.client('twitch');
	return callback(null, twiml);
};

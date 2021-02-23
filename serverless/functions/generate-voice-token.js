/**
 *  Voice Token
 *
 *  This Function shows you how to mint Access Tokens for Twilio Voice Client. Please note, this is for prototyping purposes
 *  only. You will want to validate the identity of clients requesting Access Token in most production applications and set
 *  the identity when minting the Token.
 */

exports.handler = function (context, event, callback) {

	const Identity = 'twitch';
	const AccessToken = Twilio.jwt.AccessToken;
	const VoiceGrant = AccessToken.VoiceGrant;

	const accessToken = new AccessToken(context.ACCOUNT_SID, context.API_KEY, context.API_SECRET);

	accessToken.identity = Identity;

	const grant = new VoiceGrant({
		incomingAllow: true,
	});
	accessToken.addGrant(grant);

	const response = new Twilio.Response();

	response.appendHeader("Access-Control-Allow-Origin", "*");
	response.appendHeader("Access-Control-Allow-Methods", "GET");
	response.appendHeader("Access-Control-Allow-Headers", "Content-Type");

	response.appendHeader("Content-Type", "application/json");
	response.setBody({
		identity: Identity,
		token: accessToken.toJwt(),
	});
	callback(null, response);
};

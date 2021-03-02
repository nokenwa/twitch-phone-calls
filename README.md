# twitch-phone-calls
This repo shows you how to take Phone Calls on Twitch


## Setup

Requirements:

1. [Node](https://nodejs.org/en/download/) version 10.19.0 or later (check version in your terminal with `node -v`).
1. A [Twilio account](https://www.twilio.com/try-twilio).
1. A [Twilio Number](https://www.twilio.com/console/phone-numbers/search)
1. A Twilio API Key & Secret [Create an API Key & Secret in the Console](https://www.twilio.com/console/project/api-keys).
1. The Twilio CLI. [Install the CLI for your operating system](https://www.twilio.com/docs/twilio-cli/quickstart#install-twilio-cli) and login with your Twilio account credentials using twilio login.
1. [NGROK](https://ngrok.com/) installed (For local testing)

After cloning this repository, install dependencies with `npm`:
```
npm install
```

### Gather your Credentials
Copy and rename the .env config example and fill in the `ACCOUNT_SID`,`API_KEY`, and `API_SECRET`
cp serverless/.env.sample .env

### Start the Project
```
npm start
```
### Use NGROK to tunnel your localhost for Twilio
```
ngrok http 3000
```

### Update your Twilio Number to point to your ngrok url
```
twilio phone-numbers:update [YOUR_NUMBER_HERE] --voice-url  https://xxxxxxxx.ngrok.io/twilio
```

### Add Overlay to OBS
Start OBS from Command Line with flag 'enable-media-stream'

Windows cmd:
```C:\Program Files\obs-studio\bin\64bit>obs64.exe --enable-media-stream```

macOS terminal:
```/Applications/OBS.app/Contents/MacOS/OBS --enable-media-stream```

Create a new browser source and give it your ngrok url. Set the width and height to equal your streaming resolution.

###
Open a new browser window and navigate to your https://[[your-url]/dialpad

Give your Twilio number a call. You should hear the phone ringing on OBS. Answer it from the control page and start talking!! 


## TO DO
- [ ]...

## Code of Conduct

This project adheres to the [Twilio Labs Code of Conduct](https://github.com/twilio-labs/.github/blob/master/CODE_OF_CONDUCT.md).

## Contributing

This project welcomes contributions. Please check out our [contributing guide](CONTRIBUTING.md) to learn more on how to get started.
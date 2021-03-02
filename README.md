# twitch-phone-calls
This repo shows you how to take Phone Calls on Twitch


## Setup

Requirements:

1. [Node](https://nodejs.org/en/download/) version 10.19.0 or later (check version in your terminal with `node -v`).
1. A [Twilio account](https://www.twilio.com/try-twilio).
1. A Twilio API Key & Secret [Create an API Key & Secret in the Console](https://www.twilio.com/console/project/api-keys).
1. The Twilio CLI. [Install the CLI for your operating system](https://www.twilio.com/docs/twilio-cli/quickstart#install-twilio-cli) and login with your Flex account credentials using twilio login.
1. The Twilio serverless plugin. Install from the command line with `twilio plugins:install @twilio-labs/plugin-serverless`. More details in the [docs](https://www.twilio.com/docs/labs/serverless-toolkit/getting-started).

After cloning this repository, install dependencies with `npm`:
```
npm install
```

### Deploy verification serverless functions
Copy the serverless config example and fill in the `ACCOUNT_SID`, `AUTH_TOKEN`,`API_KEY`, and `API_SECRET` :
```
cp serverless/.env.serverless.example serverless/.env
```
Deploy the functions with the Twilio CLI:
```
twilio serverless:deploy
```
Save the function URLs that display with the deployment details

Copy the.env.example in the project root to .env:

```
# in the project root
cp .env.example .env
```
Update the TWILIO_FUNCTION_DOMAIN to be your new function url.
```
TWILIO_FUNCTION_DOMAIN="http://twitch-overlay-1234-dev.twil.io"
```

### 


## TO DO
- [ ]...

## Code of Conduct

This project adheres to the [Twilio Labs Code of Conduct](https://github.com/twilio-labs/.github/blob/master/CODE_OF_CONDUCT.md).

## Contributing

This project welcomes contributions. Please check out our [contributing guide](CONTRIBUTING.md) to learn more on how to get started.
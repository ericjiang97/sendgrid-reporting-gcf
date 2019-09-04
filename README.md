# SendGrid Reporting GCF
Sendgrid Webhook GCF Reporting Mechanism - reports delivery issues 

## Development
To develop on this you will need to have the following
- [Google Cloud SDK](https://cloud.google.com/sdk/)
- [NodeJS](https://nodejs.org) 10 (minimum)

To install dependencies locally simply run `npm install` or if you use Yarn `yarn`.

## Environment Variables
Create a `.env` file for local development and `.env.yaml` file for GCLOUD.

You will need the following:
```yaml
SLACK_REQUEST_URI= #insert slack request URI here
TIMEZONE= #defaults to Australia/Melbourne (in config.js)
```
## Slack Integration
To integrate into Slack, we use an App Webhook.

![](/images/slack_message.png)

# LICENSE

This repo is licensed under `MIT` see [LICENSE](./LICENSE) for more information

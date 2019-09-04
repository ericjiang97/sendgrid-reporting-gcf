require("dotenv").config();
const fetch = require("node-fetch"),
  moment = require("moment-timezone");

const config = require("./config"),
  { SENDGRID_STATUSES, SENDGRID_ERROR_STATUSES } = require("./constants");

const timezone = process.env.TIMEZONE || config.TIMEZONE;

async function processArray(array) {
  array.forEach(async email => {
    if (email.event === SENDGRID_STATUSES.PROCESSED) {
      // email processed by sendgrid
    }
    if (email.event === SENDGRID_STATUSES.DELIVERED) {
      // email sent by sendgrid
    }
    if (SENDGRID_ERROR_STATUSES.includes(email.event)) {
      const SLACK_MESSAGE = [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text:
              "An New Error was reported through: *<https://app.sendgrid.com|SendGrid>*"
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Target Email:*\n${email.email}`
            },
            {
              type: "mrkdwn",
              text: `*Event Status*\n${email.event}`
            },
            {
              type: "mrkdwn",
              text: `*Reported Time:*\n${moment()
                .tz(timezone)
                .format("DD/MM/YYYY hh:mm a")}`
            },
            {
              type: "mrkdwn",
              text: `*SG Message Id:*\n${email.sg_message_id}`
            }
          ]
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Reason*:\n${email.reason}`
          }
        },
        {
          type: "divider"
        }
      ];
      const body = JSON.stringify({
        blocks: SLACK_MESSAGE,
        text: `SendGrid Error Report | *Target Email:* ${email.email} | *Event Status* ${email.event}`
      });
      await fetch(process.env.SLACK_REQUEST_URI, {
        method: "POST",
        body
      });
    }
  });
  console.log("Done!");
}

exports.sendgrid = async (req, res) => {
  const statusMessage = req.body;
  console.log(JSON.stringify(statusMessage));
  await processArray(req.body);

  res.send("OK");
};

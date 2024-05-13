require('dotenv').config()
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

const notification = async (req, res) => {

    // console.log(req.body)

    const name      = req.body.name;
    const amount    = req.body.amount;
    const date      = req.body.date;
    const type      = req.body.type;
    const comment   = req.body.comment;

    const message = `${name} has requested a cashout for $${amount} via ${type}. Request date: ${date}. Cashout request Comment: ${comment}.`
    const config = {
        region: 'us-east-1',
    }

    const client = new SNSClient(config);
    
    const input = {
        TargetArn: process.env.AWS_SNS_TARGET_ARN,
        Message: message,
    }
    
    const command = new PublishCommand(input);

    try {
        const data = await client.send(command);
        console.log('cashout request notification sent successfully')
      } catch (error) {
        // error handling.
        console.log(error)
      }

}

module.exports = notification;




require('dotenv').config();
const AWS       = require('aws-sdk');
const { eventNames } = require('../model/Activelisting');
// var ses         = new aws.SES({ region: "us-east-1" });

const SES_CONFIG = {
    region            : "us-east-1",
    accessKeyId       : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey   : process.env.AWS_SECRET_ACCESS_KEY
};

const AWS_SES = new AWS.SES(SES_CONFIG);

const sendMessage = async (req, res) => {

    const name = req.body.name;
    const sender = req.body.sender;
    const message = req.body.message;
    
    try {

        var params = {
            Destination: {
              ToAddresses: ['dandpconsignments@gmail.com']
            },
            Message: {
              Body: {
                Text: { Data: "Message from: " + name + "," + sender + "\n  Message: \n" + message }
              },
        
              Subject: { Data: 'D&P Consignment Message From: ' + name + ', ' + sender}
            },
            Source: "dandpconsignments@gmail.com"
          };
        
          return AWS_SES.sendEmail(params).promise() 
            .then(() => {
                res.status(200).json('message was sent');
            }) 

    } catch(err) {
        res.status(500).json(err);
    }
    
}

module.exports = sendMessage;


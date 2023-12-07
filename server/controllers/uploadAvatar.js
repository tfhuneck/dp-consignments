require('dotenv').config();
const util          = require('util');
const aws           = require('aws-sdk');
const crypto        = require('crypto');
const randomBytes   = util.promisify(crypto.randomBytes);

require('aws-sdk/lib/maintenance_mode_message').suppress = true;

const region            = "us-east-1";
const bucketName        = "dandpconsignments-avatar-images";
const accessKeyId       = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey   = process.env.AWS_SECRET_ACCESS_KEY;


const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
});

const generateUploadUrl = async (req, res) => {
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')
    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })
  
    try{

        const uploadURL = await s3.getSignedUrlPromise('putObject', params)
        res.json(uploadURL);
    } catch(err){
        res.status(500).json(err);
    }
}

module.exports = generateUploadUrl;
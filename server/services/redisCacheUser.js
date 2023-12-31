const axios                 = require('axios');
const Redis                 = require('redis');
const User                  = require('../model/User');
const redisClient           = Redis.createClient({legacyMode: true});
const DEFAULT_EXPIRATION    = 3600
const serverUrl             = 'http://localhost:8080';

const cacheUserData = async (req, res, next) => {
    const userData      = req.userData
    const userId        =  userData.uid
        
    await redisClient.connect()

    redisClient.get('user', async (error, user) => {
        if (error) console.log(error)
        if (user != null) {
            console.log('Cache Hit')
            console.log('User Data sent')
            await redisClient.disconnect();
            return res.json(JSON.parse(user))
        } else{
            console.log('Cache Miss')
            await axios
                .get(serverUrl + '/updateuser', {
                    params: { userData }
                })
            const getUser   = await User.findOne({userid: userId}).exec(); 
            await redisClient.setex('user', DEFAULT_EXPIRATION, JSON.stringify(getUser))   
            console.log('Userinfo cached and sent');
            setTimeout(() => redisClient.disconnect(),50)
            res.json(getUser);
        }
    })
}

module.exports = cacheUserData;


const axios                 = require('axios');
const Redis                 = require('redis');
const User                  = require('../model/User');
const SoldItem              = require('../model/Solditem');
const redisClient           = Redis.createClient({legacyMode: true});
const DEFAULT_EXPIRATION    = 3600
const serverUrl             = 'http://localhost:8080';

const cacheUserData = async (req, res, next) => {
    const userData      = req.userData
    const userId        = userData.uid
    
    await redisClient.connect()

    redisClient.get('sold', async (error, sold) => {
        if (error) console.log(error)
        if (sold != null) {
            console.log('Cache Hit')
            console.log('Solt Items Data sent')
            await redisClient.disconnect();
            return res.json(JSON.parse(sold))
        } else{
            console.log('Cache Miss')
            await axios
                .get(serverUrl + '/updateuser', {
                    params: { userData }
                })
   
            const getUser       = await User.findOne({userid: userId}).exec(); 
            const soldData      = await SoldItem.find();
            const soldItems     = getUser.solditems;
            const filterSold    =  soldData.filter((i) => 
                soldItems.some(n => n.itemid === i.itemid));

            await redisClient.setex('sold', DEFAULT_EXPIRATION, JSON.stringify(filterSold))   
            console.log('Sold Items cached and sent');
            setTimeout(() => redisClient.disconnect(),50)
            res.json(filterSold);
        }
    })
}

module.exports = cacheUserData;


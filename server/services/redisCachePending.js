const axios                 = require('axios');
const Redis                 = require('redis');
const User                  = require('../model/User');
const PendingItem           = require('../model/Pendingitem');
const redisClient           = Redis.createClient({legacyMode: true});
const DEFAULT_EXPIRATION    = 3600
const serverUrl             = 'http://localhost:8080';

const cacheUserData = async (req, res, next) => {
    const userData      = req.userData
    const userId        = userData.uid
    
    await redisClient.connect()

    redisClient.get('pending', async (error, pending) => {
        if (error) console.log(error)
        if (pending != null) {
            console.log('Cache Hit')
            console.log('Pending Items Data sent')
            await redisClient.disconnect();
            return res.json(JSON.parse(pending))
        } else{
            console.log('Cache Miss')
            await axios
                .get(serverUrl + '/updateuser', {
                    params: { userData }
                })
   
            const getUser       = await User.findOne({userid: userId}).exec(); 
            const pendingData      = await PendingItem.find();
            const pendingItems     = getUser.pendingitems;
            const filterPending    =  pendingData.filter((i) => 
                pendingItems.some(n => n.itemid === i.itemid));

            await redisClient.setex('pending', DEFAULT_EXPIRATION, JSON.stringify(filterPending))   
            console.log('Pending Items cached and sent');
            setTimeout(() => redisClient.disconnect(),50)
            res.json(filterPending);
        }
    })
}

module.exports = cacheUserData;

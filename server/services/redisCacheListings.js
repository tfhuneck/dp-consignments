const axios                 = require('axios');
const Redis                 = require('redis');
const User                  = require('../model/User');
const Listing               = require ('../model/Activelisting');
const redisClient           = Redis.createClient({legacyMode: true});
const DEFAULT_EXPIRATION    = 3600
const serverUrl             = 'http://localhost:8080';

const cacheUserData = async (req, res, next) => {
    const userData      = req.userData
    const userId        = userData.uid
    
    await redisClient.connect()

    redisClient.get('listings', async (error, listings) => {
        if (error) console.log(error)
        if (listings != null) {
            console.log('Cache Hit')
            console.log('Active Listings Data sent')
            await redisClient.disconnect();
            return res.json(JSON.parse(listings))
        } else{
            console.log('Cache Miss')

            const getUser       = await User.findOne({userid: userId}).exec(); 
            const listingData   = await Listing.find();  
            const activeItems   = getUser.activeitems
            const filterListings  =  listingData.filter((i) => 
                   activeItems.some(n => n.itemid === i.itemid));
            console.log(filterListings)

            await redisClient.setex('listings', DEFAULT_EXPIRATION, JSON.stringify(filterListings))   
            console.log('Listings cached and sent');
            setTimeout(() => redisClient.disconnect(),50)
            res.json(filterListings);
        }
    })
}

module.exports = cacheUserData;


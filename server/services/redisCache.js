const axios                 = require('axios');
const Redis                 = require('redis');
const redisClient           = Redis.createClient({legacyMode: true});
const DEFAULT_EXPIRATION    = 3600
const serverUrl             = 'http://localhost:8080';

const cacheUserData = async (req, res, next) => {
    const userData = req.userData
    // req.userdata = userData;
    // console.log(userData);
    
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
                .then((res1) => {
                    // console.log(res);
                    return axios.get(serverUrl + '/collectall', {
                        params: { userData }
                    })
                    .then(async (res2) =>{
                        await redisClient.setex('user', DEFAULT_EXPIRATION, JSON.stringify(res2.data))   
                        console.log('Userinfo cached and sent');
                        setTimeout(() => redisClient.disconnect(),50)
                        return res.json(res2.data)
                    })
                })
            }
        })
}

module.exports = cacheUserData;


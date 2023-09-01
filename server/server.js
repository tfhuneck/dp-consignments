require('dotenv').config();
const express           = require('express');
const bodyParser        = require('body-parser')
const app               = express();
const cors              = require('cors');
const axios             = require('axios');
const cheerio           = require('cheerio');
const mongoose          = require('mongoose');
const connectDB         = require('./config/dbConn');
const ListingsModel      = require('./model/Activelisting');
const SoldModel         = require('./model/Solditem');
const UserModel         = require('./model/User');
const Redis             = require('redis');
const auth              = require('./middleware/auth');


// Connect to MongoDB
connectDB();

// cors policy
app.use(cors());

// Redis client
// const redisClient = Redis.createClient();
// const DEFAULT_EXPIRATION = 3600

// create application/json parser
var jsonParser = bodyParser.json({limit: "5mb"});
app.use(jsonParser);

// =====routes===== 
// ====== Routes to get and post Actie Listings to DB ======== 
app.use('/listings', require('./routes/activeListingsRoute'));
app.use('/sold', require('./routes/soldRoute'));
app.use('/soldimage', require('./routes/soldImageRoute'));
app.use('/create', require('./routes/createNewUserRoute'));
app.use('/updateuser', require('./routes/updateUserRoute'));
app.use('/getuser', require('./routes/getUserRoute'));
app.use('/user', require('./routes/redisCacheRoute'));
app.use('/collectall', require('./routes/collectAllRoute'))


// ========= Redis get data and Caching ===========
// app.get('/user', auth, async (req, res, next) => {
//     const userData = req.userData
//     console.log(userData);
//     await redisClient.connect();
//     redisClient.get('user', async (error, user) => {
//         if (error) console.log(error)
//         if (user != null) {
//             return res.json(JSON.parse(user))
//         } else{
//             await axios.get('/updateuser', {
//                 params: { userData }
//             });

//             await axios.get('/getuser', {
//                 params: { userData }
//             })
//             .then(async res => {
//                 console.log(res.data);
//             })
//             .catch(err => console.log(err));
//         }
//     })
// })


// Route to confirm server is running
app.get('/', (req, res) => {
    res.send('🔥🔥🔥🔥🔥 Consignment App Server Side running 🔥🔥🔥🔥🔥🔥');
  });

//===========Getting ebay images for listings=========
app.post('/getimage', jsonParser, (req, res) => {
    const url = req.body.imageUrl
    console.log(url)
    async function getImage(){
        await axios.get(url , {
            headers: {
              'Content-Type': null,
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              'Access-Control-Allow-Credentials':true,
            }
        })
        .then((response) => {
            const data = response.data;
            const $ = cheerio.load(data);
            const image = $('.ux-image-magnify__image--original').attr('src');
            console.log(image)
            res.send(image);
        })
    }
    getImage();
})

// =========Setting up Server om port 8080============
app.listen(8080, () => {
    console.log('🔥🔥🔥🔥🔥Running on port 8080! - http://localhost:8080🔥🔥🔥🔥🔥');
    mongoose.connection.once('open', () => console.log('🌱🌱🌱🌱🌱MongoDB ConnectDb ran Successfully🌱🌱🌱🌱🌱'));
    // mongoose.connect(connection).then(()=> console.log('MongoDB connected'));
});
require('dotenv').config();
const express           = require('express');
const bodyParser        = require('body-parser')
const app               = express();
const cors              = require('cors');
const axios             = require('axios');
const cheerio           = require('cheerio');
const mongoose          = require('mongoose');
const connectDB         = require('./config/dbConn');
const model             = require('./model/Activelisting');

// Connect to MongoDB
connectDB();

// cors policy
app.use(cors());

// create application/json parser
var jsonParser = bodyParser.json({limit: "5mb"});
app.use(jsonParser);

// ======= Get Listing Data ========
// app.get('/getlistings', async (req, res) => {
//     res.end(activeData)
//     // res.end(soldData)
// });

// ======= Get Active Data ========
// app.get('/getsold', async (req, res) => {
//     res.end(soldData)
//     // res.end(soldData)
// });

// routes 

// ====== Routes to get and post Actie Listings to DB ======== 
app.use('/listings', require('./routes/activeListingsroute'));


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
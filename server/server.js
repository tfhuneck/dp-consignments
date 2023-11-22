const express           = require('express');
const path              = require('path');
const bodyParser        = require('body-parser')
const app               = express();
const cors              = require('cors');
const axios             = require('axios');
const cheerio           = require('cheerio');
const mongoose          = require('mongoose');
const connectDB         = require('./config/dbConn');
const ListingsModel     = require('./model/Activelisting');
const SoldModel         = require('./model/Solditem');
const UserModel         = require('./model/User');
const RequestModel      = require('./model/Cashoutrequests')
const auth              = require('./middleware/auth');

// Config
require('dotenv').config();

// Enviroment Port
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// cors policy
app.use(cors());

// create application/json parser
var jsonParser = bodyParser.json({limit: "5mb"});
app.use(jsonParser);

// =====routes===== 
app.use('/listings', require('./routes/activeListingsRoute'));
app.use('/sold', require('./routes/soldRoute'));
app.use('/pending', require('./routes/pendingRoute'));
app.use('/soldimage', require('./routes/soldImageRoute'));
app.use('/create', require('./routes/createNewUserRoute'));
app.use('/updateuser', require('./routes/updateUserRoute'));
app.use('/getuser', require('./routes/getUserRoute'));
app.use('/update/user', require('./routes/UpdateUserSettingsRoute'));
app.use('/request', require('./routes/requestRoute'));

// ebay notification challenge code route
app.use('/ebaynotification', require('./routes/ebayNotificationRoute'))

// app.use('/user', require('./routes/redisCacheUserRoute'));
app.use('/user', require('./routes/getUserRoute')); // Route to get userData for user without Redis cache
// app.use('/user/listings', require('./routes/redisCacheListingsRoute'));
app.use('/user/listings', require('./routes/getUserActiveListingsRoute')); // Route to get user active listings for user without Redis cache
// app.use('/user/sold', require('./routes/redisCacheSoldRoute'));
app.use('/user/sold', require('./routes/getUserSoldListingsRoute')); // Route to get user sold listings without redis cache
// app.use('/user/pending', require('./routes/redisCachePendingRoute'));
app.use('/user/pending', require('./routes/getUserPendingListingsRoute'));  // Route to get user pending listings without redis cache
// app.use('/user/update/image', require('./routes/UserUpdateImageRoute'));

//  ebay OAuth authorization code grant flow
app.use('/ebayauth', require('./routes/ebayAuthRoute'));

// Route to serve static
app.use('/static', express.static(path.join(__dirname, 'build' , 'static')));

// Route to index file
app.get(['/', '/info', '/login', '/contact','/about', '/register', '/usr','/usr/credit', '/usr/cashout', '/usr/message', '/usr/notifications', '/usr/profile', '/usr/settings' ], (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, './build')});
  });

// =========Setting up Server om port 8080============
app.listen(PORT, () => {
    console.log('🔥🔥🔥🔥🔥Running on port 8080! - http://localhost:8080🔥🔥🔥🔥🔥');
    mongoose.connection.once('open', () => console.log('🌱🌱🌱🌱🌱MongoDB ConnectDb ran Successfully🌱🌱🌱🌱🌱'));
    // mongoose.connect(connection).then(()=> console.log('MongoDB connected'));
});
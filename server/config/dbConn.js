require('dotenv').config();
const mongoose      = require('mongoose');
const DATABASE_URI  = process.env.DATABASE_URI;

const connectDB = async () => {
    try { 
        // const connection = await mongoose.connect(process.env.DATABASE_URI, 
        const connection = await mongoose.connect(DATABASE_URI, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            });
        if (connection)
        console.log('🚀🚀🚀🚀MongoDB Config connected🚀🚀🚀🚀');
	} catch (err) {
        console.log('Error while connecting database');
        console.log(err);
	}
}

module.exports = connectDB
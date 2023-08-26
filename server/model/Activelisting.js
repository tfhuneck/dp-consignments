const mongoose = require('mongoose');

const activelistingSchema = new mongoose.Schema({
    itemid: {type: String, default: null},
    title: {type: String, default: null},
    sku: {type: String, default: null},
    itemurl: {type: String, default: null},
    currentprice: {type: Number, default: 0},
    starttime: {type: String, default: null},
    timeleft: {type: String, default: null},
    bidcount: {type: Number, default: 0},
    watchcount: {type: Number, default: 0}
    },
    { timestamps: true }
);

const Listing = mongoose.model('listing', activelistingSchema);

Listing.createCollection()
    .then((collection) => {
    console.log('listings collection was created!');
    });

module.exports = Listing;
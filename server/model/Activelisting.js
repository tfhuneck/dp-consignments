const mongoose = require('mongoose');

const activelistingSchema = new mongoose.Schema({
    // itemid: String,
    // title: String,
    // sku: String,
    // itemurl: String,
    // currentprice: Number,
    // starttime: String,
    // timeleft: String,
    // bidcount: Number,
    // watchcount: Number,
    type: Object,
});

const Listing = mongoose.model('Listing', activelistingSchema);

module.exports = Listing;
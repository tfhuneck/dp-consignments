const mongoose = require('mongoose');

const AllItemSchema = new mongoose.Schema({
    itemid: {type: String, default: null},
    title: {type: String, default: null},
    sku: {type: String, default: null},
    itemurl: {type: String, default: null},
    imageurl: {type: String, default: null},
    status: {type: String, default: null},
    starttime: {type: String, default: null},
    endtime: {type: String, default: null},
    paymentstatus: {type: String, default: null},
    currentprice: {type: Number, default: 0},
    finalprice: {type: Number, default: 0},
    starttime: {type: String, default: null},
    timeleft: {type: String, default: null},
    bidcount: {type: Number, default: 0},
    watchcount: {type: Number, default: 0},
    canceldate: {type: String, default: null}
    },
    { timestamps: true }
);

const AllItem = mongoose.model('AllItem', AllItemSchema);

AllItem.createCollection()
    .then((collection) => {
    console.log('All Items collection was created!');
    });

module.exports = AllItem;
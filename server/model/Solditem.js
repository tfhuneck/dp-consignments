 const mongoose = require('mongoose');

const solditemSchema = new mongoose.Schema({
    itemid: {type: String, default: null},
    title: {type: String, default: null},
    sku: {type: String, default: null},
    itemurl: {type: String, default: null},
    starttime: {type: String, default: null},
    endtime: {type: String, default: null},
    price: {type: Number, default: 0},
    paymentstatus: {type: String, default: null}
    },
    { timestamps: true }
);

const Solditem = mongoose.model('Solditem', solditemSchema);

Solditem.createCollection()
    .then((collection) => {
    console.log('Sold Items collection was created!');
    });

module.exports = Solditem;
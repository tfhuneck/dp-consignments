const mongoose = require('mongoose');

const unsolditemSchema = new mongoose.Schema({
    itemid: {type: String, default: null},
    title: {type: String, default: null},
    sku: {type: String, default: null},
    itemurl: {type: String, default: null},
    starttime: {type: String, default: null},
    endtime: {type: String, default: null},
    },
    { timestamps: true }
);

const Unsolditem = mongoose.model('Unsolditem', unsolditemSchema);

Unsolditem.createCollection()
    .then((collection) => {
    console.log('Unsold Items collection was created!');
    });

module.exports = Unsolditem;
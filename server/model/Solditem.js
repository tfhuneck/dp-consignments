const mongoose = require('mongoose');

const solditemSchema = new mongoose.Schema({
    itemid: String,
    title: String,
    sku: String,
    itemurl: String,
    paidstatus: String,
    price: Number,
    endtime: String,
});

const Solditem = mongoose.model('Solditem', solditemSchema);

module.exports = Solditem;
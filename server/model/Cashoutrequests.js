const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    userid: {type: String, default: null},
    name: {type: String, default: null},
    skucode: {type: String, default: 'assign_sku'},
    amount: {type: Number, default: 0}, 
    date: {type: String, default: null},
    type: {type: String, default: null},
    comment: {type: String, default: null}
    },
    { timestamps: true }
);

const CashoutRequest = mongoose.model('CashoutRequest', requestSchema);

CashoutRequest.createCollection()
    .then((collection) => {
    console.log('Cashout Requests collection was created!');
    });

module.exports = CashoutRequest;
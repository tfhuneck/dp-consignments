const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
        userid: {type: String, default: null},
        name: {type: String, default: null},
        email: {type: String, default: null},
        phone: {type: Number, default: null},
        address: {type: String, default: null},
        avatar: { type: String, default: null},
        skucode: {type: String, default: 'assign_sku'},
        currentbalance: {type: Number, default: 0},
        activeitems: [{
            itemid: {type: String, default: null}
        }],
        solditems: [{
            itemid: {type: String, default: null}
        }],
        unsolditems: [{
            itemid: {type: String, default: null}
        }],
        pendingitems: [{
            itemid: {type: String, default: null}
        }],
        balance: [{
            title: {type: String, default: null},
            price: {type: Number, default: 0}, 
            payout: {type: Number, default: 0}, 
            date: {type: String, default: null}
        }],
        cashouts:[{
            amount: {type: Number, default: 0}, 
            date: {type: String, default: null},
            type: {type: String, default: null},
            comment: {type: String, default: null}
        }]
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

User.createCollection()
    .then((collection) => {
    console.log('User was created');
    });

module.exports = User;
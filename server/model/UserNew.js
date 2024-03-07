const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
        userid: {type: String, default: null},
        name: {type: String, default: null},
        email: {type: String, default: null},
        phone: {type: String, default: null},
        address: {type: String, default: null},
        avatar: { type: String, default: null},
        skucode: {type: String, default: 'assign_sku'},
        currentbalance: {type: Number, default: 0},
        rules: {type: Boolean, default: false},
        activeitems: {
            sum: {type: Number, default: 0},
            total: {type: Number, default: 0},
            payout: {type: Number, default: 0}
        },
        pendingitems: {
            sum: {type: Number, default: 0},
            total: {type: Number, default: 0},
            payout: {type: Number, default: 0}
        },
        solditems: {
            sum: {type: Number, default: 0},
            total: {type: Number, default: 0},
            payout: {type: Number, default: 0}
        },
        unsolditems: {
            sum: {type: Number, default: 0},
        },
        canceleditems: {
            sum: {type: Number, default: 0},
        }, 
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

const User = mongoose.model('NewUser', userSchema);

User.createCollection()
    .then((collection) => {
    console.log('User was created');
    });

module.exports = User;
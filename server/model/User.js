const mongoose  = require('mongoose');
const fs        = require('fs');
const avatar    = fs.readFileSync('./src/avatar.png');

const userSchema = new mongoose.Schema({
        userid: {type: String, default: null},
        name: {type: String, default: null},
        email: {type: String, default: null},
        phone: {type: Number, default: 0},
        address: {type: String, default: null},
        avatar: { data: Buffer, contentType: String, default: avatar },
        skucode: {type: String, default: 'assign_sku'},
        activeitems: [{
            itemid: {type: String, default: null}
        }],
        solditems: [{
            itemid: {type: String, default: null}
        }],
        balance: [{
            title: {type: String, default: null},
            price: {type: Number, default: 0}
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
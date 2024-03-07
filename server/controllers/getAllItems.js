// const User      = require('../model/User');
const User          = require('../model/UserNew')
const Allitems = require('../model/AllItem');

const getAllItems = async (req, res) => {

    const userData      = req.userData
    const userId        = userData.uid

    try{
        const getUser       = await User.findOne({userid: userId}).exec(); 
        const listingData   = await Allitems.find();  
        const sku           = getUser.skucode;
        const filterListings = listingData.filter((items) => {
            if(items.sku) {
                return items.sku.toLowerCase().includes(sku.toLowerCase());
            }
        })
        res.send(filterListings);
    }
    catch(err) {
        res.send(err);
    }

}

module.exports = getAllItems;
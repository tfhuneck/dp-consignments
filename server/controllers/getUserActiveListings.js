// const User      = require('../model/User');
const User      = require('../model/UserNew')
const Listing   = require ('../model/Activelisting');

const getUserActiveListings = async (req, res, next) => {

    const userData      = req.userData
    const userId        = userData.uid

    try{
        const getUser       = await User.findOne({userid: userId}).exec(); 
        const listingData   = await Listing.find();  
        const sku           = getUser.skucode;
        const activeItems   = getUser.activeitems
        // const filterListings  =  listingData.filter((i) => 
        //        activeItems.some(n => n.itemid === i.itemid));
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

module.exports = getUserActiveListings;
// const User                  = require('../model/User');
const User                    = require('../model/UserNew')
const UnsoldItem              = require('../model/Unsolditem');

const getUserUnsoldListings = async (req, res, next) => {

    const userData      = req.userData
    const userId        = userData.uid

    try{
        const getUser       = await User.findOne({userid: userId}).exec(); 
        const unsoldData    = await UnsoldItem.find();
        const unsoldItems   = getUser.unsolditems;
        const sku           = getUser.skucode;
        // const filterUnsold  =  unsoldData.filter((i) => 
        //     unsoldItems.some(n => n.itemid === i.itemid));
        const filterUnsold =  unsoldData.filter((items) => {
            if(items.sku) {
                return items.sku.toLowerCase().includes(sku.toLowerCase());
            }
        })
        res.send(filterUnsold);
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = getUserUnsoldListings;
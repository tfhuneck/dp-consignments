// const User                  = require('../model/User');
const User                  = require('../model/UserNew')
const SoldItem              = require('../model/Solditem');

const getUserSoldListings = async (req, res, next) => {

    const userData      = req.userData
    const userId        = userData.uid

    try{
        const getUser       = await User.findOne({userid: userId}).exec(); 
        const soldData      = await SoldItem.find();
        const soldItems     = getUser.solditems;
        const sku           = getUser.skucode;
        // const filterSold    =  soldData.filter((i) => 
        //     soldItems.some(n => n.itemid === i.itemid));
        const filterSold =  soldData.filter((items) => {
            if(items.sku) {
                return items.sku.toLowerCase().includes(sku.toLowerCase());
            }
        })
        
        res.send(filterSold);
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = getUserSoldListings;
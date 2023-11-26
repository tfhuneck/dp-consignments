const User                  = require('../model/User');
const UnsoldItem              = require('../model/Unsolditem');

const getUserUnsoldListings = async (req, res, next) => {

    const userData      = req.userData
    const userId        = userData.uid

    try{
        const getUser       = await User.findOne({userid: userId}).exec(); 
        const unsoldData    = await UnsoldItem.find();
        const unsoldItems   = getUser.unsolditems;
        const filterUnsold  =  unsoldData.filter((i) => 
            unsoldItems.some(n => n.itemid === i.itemid));
        res.send(filterUnsold);
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = getUserUnsoldListings;
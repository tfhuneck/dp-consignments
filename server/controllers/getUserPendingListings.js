const User                  = require('../model/User');
const PendingItem           = require('../model/Pendingitem');

const getUserPendingListings = async (req, res, next) => {

    const userData      = req.userData
    const userId        = userData.uid

    try{
        const getUser       = await User.findOne({userid: userId}).exec(); 
        const pendingData      = await PendingItem.find();
        const pendingItems     = getUser.pendingitems;
        const filterPending    =  pendingData.filter((i) => 
            pendingItems.some(n => n.itemid === i.itemid));
        
        res.send(filterPending);
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = getUserPendingListings;
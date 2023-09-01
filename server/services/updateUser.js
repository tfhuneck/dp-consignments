const User          = require('../model/User');
const SoldItem      = require('../model/Solditem');
const Listing       = require ('../model/Activelisting');

const updateUser = async (req, res, next) => {
    
    console.log(req.query)
    const userId        = req.query.userData.uid
    const getUser       = await User.findOne({userid: userId}).exec();
    const soldItemSub   = getUser.solditems;
    const activeItemSub = getUser.activeitems;
    const balanceSub    = getUser.balance;
    const sku           = getUser.skucode;
    const soldData      = await SoldItem.find();
    const listingData   = await Listing.find();

    const filterSold =  soldData.filter((items) => {
            if(items.sku) {
                return items.sku.toLowerCase().includes(sku.toLowerCase());
            }
        })
    const filterActive = listingData.filter((items) => {
            if(items.sku) {
                return items.sku.toLowerCase().includes(sku.toLowerCase());
            }
        })
    const soldItemIds = filterSold.map((i) => {
        return {
            itemid: i.itemid
        };
    })
    const activeListingIds = filterActive.map((i) => {
        return {
            itemid: i.itemid
        };
    })
    const balanceItems = filterSold.map((i) => {
        return {
            title : i.title,
            price: i.price
        };
    })

    const soldIdsDuplicatesCheck = await soldItemIds.filter(i => 
        soldItemSub.every(n => n.itemid !== i.itemid));

    const balancDuplicatesCheck = await balanceItems.filter(i =>
        balanceSub.every(n => n.title != i.title));
    
    try{
        await soldItemSub.push( {$each:  soldIdsDuplicatesCheck }  )
        await getUser.save();
        console.log(getUser.name + ' Sold-Items list updated')
    }   catch (error) {
        console.log(error) 
    }

    try{
        await activeItemSub.remove({});
        await getUser.save();
        await activeItemSub.push({$each: activeListingIds})
        await getUser.save();
        console.log(getUser.name + ' Active-Items list updated')
    }   catch (error) {
        console.log(error) 
    }

    try{
        await balanceSub.push( {$each:  balancDuplicatesCheck }  )
        await getUser.save();
        console.log(getUser.name + ' Balance-Items list updated')
    }   catch (error) {
        console.log(error) 
    }
    return res.send('user updated')
}

module.exports = updateUser;
const User          = require('../model/User');
const SoldItem      = require('../model/Solditem');
const PendingItem   = require('../model/Pendingitem');
const Listing       = require ('../model/Activelisting');
const payoutCalc    = require('../modules/payout');
const totalBalance  = require('../modules/totalBalance');
const totalCashouts = require('../modules/totalCashouts')

const updateUser = async (req, res, next) => {
    
    // const userId            = req.query.userData.userid
    const userId            = req.query.userData.uid
    const getUser           = await User.findOne({userid: userId}).exec();
    const soldItemSub       = getUser.solditems;
    const pendingItemSub    = getUser.pendingitems;
    const activeItemSub     = getUser.activeitems;
    const balanceSub        = getUser.balance;
    const sku               = getUser.skucode;
    const currentBalance    = getUser.currentbalance;
    const soldData          = await SoldItem.find();
    const pendingData       = await PendingItem.find();
    const listingData       = await Listing.find();

    const updateBalance = () => {
        let payoutTotal     = totalBalance(getUser);
        let cashoutTotal    = totalCashouts(getUser);
        let result = payoutTotal - cashoutTotal;
        return result;
    }

    const filterSold =  soldData.filter((items) => {
            if(items.sku) {
                return items.sku.toLowerCase().includes(sku.toLowerCase());
            }
        })
    const filterPending =  pendingData.filter((items) => {
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
    const pendingItemIds = filterPending.map((i) => {
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
            price: i.price,
            date: i.endtime,
            payout: payoutCalc(i.price)
        };
    })

    const soldIdsDuplicatesCheck = await soldItemIds.filter(i => 
        soldItemSub.every(n => n.itemid !== i.itemid));

    const pendingIdsDuplicatesCheck = await pendingItemIds.filter(i => 
        pendingItemSub.every(n => n.itemid !== i.itemid));

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
        await pendingItemSub.push( {$each:  pendingIdsDuplicatesCheck }  )
        await getUser.save();
        console.log(getUser.name + ' Pending-Items list updated')
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

    try{
       const newBalance = updateBalance(); 
       await getUser.set({currentbalance: newBalance});
       await getUser.save();
       console.log(getUser.name + 'current balance updated');
    } catch (error) {
        console.log(error) 
    }
    
    return res.send('user updated')
}

module.exports = updateUser;
const axios         = require("axios");
const cheerio       = require('cheerio');
const User          = require('../model/User');
const SoldItem      = require('../model/Solditem');
const Listing       = require ('../model/Activelisting');


const collectAllData = async (req, res, next) => {

    // console.log(req.query)
    const userId        = req.query.userData.uid
    const getUser       = await User.findOne({userid: userId}).exec(); 
    const soldData      = await SoldItem.find();
    const listingData   = await Listing.find();   
    const soldItems     = getUser.solditems
    const activeItems   = getUser.activeitems
    
    // console.log(soldData)

    const filterSold =  soldData.filter((i) => 
        soldItems.some(n => n.itemid === i.itemid));

    const filterActive =  listingData.filter((i) => 
        activeItems.some(n => n.itemid === i.itemid));

    // console.log(filterActive);

    const user = {
        getUser,
        filterSold,
        filterActive
    }
    console.log('all data collected')
    res.send(user);

    // const getImageSold = async (req) => {

    //    for (let i = 0; i < filterSold.length; i++) {
    //         var itemurl = filterSold[i].itemurl;
    //         // console.log(reqUrl)
    //         let result = await axios.get(itemurl)
    //             .then(async (res) =>{
    //                 const data = res.data
    //                 const $ = cheerio.load(data);
    //                 const image = $('#icImg').attr('src');
    //                 return {imgurl: image}    
    //             })
    //         Object.assign(filterSold[i], result)
    //     }
    // }
}

module.exports = collectAllData;
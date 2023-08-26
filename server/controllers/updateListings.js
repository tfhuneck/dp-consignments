const Listing      = require ('../model/Activelisting');

const enterListings = async (req, res, next) => {
    
    // console.log(req.convertedData)
    const data = req.convertedData

    try{
        await Listing.deleteMany({});
        console.log('DB cleared');
        await Listing.insertMany(data);
        console.log('Active Listings DB updated')
        res.send('Active Listings have saved to DB')
    }catch (err){
        console.log(err);
    }
}



module.exports = enterListings;
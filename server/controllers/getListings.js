const Listing      = require ('../model/Activelisting');

const getListings = async (req, res) => {
    try{
        const data = await Listing.find();
        res.send(data);
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = getListings;
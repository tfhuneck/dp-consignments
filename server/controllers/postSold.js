const SoldItem         = require('../model/Solditem');

const postSold = async (req, res, next) => {
    
    // console.log(req.convertedData)
    const data = req.convertedData

    try{
        await SoldItem.insertMany(data);
        console.log('Sold Items DB updated')
        res.send('Sold Items have been saved to DB')
    }catch (err){
        console.log(err);
    }
}

module.exports = postSold;
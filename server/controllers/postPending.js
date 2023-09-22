const PendingItem         = require('../model/Pendingitem');

const postPending = async (req, res, next) => {
    
    // console.log(req.convertedData)
    const data = req.convertedData

    try{
        await PendingItem.insertMany(data);
        console.log('Sold Items DB updated')
        res.send('Sold Items have been saved to DB')
    }catch (err){
        console.log(err);
    }
}

module.exports = postPending;
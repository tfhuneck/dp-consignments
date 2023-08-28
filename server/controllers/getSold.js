const SoldItems      = require ('../model/Solditem');

const getSold = async (req, res) => {
    try{
        const data = await SoldItems.find();
        res.send(data);
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = getSold;
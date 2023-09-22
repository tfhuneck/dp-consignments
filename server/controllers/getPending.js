const PendingItems      = require ('../model/Pendingitem');

const getPending = async (req, res) => {
    try{
        const data = await PendingItems.find();
        res.send(data);
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = getPending;

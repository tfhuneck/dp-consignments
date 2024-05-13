const Request = require('../model/Cashoutrequests');

const postRequest = async (req, res, next) => {
    
    const userId    = req.body.userId;
    const name      = req.body.name;
    const skucode   = req.body.sku;
    const amount    = req.body.amount;
    const date      = req.body.date;
    const type      = req.body.type;
    const comment   = req.body.comment;

    try {
        await Request.create({
            'userid' : userId,
            'name' : name,
            'skucode' : skucode,
            'amount' : amount,
            'date' : date,
            'type' : type,
            'comment' : comment
        });
        res.status(201).json({'success' : 'cashout request saved'})
        return next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = postRequest;
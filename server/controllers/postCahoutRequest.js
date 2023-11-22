const Request = require('../model/Cashoutrequests');

const postRequest = async (req, res, next) => {
    
    const userId    = req.body.userData.userid;
    const name      = req.body.userData.name;
    const skucode   = req.body.userData.skucode;
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
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = postRequest;
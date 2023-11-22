const Request = require('../model/Cashoutrequests');

const cancelRequest = async(req, res, next) => {

    const requestId = req.body.params.requestId;
    console.log(requestId);

    try {
        await Request.findOneAndDelete({_id : requestId}).exec();
        res.status(201).json({'success' : 'cashout request was canceled'})
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': err.message });
    }

} 

module.exports = cancelRequest;
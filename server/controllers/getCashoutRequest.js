// const User      = require('../model/User');
const User      = require('../model/UserNew')
const Request   = require('../model/Cashoutrequests');

const getRequest = async (req, res) => {

    try {
        const userId        = req.userData.uid;
        const getUser       = await User.findOne({userid : userId}).exec();
        const requests      = await Request.find();
        const filteredReqs  = requests.filter((i) => i.skucode === getUser.skucode);
        res.status(200).send(filteredReqs)
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = getRequest;
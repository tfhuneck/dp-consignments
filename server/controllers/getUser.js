const User      = require('../model/User');

const getUser = async (req, res) => {
    
    const userId = req.query.userData.userid

    try{
        const data = await User.findOne({userid: userId}).exec();
        res.send(data);
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = getUser;
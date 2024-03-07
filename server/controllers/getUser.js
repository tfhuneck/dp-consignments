// const User      = require('../model/User');
const User          = require('../model/UserNew')

const getUser = async (req, res) => {
    
    const userId = req.userData.uid;

    try{
        const data = await User.findOne({userid: userId}).exec();
        res.send(data);
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = getUser;
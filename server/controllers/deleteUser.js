const User      = require('../model/User');

const deleteUser = async (req, res,) => {

    const userId = req.body.userAuth.userid;

    try{
        // await User.findOneAndDelete({userid : userId}).exec();
        res.status(200).json('user account was deleted');
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports = deleteUser;
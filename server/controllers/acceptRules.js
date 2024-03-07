// const User      = require('../model/User');
const User          = require('../model/UserNew')

const acceptRules = async (req, res) => {
    
    const filter = {userid : req.body.userAuth.userid}

    try {
        await User.findOneAndUpdate(filter, {
            "rules": true
        },
        {new: true});
        res.status(201).json({'success': `Rules accepted`});

    } catch(err) {
        console.log(err)
        res.status(500).json(err);
    }
}

module.exports = acceptRules;
const User      = require('../model/User');

const saveAvatarUrl = async (req, res) => {

    console.log(req.body)
    const filter = { userid : req.body.userid};
    const avatar    = req.body.avatar

    try {
        await User.findOneAndUpdate(filter, {
            'avatar' : avatar
        },
        {new: true});
        res.status(201).json({'success': `User profile picture updated`});

    } catch(err) {
        console.log(err)
        res.status(500).json(err);
    }
}

module.exports = saveAvatarUrl;
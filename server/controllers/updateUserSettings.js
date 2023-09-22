const User      = require('../model/User');

const UpdateUserSettings = async (req, res,) => {

    const userData = req.body;
    console.log(userData);
    const filter = { userid : userData.userid};
    console.log(filter)

    try{
        await User.findOneAndUpdate(filter, {
            'name': userData.name,
            'email': userData.email,
            'address': userData.address,
            'phone': userData.phone
        },
        {new: true});
        res.status(201).json({ 'success': `Usersettings updated` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = UpdateUserSettings;
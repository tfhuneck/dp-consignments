const User      = require('../model/User');

const createNewUser = async (req, res,) => {

    const userData = req.body;

    try{
        await User.create({
            'userid': userData.userid,
            'name': userData.name,
            'email': userData.email
        });
        console.log(newUser + ' record created in DB');
        res.status(201).json({ 'success': `New user ${userData.name} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = createNewUser;
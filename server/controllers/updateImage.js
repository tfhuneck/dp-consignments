const User      = require('../model/User');
const fs        = require('fs');
var path        = require('path');

const UpdateUserSettings = async (req, res,) => {

    const filter = { userid: req.headers.userid };
    console.log(filter)
    const img = {
            data: fs.readFileSync(path.join(process.cwd() + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    
    try{
        await User.findOneAndUpdate(filter, {
            'avatar': img
        });
        res.status(200).json({ 'success': `User Image updated` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = UpdateUserSettings;
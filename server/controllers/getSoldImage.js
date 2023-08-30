const axios     = require('axios');
const cheerio  = require('cheerio');


const getImage = async (req, res, next) => {
    const reqUrl = req.body.imageUrl;
    // console.log(reqUrl)
    let result = await axios.get(reqUrl)
        .then(async (res) =>{
            const data = res.data
            const $ = cheerio.load(data);
            const image = $('#icImg').attr('src');
            return image    
        })
    res.send(result)
}

module.exports = getImage;
const convert       = require('xml-js');

const convertData = async (req, res, next) => {
    const rawData           = req.body.rawData;
    const convertedToJson   = convert.xml2json(rawData, {compact: true});
    const parsedData        = JSON.parse(convertedToJson)
    const items             = parsedData.GetMyeBaySellingResponse.ActiveList.ItemArray.Item
    const mappedData        =   items.map((data,key) => {
        return({
            "itemid": data.ItemID._text,
            "title": data.Title._text,
            "sku": data.SKU._text,
            "itemurl": data.ListingDetails.ViewItemURL._text,
            "currentprice": Number(data.SellingStatus.CurrentPrice._text),
            "starttime": data.ListingDetails.StartTime._text,
            "timeleft": data.TimeLeft._text,
            "bidcount": data.SellingStatus.BidCount? Number(data.SellingStatus.BidCount._text) : 0,
            "watchcount": data.WatchCount? Number(data.WatchCount._text) : 0
        })
    })
    req.convertedData = mappedData;
    next()
}


module.exports = convertData;


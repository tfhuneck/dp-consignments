const Listings      = require ('../model/Activelisting');

// dev dependencies 
const fs            = require('fs');
const convert       = require('xml-js');

const activeDataXml = fs.readFileSync('active-listings-api-res.xml', {encoding: 'utf-8'});
const activeData    = convert.xml2json(activeDataXml, {compact: true});
const parsedData    = JSON.parse(activeData)
// fs.writeFileSync('activeData.json', activeData);

const items         = parsedData.GetMyeBaySellingResponse.ActiveList.ItemArray.Item
const mappedData    =   items.map((data,key) => {
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

const enterListings = async (req, res) => {
    const newListings = new Listings({
        parsedData
    })
    try{
        const newListingData = await newListings.save()
        res.status(201).json(newListingData)
    }catch (err){
        res.status(400).json({ message: err.message })
    }
}

// Eventually write a request that requires auth and makes the api calls to ebay and then stores the res.data
// Maybe make Api calls every minute and store the 
// console.log(items)

module.exports = {enterListings}
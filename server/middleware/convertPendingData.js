const convert       = require('xml-js');

const convertData = async (req, res, next) => {
    const rawData           = req.body.soldRaw;
    const soldData          = JSON.parse(convert.xml2json(rawData, {compact: true, spaces: 2, object: true }));
    const sorted            = soldData.GetMyeBaySellingResponse.SoldList.OrderTransactionArray.OrderTransaction
    const transactionsArray = [];
    const orderArray        = [];
    const postDataArray     = [];

    for(i = 0; i < sorted.length; i++){
        let result = sorted[i] 
        result.Transaction ? transactionsArray.push(result.Transaction) : orderArray.push(result.Order);   
    }

    transactionsArray.map((data) => {
            let result = ({  
                'itemid' : data.Item.ItemID._text,
                'title' : data.Item.Title._text,
                'sku' : data.Item.SKU ? data.Item.SKU._text : null,
                'itemurl' : data.Item.ListingDetails.ViewItemURL._text,
                'starttime' : data.Item.ListingDetails.StartTime._text,
                'endtime' : data.Item.ListingDetails.EndTime._text,
                'price' : data.TotalTransactionPrice._text,
                'paymentstatus' : data.SellerPaidStatus._text,
            })
            postDataArray.push(result)
        })
 
    orderArray.map((orders) => {
            return orders.TransactionArray.Transaction.map((data) => {
                let result = ({  
                    'itemid' : data.Item.ItemID._text,
                    'title' : data.Item.Title._text,
                    'sku' : data.Item.SKU ? data.Item.SKU._text : null,
                    'itemurl' : data.Item.ListingDetails.ViewItemURL._text,
                    'starttime' : data.Item.ListingDetails.StartTime._text,
                    'endtime' : data.Item.ListingDetails.EndTime._text,
                    'price' : data.TotalTransactionPrice._text,
                    'paymentstatus' : data.SellerPaidStatus._text,
                })
                postDataArray.push(result);
            })
        })

    const pendingFiltered = postDataArray.filter((i) => i.paymentstatus === 'NotPaid');
    
    req.convertedData = pendingFiltered;

    next()
}

module.exports = convertData;
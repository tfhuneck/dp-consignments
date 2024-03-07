const payout = (price) => {

    let result = Number
    if(price >= 10000){
        result = (price * 0.95).toFixed(2)
    }
    if(price >= 5000 && price <= 9999.99){
        result = (price * 0.92).toFixed(2)
    }
    if(price >= 2500 && price <= 4999.99 ){
        result = (price * 0.9).toFixed(2)
    }
    if(price >= 1000 && price <= 2499.99){
        result = (price * 0.88).toFixed(2)
    }
    if(price >= 500 && price <= 999.99){
        result = (price * 0.87).toFixed(2)
    }
    if(price >= 100 && price <= 499.999 ){
        result = (price * 0.86).toFixed(2)
    }
    if(price >= 50 && price <= 99.99 ){
        result = (price * 0.85).toFixed(2)
    } 
    if(price <= 49.99){
        let deduction = (price * 0.83).toFixed(2); 
        result = (deduction - 0.99).toFixed(2);
    }
    return result;
}

module.exports = payout;
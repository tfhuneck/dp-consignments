
const payout = (price) => {

    let result = Number

    if(price >= 5000){
        let deduction = (price * 0.97).toFixed(2);
        result = (deduction - 300).toFixed(2);
    }
    if(price >= 1000 && price <= 4999.99 ){
        let deduction = (price * 0.88).toFixed(2);
        result = (deduction - 0.5).toFixed(2);
    }
    if(price >= 25 && price <= 999.999 ){
        let deduction = (price * 0.85).toFixed(2);
        result = (deduction - 0.5).toFixed(2);
    }
    if(price >= 10 && price <= 24.999 ){
        let deduction = (price * 0.8).toFixed(2); 
        result = (deduction - 0.5).toFixed(2);
    } 
    if(price < 10 ){
        let deduction = (price * 0.8).toFixed(2); 
        result = (deduction - 0.75).toFixed(2);
    }

    return result;
}

module.exports = payout;
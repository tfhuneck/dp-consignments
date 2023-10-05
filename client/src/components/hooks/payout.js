
const payout = (price) => {

    let result = Number

    if(price >= 5000){
        let deduction = price - 3000
        result = (deduction * 0.97).toFixed(2);
    }
    if(price >= 1000 && price <= 4999.99 ){
        let deduction = price - 0.5
        result = (deduction * 0.88).toFixed(2);
    }
    if(price >= 25 && price <= 999.999 ){
        let deduction = price - 0.5
        result = (deduction * 0.85).toFixed(2);
    }
    if(price >= 10 && price <= 24.999 ){
        let deduction = price - 0.5
        result = (deduction * 0.8).toFixed(2);
    } 
    if(price < 10 ){
        result = price.toFixed(2);
    }

    return result;
}

export default payout;

const totalBalance = (userData) => {
    if (userData && userData.cashouts.length > 0) {
        return userData.cashouts.map(i => i.amount).reduce((prev, next)=> Math.round((prev + next)* 1e12)/ 1e12);
    }else{
        return 0
    }
}

module.exports = totalBalance;
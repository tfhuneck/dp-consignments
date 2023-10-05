
const totalBalance = (userData) => {
    if (userData && userData.balance.length > 0) {
        return userData.balance.map(i => i.price).reduce((prev, next)=> Math.round((prev + next)* 1e12)/ 1e12);
    }else{
        return 0
    }
}

module.exports = totalBalance;
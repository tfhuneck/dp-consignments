
const time = (data) => {
    let fixed = data.replace('PT','').replace('D', 'd ').replace('H', 'h ').replace('M', 'min ').replace('S', 'sec')
    return fixed
}

module.exports = time;
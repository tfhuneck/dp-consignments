
const time = (data) => {
    let fixed = data.replace('D', 'd ').replace('H', 'h ').replace('M', 'min ').replace('S', 'sec').slice(1).substr(0, 12).split('T')
    return fixed
}

module.exports = time;
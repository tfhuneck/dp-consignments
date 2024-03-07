
const time = (data) => {
    let fixed = data.replace('P','').replace('T','').replace('D', 'd ').replace('H', 'h ').replace('M', 'min ').replace('S', 'sec')
    return fixed
}

module.exports = time;
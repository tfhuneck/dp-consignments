var date                                = new Date();
var year                                = date.getFullYear();
var month                               = date.getMonth()+1;
var day                                 = date.getDate();
var hours                               = date.getHours();
var ampm                                = hours >= 12 ? 'pm' : 'am';

const today = () => {
    const result = month + " - " + day + " - " + year;
    return result;
}

const greeting = () => {
   const result = 
    ampm === 'am'? 'Good Morning' :
    ampm === 'pm' && hours < 17 ? 'Good Afternoon' :
    ampm === 'pm' && hours >= 17 ? 'Good Evening' :
    '';

    return result;
}

const weekDay = () => {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = weekday[date.getDay()];
    return day;
};


module.exports = {today, greeting, weekDay}; 
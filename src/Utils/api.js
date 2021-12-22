export const Api_key = "6bd4989b0eae8e9d5e40927c84569df0";

export const dateTime = () => {
    var objToday = new Date();
    var weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
        dayOfWeek = weekday[objToday.getDay()],
        months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'),
        curMonth = months[objToday.getMonth()],
        curYear = objToday.getFullYear(),
        curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
        dayOfMonth = objToday.getDate() < 10 ? '0' + objToday.getDate() : objToday.getDate(),
        curMeridiem = objToday.getHours() > 12 ? "PM" : "AM",
        curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours());
    var today = dayOfWeek + " " + dayOfMonth + " " + curMonth + ", " + curYear;

    return today;
}
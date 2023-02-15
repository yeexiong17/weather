let tempText = document.querySelector(".temperature");
let rise = document.querySelector(".sunrise");
let set = document.querySelector(".sunset");
let datetime = document.querySelector(".date-time");
let feelTemp = document.querySelector(".feelTemp");
let comment = document.querySelector(".weather-comment");

const Weather = () => {

    const fetchWeather = (href) => {
        fetch(href)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                displayData(data);
            })
    };

    // For displaying the data
    const displayData = (data) => {
        console.log(data);
        tempText.textContent = data.main.temp;

        let sunrise = convertTime(data.sys.sunrise);
        rise.textContent = `Sunrise: ${sunrise.getHours()}:${sunrise.getMinutes()}`;

        let sunset = convertTime(data.sys.sunset);
        set.textContent = `Sunset: ${sunset.getHours()}:${sunset.getMinutes()}`;

        let current = datentime();
        let currentDay = day(current.getDay());
        let currentMonth = month(current.getMonth());
        datetime.textContent = `${currentDay} ${current.getDate()} ${currentMonth} ${current.getHours()}:${current.getMinutes()}`;

        feelTemp.textContent = data.main.feels_like;
        comment.textContent = data.weather[0].description;

    };

    const convertTime = (unix) => {
        const timeStamp = unix;
        const date = new Date(timeStamp * 1000);

        return date;
    };

    const datentime = () => {
        const now = new Date();

        return now;
    };

    const month = (n) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthOfYear = months[n];

        return monthOfYear;
    };

    const day = (n) => {
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = weekdays[n];

        return dayOfWeek;
    };

    return { displayData, fetchWeather };
};

let weather = Weather();

let href = "https://api.openweathermap.org/data/2.5/weather?q=Kuala Lumpur&units=metric&appid=477d60f3166b6d2f5254f61dace74a6d";

weather.fetchWeather(href);

let tempText = document.querySelector(".temperature");
let mid_icon = document.querySelector(".mid-1-left img");
let datetime = document.querySelector(".date-time");
let feelTemp = document.querySelector(".feelTemp");
let comment = document.querySelector(".weather-comment");
let wind = document.querySelector(".wind");
let humidity = document.querySelector(".humid");
let pressure = document.querySelector(".pressure");
let precipitation = document.querySelector(".precipitate");
let bottom = document.querySelector(".bottom-2");
let button = document.querySelector(".btn-search");
let input = document.querySelector(".input");
let title = document.querySelector(".country");

const Weather = () => {

    const fetchWeather = async (href) => {

        const response = await fetch(href);
        const data = await response.json();
        displayData(data);

        return data;
    };

    const fetchFuture = (href) => {
        fetch(href)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                displayFuture(data);
            })
    };

    const convertTime = (timezone) => {

        const date = new Date();
        localTime = date.getTime();
        localOffset = date.getTimezoneOffset() * 60000;
        utc = localTime + localOffset;
        var newTime = utc + (1000 * timezone);
        nd = new Date(newTime);

        return nd;
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

    // For displaying the data
    const displayData = (data) => {
        console.log(data);

        if (data.message == "city not found") {
            alert("Country/Region Not Found! Please Try Another");
        }

        title.textContent = `${data.name}, ${data.sys.country}`;

        tempText.textContent = data.main.temp;
        mid_icon.src = `photo/${data.weather[0].icon.replace(/n/g, "d")}.png`;

        let current = convertTime(data.timezone);
        let currentDay = day(current.getDay());
        let currentMonth = month(current.getMonth());
        datetime.textContent = `${currentDay} ${current.getDate()} ${currentMonth} ${current.getHours()}:${current.getMinutes()}`;

        feelTemp.textContent = data.main.feels_like;
        comment.textContent = data.weather[0].description;

        wind.textContent = `${data.wind.speed} m/s`;
        humidity.textContent = `${data.main.humidity}%`;
        pressure.textContent = `${data.main.pressure}mm`;
        precipitation.textContent = `-`;

    };

    const displayFuture = (data) => {
        let bottom2 = document.querySelector(".bottom-2");
        console.log(data);

        for (let i = 0; i < data.list.length; i += 8) {

            let divContainer = document.createElement('div');
            let div1 = document.createElement('div');
            let min_span = document.createElement('span');
            let max_span = document.createElement('span');
            let condition = document.createElement('div');

            div1.setAttribute('class', 'min-max');
            min_span.setAttribute('class', 'bold');
            max_span.setAttribute('class', 'bold');
            condition.setAttribute('class', 'condition');

            const date = new Date(data.list[i].dt * 1000);
            localTime = date.getTime();
            console.log(`Unix Time: ${localTime}`);
            nd = new Date(localTime);

            let dayElement = document.createElement('p');
            dayElement.setAttribute('class', 'bold');
            let dayForecast = day(nd.getUTCDay());
            console.log(dayForecast);
            dayElement.textContent = dayForecast;
            divContainer.appendChild(dayElement);
            bottom2.appendChild(divContainer);

            let dateElement = document.createElement('p');
            dateElement.setAttribute('class', 'sm-text');
            let monthForecast = month(nd.getUTCMonth());
            dateElement.textContent = `${nd.getUTCDate()} ${monthForecast}`;
            divContainer.appendChild(dateElement);

            let minTemp = document.createElement('p');
            minTemp.setAttribute('class', 'sm-text');
            minTemp.innerHTML = `min`;
            min_span.innerHTML = `. ${data.list[i].main.temp_min}&#176;`;
            minTemp.appendChild(min_span);
            div1.appendChild(minTemp);
            divContainer.appendChild(div1);

            let maxTemp = document.createElement('p');
            maxTemp.setAttribute('class', 'sm-text');
            maxTemp.innerHTML = `max`;
            max_span.innerHTML = `. ${data.list[i].main.temp_max}&#176;`;
            maxTemp.appendChild(max_span);
            div1.appendChild(maxTemp);
            divContainer.appendChild(div1);

            let img = document.createElement('img');
            img.setAttribute('src', `photo/${data.list[i].weather[0].icon.replace(/n/g, "d")}.png`);
            condition.appendChild(img);
            let conditionText = document.createElement('p');
            conditionText.setAttribute('class', 'sm-text');
            conditionText.textContent = `${data.list[i].weather[0].description}`;
            condition.appendChild(conditionText);

            divContainer.appendChild(condition);
        }
    };

    return { displayData, fetchWeather, fetchFuture };
};

async function myFunction(input) {

    let href = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=5a452fdd557add2c1e840b9e72f07e6c`;

    let data = await weather.fetchWeather(href);
    weather.fetchFuture(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=5a452fdd557add2c1e840b9e72f07e6c`);

    while (bottom.firstChild) {
        bottom.removeChild(bottom.firstChild);
    }

    clearInterval(interval1);
    clearInterval(interval2);

    interval1 = setInterval(async () => {
        await weather.fetchWeather(href);
    }, 60000);

    interval2 = setInterval(async () => {
        let newData = await weather.fetchWeather(href);
        weather.fetchFuture(`https://api.openweathermap.org/data/2.5/forecast?lat=${newData.coord.lat}&lon=${newData.coord.lon}&units=metric&appid=5a452fdd557add2c1e840b9e72f07e6c`);
        while (bottom.firstChild) {
            bottom.removeChild(bottom.firstChild);
        }
        console.log("Success again!");
    }, 9000000);
}

let weather = Weather();
let interval1;
let interval2;

myFunction("Kuala Lumpur");

button.addEventListener('click', function myFunc() {
    let inputCountry = input.value;

    if (inputCountry === "") {
        alert("Please Enter A Country Or City!");
    }

    myFunction(inputCountry);

    input.value = "";
});


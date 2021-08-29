// f04d8a244bc895aa44421749a1617060
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const weatherApi = {
    key: "f04d8a244bc895aa44421749a1617060",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
};

const searchInputBox = document.getElementById('input-box');

// Event listener function on keypress
searchInputBox.addEventListener('keypress', (event) => {
    if(event.keyCode == 13){
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
    }      
});

// get weather report
function getWeatherReport(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }) // correction
    .then(showWeatherReport) // correction
};

// show weather report
function showWeatherReport(weather){
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (Min) / ${Math.ceil(weather.main.temp_max)}&deg;C (Max)`;

    let weatherType = document.getElementById('weather');
    weatherType.innerHTML = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(weatherType.textContent == 'Clear'){
        document.body.style.backgroundImage = "url('img/clear.jpg')";
    } else if(weatherType.textContent == 'Clouds' || weatherType.textContent == 'Haze'){
        document.body.style.backgroundImage = "url('img/cloud.jpg')";
    } else if(weatherType.textContent == 'Rain'){
        document.body.style.backgroundImage = "url('img/rain.jpg')";
    } else if(weatherType.textContent == 'Snow'){
        document.body.style.backgroundImage = "url('img/rain.jpg')";
    } else if(weatherType.textContent == 'Sunny'){
        document.body.style.backgroundImage = "url('img/sunny.jpg')";
    } else if(weatherType.textContent == 'Thunderstorm'){
        document.body.style.backgroundImage = "url('img/thunderstorm.jpg')";
    } else{
        document.body.style.backgroundImage = "url('img/bg.jpg')";
    }
}

// Date Manage

function dateManage(dateArg){
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
};
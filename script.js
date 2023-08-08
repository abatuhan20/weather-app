const apikey = "3265874a2c77ae4a04bb96236a642d2f";
const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getWeatherByLocation(city) {
    const resp = await fetch (url(city), {
        origin: "cors"});

    const respData = await resp.json();

    main.innerHTML = '';

    addWeatherToPage(respData);
}

function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp);
    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
    <h2>${temp}°C</h2>
    <h3> in ${search.value} ${data.weather[0].main} </h3>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" />
    `;

    main.appendChild(weather);
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}
// Kelvin değeri celciusa toFixed 2 digite indiriyo

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = search.value;
    if (city) {
        getWeatherByLocation(city);
    }
})
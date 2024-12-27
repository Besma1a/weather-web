function stars () {
let count = 500;
let scene = document.querySelector('.scene');
let i= 0;
while (i< count) {
 let star = document.createElement("i")
 let x = Math.floor (Math.random() * window.innerWidth);
 let y = Math.floor (Math.random() * window.innerHeight);
 let duration = Math.random ()* 10;
 let size = Math.random() * 2;
   
 star.style.width = 1 + size + 'px';
star.style.height= 1 + size + 'px';
star.style.left = x + 'px';
star.style.top = y + 'px';
star.style.animationDuration = 5+duration + 's';
star.style.animationDelayp = duration + 's';

scene.appendChild(star);
i++
}
}
stars();


const apiKey = ""; 
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const errorMessage = document.getElementById("error-message");

async function getWeather() {
    const city = cityInput.value.trim();
    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
        clearWeatherInfo();
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            errorMessage.textContent = "City not found!";
            clearWeatherInfo();
        } else {
            errorMessage.textContent = ""; 
            updateWeatherUI(data);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        errorMessage.textContent = "Failed to retrieve data. Please try again.";
    }
}


function updateWeatherUI(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;


    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const icon = document.createElement("img");
    icon.src = iconUrl;
    icon.alt = data.weather[0].description;
    icon.classList.add("weather-icon");

    
    document.getElementById("weather-info").appendChild(icon);
}


function clearWeatherInfo() {
    cityName.textContent = "";
    temperature.textContent = "";
    description.textContent = "";
    humidity.textContent = "";
    windSpeed.textContent = "";
    document.getElementById("weather-info").innerHTML = ''; // 
}
   const searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", () => {
    getWeather();
});




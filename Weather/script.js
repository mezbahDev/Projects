const apiKey = "00e96c67b6bed6dca61aa201dbd6df0c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDiv = document.querySelector(".weather");
const errorDiv = document.querySelector(".error");

async function checkWeather(city) {
    try {
        if (!city) {
            errorDiv.style.display = "block";
            weatherDiv.style.display = "none";
            return;
        }

        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (!response.ok) {
            errorDiv.style.display = "block";
            weatherDiv.style.display = "none";
            return;
        }

        const data = await response.json();


        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";


        switch(data.weather[0].main.toLowerCase()) {
            case "clouds":
                weatherIcon.src = "pic/clouds.png";
                break;
            case "clear":
                weatherIcon.src = "pic/clear.png";
                break;
            case "rain":
                weatherIcon.src = "pic/rain.png";
                break;
            case "drizzle":
                weatherIcon.src = "pic/drizzle.png";
                break;
            case "mist":
                weatherIcon.src = "pic/mist.png";
                break;
            default:
                weatherIcon.src = "pic/mist.png";
        }


        weatherDiv.style.display = "block";
        errorDiv.style.display = "none";

    } catch (error) {
        console.error("Error fetching weather data:", error);
        errorDiv.style.display = "block";
        weatherDiv.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});


weatherDiv.style.display = "none";
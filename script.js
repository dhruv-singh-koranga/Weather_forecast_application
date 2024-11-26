const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");

const API_KEY = " "; // API key for OpenWeatherMap API

const createWeatherCard = (cityName, weatherItem, index) => {
    if(index === 0) { // HTML for the main weather card
        return `<div class="details">
                    <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                    <h6>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h6>${weatherItem.weather[0].description}</h6>
                </div>`;
    } else { // HTML for the other five day forecast card
        return `<li class="card">
                    <h4>(${weatherItem.dt_txt.split(" ")[0]})</h4>
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h6>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </li>`;
    }
}

const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
        // Filter the forecasts wether details to get only one forecast per day
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });

        // Clearing  the previous weather data
        cityInput.value = "";
        currentWeatherDiv.innerHTML = "";
        weatherCardsDiv.innerHTML = "";

        // Creating weather cards and adding them to the DOM
        fiveDaysForecast.forEach((weatherItem, index) => {
            const html = createWeatherCard(cityName, weatherItem, index);
            if (index === 0) {
                currentWeatherDiv.insertAdjacentHTML("beforeend", html);
            } else {
                weatherCardsDiv.insertAdjacentHTML("beforeend", html);
            }
        });        
    }).catch(() => {
        alert("An error occurred while fetching the weather forecast!");
    });
}

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if (cityName === "") return;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    
    // Get entered city coordinates (latitude, longitude, and name) from the API response
    fetch(API_URL).then(response => response.json()).then(data => {
        if (!data.length) return alert(`No coordinates found for ${cityName}`);
        const { lat, lon, name } = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("An error occurred while fetching the coordinates!");
    });
}

const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords; // Get coordinates of user location
            // Get city name from coordinates using reverse geocoding API
            const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
            fetch(API_URL).then(response => response.json()).then(data => {
                const { name } = data[0];
                getWeatherDetails(name, latitude, longitude);
            }).catch(() => {
                alert("An error occurred while fetching the city name!");
            });
        },
        error => { // Show alert if user denied the location permission
            if (error.code === error.PERMISSION_DENIED) {
                alert("Geolocation request denied. Please reset location permission to grant access again.");
            } else {
                alert("Geolocation request error. Please reset location permission.");
            }
        });
}
    // display the loading after search button is clicked
locationButton.addEventListener("click", getUserCoordinates);
searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());



const theButton = document.querySelector(".button");

theButton.addEventListener("click", () => {
  theButton.classList.add("button--loading");
  theButton.disabled = true; // disable the button to prevent multiple clicks

  // stop the loading animation after 1.5 seconds
  setTimeout(() => {
    theButton.classList.remove("button--loading");
    theButton.disabled = false; // enable the button again
  }, 1500);
});
const button = document.getElementById('change-background');
const backgroundContainer = document.getElementById('background-container');
const innerText = document.getElementById('text')
button.addEventListener('click', () => {
  backgroundContainer.style.backgroundImage = "url('background2.jpg')";
  innerText.style.color="white"
});

const glowbutton = document.querySelector('.glow-button');

button.addEventListener('mouseover', () => {
  button.classList.add('glowing');
});

button.addEventListener('mouseout', () => {
  button.classList.remove('glowing');
});
/*

   dropdown menu functionality
  */
  const dropdownInput = document.getElementById('dropdown-input');
  const dropdownMenu = document.getElementById('dropdown-menu');
  const SearchButton = document.getElementById('search-button');
  
  dropdownInput.addEventListener('click', () => {
    dropdownMenu.style.display = 'block';
    SearchButton.style.display = 'none'; // Hide the search button when the dropdown menu is opened
  });
  
  dropdownMenu.addEventListener('click', (e) => {
    e.preventDefault();
    const selectedOption = e.target.textContent;
    dropdownInput.value = selectedOption;
    dropdownMenu.style.display = 'none';
    SearchButton.style.display = 'block'; // Show the search button when the dropdown menu is closed
  });
  
  SearchButton.addEventListener('click', () => {
    dropdownMenu.style.display = 'block';
    SearchButton.style.display = 'none'; // Hide the search button when the dropdown menu is opened
  });
  
  document.addEventListener('click', (e) => {
    if (e.target !== dropdownInput && e.target !== dropdownMenu && e.target !== SearchButton) {
      dropdownMenu.style.display = 'none';
      SearchButton.style.display = 'block'; // Show the search button when the dropdown menu is closed
    }
  });

  

//    stored the entered city value in the local storage and seesion storage

// Get the input field element
const cityData = document.querySelector(".city-data");

// Add an event listener to the input field to capture the input value
cityData.addEventListener('input', (e) => {
  // Get the entered city value
  const enteredCity = e.target.value;

  // Store the entered city value in a variable or an object
  const storedCity = enteredCity;

  // You can also store it in local storage or session storage
  localStorage.setItem('city', enteredCity);
  // or
  sessionStorage.setItem('city', enteredCity);

  // Log the stored city value to the console
  console.log(`Stored city: ${storedCity}`);
});




const dataContainer = document.querySelector('.data-container');
const searchEl = document.querySelector('#search-form');
const searchSidebar = document.querySelector('.search-bar');
const searchInput = document.querySelector('#search');
const directGeoApiKey = 'f0d8b11b541461f5c9bb0d139ae4c34a';
const weatherDataApiKey = 'c7542432b88609520e1171d172ceb8be';
const currentWeatherApiKey = '4723c4b6a67718411527a5e94004caed';
let cityNames = [];

//forecast api:      http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//direct geocoding:  http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=1&appid={API key}
//reverse geocoding: http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit=1&appid={API key}

// Convert city name to lat & long coordinates
function convertLatLong() {

let cityName = cityNames.pop(); 
let directGeoConv = 'https://api.openweathermap.org/geo/1.0/direct'

directGeoConv = `${directGeoConv}?q=${cityName}&limit=1&appid=${directGeoApiKey}`

fetch(directGeoConv)
    .then(function (response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    })
    .then(data => {
        console.log(data);
        let lat = data[0].lat
        let lon = data[0].lon
        forecastApi(lat, lon);
        currentWeatherApi(lat, lon);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function currentWeatherApi(lat, lon) {
  let currentWeatherQueryUrl = 'https://api.openweathermap.org/data/2.5/weather';

  currentWeatherQueryUrl = `${currentWeatherQueryUrl}?lat=${lat}&lon=${lon}&appid=${currentWeatherApiKey}&units=imperial`;

  fetch(currentWeatherQueryUrl)
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then(data => {
        console.log(data);
        let dataList1 = (data)
        printCurrentWeather(dataList1);
      })
}

// Search the API and return weather data, given the lat and long coordinates
function forecastApi(lat, lon) {
    let weatherQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast';

    weatherQueryUrl = `${weatherQueryUrl}?lat=${lat}&lon=${lon}&appid=${weatherDataApiKey}&units=imperial`

    fetch(weatherQueryUrl)
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then(data => {
        console.log(data);
        let dataList = (data.list)
        printForecast(dataList);
      })
}

// Handle the search submission
function handleSearchSubmit(event) {
    event.preventDefault();

    const cityName = document.querySelector('#search').value;

    if (!cityName) {
        console.error('Please input a city name.');
        return;
    }

    cityNames.push(cityName);
    localStorage.setItem('cityNames', JSON.stringify(cityNames));

    for (let i = 0; i < cityNames.length; i++) {
     
      const cityButton = document.createElement('button');
      cityButton.textContent = `${cityName}`;
      cityButton.addEventListener('click', printCurrentWeather, printForecast);
      searchSidebar.append(cityButton);
    }

    convertLatLong();
}


// Add event listener to search button
searchEl.addEventListener('submit', handleSearchSubmit);

function printCurrentWeather(dataList1) {
  // Main result container
  const weatherCard = document.createElement('div');
  weatherCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

    // Current weather container
    const currentWeatherBody = document.createElement('div');
    currentWeatherBody.classList.add('w-card-body');
    weatherCard.append(currentWeatherBody);
  
      // Current date
      const currentWeatherDate = document.createElement('h3');
      currentWeatherDate.textContent = `Current Weather in ${dataList1.name}:`

      // Current icon
      const currentIcon = document.createElement('img');
      let weatherIcon = dataList1.weather[0].icon
      currentIcon.src=`https://openweathermap.org/img/wn/${weatherIcon}.png`
    
      // Current temp
      const currentTemp = document.createElement('p');
      currentTemp.textContent =
        `Temp: ${dataList1.main.temp}°F`;

      // Current wind
      const currentWind = document.createElement('p');
      currentWind.textContent =
        `Wind: ${dataList1.wind.speed} Mph`;

      // Current humidity
      const currentHumid = document.createElement('p');
      currentHumid.textContent =
        `Humidity: ${dataList1.main.humidity}%`;

      currentWeatherBody.append(currentWeatherDate, currentIcon, currentTemp, currentWind, currentHumid);
    
    dataContainer.append(weatherCard);
}

function printForecast(dataList) {
  // Main container
  const forecastCard = document.createElement('div');
  forecastCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

      // Weather forecast container
      const weatherForecastBody = document.createElement('div');
      weatherForecastBody.classList.add('fc-card-body');
      forecastCard.append(weatherForecastBody);
  
        // Title
        const weatherForecastTitle = document.createElement('h4');
        weatherForecastTitle.textContent = '5-Day Forecast:';
        weatherForecastBody.append(weatherForecastTitle);
  
        // Card container 
        const container1 = document.createElement('div');
          container1.classList.add('card-container');
          weatherForecastBody.append(container1);

          // Weather card 1
          const weatherCard1 = document.createElement('div');
          weatherCard1.classList.add('f-card-body');

            // Day 1 date
            const date1 = document.createElement('p');
            let dateFormat1 = dataList[0].dt_txt.split(' ');
            dateFormat1.pop();
            date1.innerHTML =
              `<strong>${dateFormat1}</strong>`;

            // Day 1 icon
            const icon1 = document.createElement('img');
            let weatherIcon1 = dataList[0].weather[0].icon;
            icon1.src=`https://openweathermap.org/img/wn/${weatherIcon1}.png`;

            // Day 1 temperature
            const temp1 = document.createElement('p');
            temp1.textContent =
              `Temp: ${dataList[0].main.temp}°F`;

            // Day 1 wind
            const wind1 = document.createElement('p');
            wind1.textContent =
              `Wind: ${dataList[0].wind.speed} Mph`;

            // Day 1 humidity
            const humid1 = document.createElement('p');
            humid1.textContent =
              `Humidity: ${dataList[0].main.humidity}%`;
        
            weatherCard1.append(date1, icon1, temp1, wind1, humid1);
        
          // Weather card 2
          const weatherCard2 = document.createElement('div');
          weatherCard2.classList.add('f-card-body');

            // Day 2 date
            const date2 = document.createElement('p');
            let dateFormat2 = dataList[8].dt_txt.split(' ');
            dateFormat2.pop();
            date2.innerHTML =
              `<strong>${dateFormat2}</strong>`;

            // Day 2 icon
            const icon2 = document.createElement('img');
            let weatherIcon2 = dataList[8].weather[0].icon;
            icon2.src=`https://openweathermap.org/img/wn/${weatherIcon2}.png`;

            // Day 2 temperature
            const temp2 = document.createElement('p');
            temp2.textContent =
              `Temp: ${dataList[8].main.temp}°F`;

            // Day 2 wind
            const wind2 = document.createElement('p');
            wind2.textContent =
              `Wind: ${dataList[8].wind.speed} Mph`;

            // Day 2 humidity
            const humid2 = document.createElement('p');
            humid2.textContent =
              `Humidity: ${dataList[8].main.humidity}%`;
        
            weatherCard2.append(date2, icon2, temp2, wind2, humid2);

          // Weather card 3
          const weatherCard3 = document.createElement('div');
          weatherCard3.classList.add('f-card-body');

            // Day 3 date
            const date3 = document.createElement('p');
            let dateFormat3 = dataList[16].dt_txt.split(' ');
            dateFormat3.pop();
            date3.innerHTML =
              `<strong>${dateFormat3}</strong>`;

            // Day 3 icon
            const icon3 = document.createElement('img');
            let weatherIcon3 = dataList[16].weather[0].icon;
            icon3.src=`https://openweathermap.org/img/wn/${weatherIcon3}.png`;

            // Day 3 temperature
            const temp3 = document.createElement('p');
            temp3.textContent =
              `Temp: ${dataList[16].main.temp}°F`;

            // Day 3 wind
            const wind3 = document.createElement('p');
            wind3.textContent =
              `Wind: ${dataList[16].wind.speed} Mph`;

            // Day 3 humidity
            const humid3 = document.createElement('p');
            humid3.textContent =
              `Humidity: ${dataList[16].main.humidity}%`;
        
            weatherCard3.append(date3, icon3, temp3, wind3, humid3);

          // Weather card 4
          const weatherCard4 = document.createElement('div');
          weatherCard4.classList.add('f-card-body');

            // Day 4 date
            const date4 = document.createElement('p');
            let dateFormat4 = dataList[24].dt_txt.split(' ');
            dateFormat4.pop();
            date4.innerHTML =
              `<strong>${dateFormat4}</strong>`;

            // Day 4 icon
            const icon4 = document.createElement('img');
            let weatherIcon4 = dataList[24].weather[0].icon;
            icon4.src=`https://openweathermap.org/img/wn/${weatherIcon4}.png`;

            // Day 4 temperature
            const temp4 = document.createElement('p');
            temp4.textContent =
              `Temp: ${dataList[24].main.temp}°F`;

            // Day 4 wind
            const wind4 = document.createElement('p');
            wind4.textContent =
              `Wind: ${dataList[24].wind.speed} Mph`;

            // Day 4 humidity
            const humid4 = document.createElement('p');
            humid4.textContent =
              `Humidity: ${dataList[24].main.humidity}%`;
        
            weatherCard4.append(date4, icon4, temp4, wind4, humid4);

          // Weather card 5
          const weatherCard5 = document.createElement('div');
          weatherCard5.classList.add('f-card-body');

            // Day 5 date
            const date5 = document.createElement('p');
            let dateFormat5 = dataList[32].dt_txt.split(' ');
            dateFormat5.pop();
            date5.innerHTML =
              `<strong>${dateFormat5}</strong>`;

            // Day 5 icon
            const icon5 = document.createElement('img');
            let weatherIcon5 = dataList[32].weather[0].icon;
            icon5.src=`https://openweathermap.org/img/wn/${weatherIcon5}.png`;

            // Day 5 temperature
            const temp5 = document.createElement('p');
            temp5.textContent =
              `Temp: ${dataList[32].main.temp}°F`;

            // Day 5 wind
            const wind5 = document.createElement('p');
            wind5.textContent =
              `Wind: ${dataList[32].wind.speed} Mph`;

            // Day 5 humidity
            const humid5 = document.createElement('p');
            humid5.textContent =
              `Humidity: ${dataList[32].main.humidity}%`;
        
            weatherCard5.append(date5, icon5, temp5, wind5, humid5);

            container1.append(weatherCard1, weatherCard2, weatherCard3, weatherCard4, weatherCard5);

    dataContainer.append(forecastCard);
  }

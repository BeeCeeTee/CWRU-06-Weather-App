const dataContainer = document.querySelector('.data-container');
const searchEl = document.querySelector('#search-form');
const directGeoApiKey = 'f0d8b11b541461f5c9bb0d139ae4c34a';
const weatherDataApiKey = 'c7542432b88609520e1171d172ceb8be';
let cityNames = [];

//forecast api:      http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//direct geocoding:  http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=1&appid={API key}
//reverse geocoding: http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit=1&appid={API key}

// Convert city name to lat & long coordinates
function convertLatLong() {

let cityName = cityNames.pop(); 
let directGeoConv = 'http://api.openweathermap.org/geo/1.0/direct'

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
        searchApi(lat, lon);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

// Search the API and return weather data, given the lat and long coordinates
function searchApi(lat, lon) {
    let weatherQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    // let lat = '41.4996574'
    // let lon = '-81.6936772'

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
        printResults(dataList);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
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

    convertLatLong();
}

// Add event listener to search button
searchEl.addEventListener('submit', handleSearchSubmit);

function printResults(dataList) {
  
    // Main result container
    const resultCard = document.createElement('div');
    resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');
  
      // Current weather container
      const currentWeatherBody = document.createElement('div');
      currentWeatherBody.classList.add('w-card-body');
      resultCard.append(currentWeatherBody);
    
        // Current date
        const currentWeatherDate = document.createElement('h3');
        currentWeatherDate.textContent = ''
      
        // Current temp
        const currentTemp = document.createElement('p');
        currentTemp.textContent =
          ``;

        // Current wind
        const currentWind = document.createElement('p');
        currentWind.textContent =
          ``;

        // Current humidity
        const currentHumid = document.createElement('p');
        currentHumid.textContent =
          ``;
  
        currentWeatherBody.append(currentWeatherDate, currentTemp, currentWind, currentHumid);
  
      // Weather forecast container
      const weatherForecastBody = document.createElement('div');
      weatherForecastBody.classList.add('fc-card-body');
      resultCard.append(weatherForecastBody);
  
        // Title
        const weatherForecastTitle = document.createElement('h4');
        weatherForecastTitle.textContent = '5-Day Forecast:'
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
            date1.innerHTML =
              `<strong>${dataList[0].dt_txt}</strong>`;

            // Day 1 temperature
            const temp1 = document.createElement('p');
            temp1.textContent =
              `Temp: ${dataList[0].main.temp} °F`;

            // Day 1 wind
            const wind1 = document.createElement('p');
            wind1.textContent =
              `Wind: ${dataList[0].wind.speed} Mph`;

            // Day 1 humidity
            const humid1 = document.createElement('p');
            humid1.textContent =
              `Humidity: ${dataList[0].main.humidity}%`;
        
            weatherCard1.append(date1, temp1, wind1, humid1);
        
          // Weather card 2
          const weatherCard2 = document.createElement('div');
          weatherCard2.classList.add('f-card-body');

            // Day 2 date
            const date2 = document.createElement('p');
            date2.innerHTML =
              `<strong>${dataList[8].dt_txt}</strong>`;

            // Day 2 temperature
            const temp2 = document.createElement('p');
            temp2.textContent =
              `Temp: ${dataList[8].main.temp} °F`;

            // Day 2 wind
            const wind2 = document.createElement('p');
            wind2.textContent =
              `Wind: ${dataList[8].wind.speed} Mph`;

            // Day 2 humidity
            const humid2 = document.createElement('p');
            humid2.textContent =
              `Humidity: ${dataList[8].main.humidity}%`;
        
            weatherCard2.append(date2, temp2, wind2, humid2);

          // Weather card 3
          const weatherCard3 = document.createElement('div');
          weatherCard3.classList.add('f-card-body');

            // Day 3 date
            const date3 = document.createElement('p');
            date3.innerHTML =
              `<strong>${dataList[16].dt_txt}</strong>`;

            // Day 3 temperature
            const temp3 = document.createElement('p');
            temp3.textContent =
              `Temp: ${dataList[16].main.temp} °F`;

            // Day 3 wind
            const wind3 = document.createElement('p');
            wind3.textContent =
              `Wind: ${dataList[16].wind.speed} Mph`;

            // Day 3 humidity
            const humid3 = document.createElement('p');
            humid3.textContent =
              `Humidity: ${dataList[16].main.humidity}%`;
        
            weatherCard3.append(date3, temp3, wind3, humid3);

          // Weather card 4
          const weatherCard4 = document.createElement('div');
          weatherCard4.classList.add('f-card-body');

            // Day 4 date
            const date4 = document.createElement('p');
            date4.innerHTML =
              `<strong>${dataList[24].dt_txt}</strong>`;

            // Day 4 temperature
            const temp4 = document.createElement('p');
            temp4.textContent =
              `Temp: ${dataList[24].main.temp} °F`;

            // Day 4 wind
            const wind4 = document.createElement('p');
            wind4.textContent =
              `Wind: ${dataList[24].wind.speed} Mph`;

            // Day 4 humidity
            const humid4 = document.createElement('p');
            humid4.textContent =
              `Humidity: ${dataList[24].main.humidity}%`;
        
            weatherCard4.append(date4, temp4, wind4, humid4);

          // Weather card 5
          const weatherCard5 = document.createElement('div');
          weatherCard5.classList.add('f-card-body');

            // Day 5 date
            const date5 = document.createElement('p');
            date5.innerHTML =
              `<strong>${dataList[32].dt_txt}</strong>`;

            // Day 5 temperature
            const temp5 = document.createElement('p');
            temp5.textContent =
              `Temp: ${dataList[32].main.temp} °F`;

            // Day 5 wind
            const wind5 = document.createElement('p');
            wind5.textContent =
              `Wind: ${dataList[32].wind.speed} Mph`;

            // Day 5 humidity
            const humid5 = document.createElement('p');
            humid5.textContent =
              `Humidity: ${dataList[32].main.humidity}%`;
        
            weatherCard5.append(date5, temp5, wind5, humid5);

            container1.append(weatherCard1, weatherCard2, weatherCard3, weatherCard4, weatherCard5);

    dataContainer.append(resultCard);
  }

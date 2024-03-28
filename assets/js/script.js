const searchEl = document.querySelector('#search-form');
const directGeoApiKey = 'f0d8b11b541461f5c9bb0d139ae4c34a';
const weatherDataApiKey = 'c7542432b88609520e1171d172ceb8be';
let cityNames = [];

//forecast api:      http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//direct geocoding:  http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=1&appid={API key}
//reverse geocoding: http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit=1&appid={API key}

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
    searchApi();
}

// Add event listener to search button
searchEl.addEventListener('submit', handleSearchSubmit);

// Convert city name to lat & long coordinates
function convertLatLong() {

let cityName = cityNames.pop(); 
let directGeoConv = 'http://api.openweathermap.org/geo/1.0/direct'

directGeoConv = `${directGeoConv}?q=${cityName}&limit=1&appid=${directGeoApiKey}`

fetch(directGeoConv)
    .then(function (response) {
        if (!response.ok) {
            throw response.json();
        }

        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
}

// Search the API and return weather data, given the lat and long coordinates
function searchApi(data, apiKey) {
    let weatherQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    let lat = data[0].lat
    let lon = data[0].lon

    weatherQueryUrl = `${weatherQueryUrl}?lat=${lat}lon=${lon}&appid=${weatherDataApiKey}`

    fetch(weatherQueryUrl)
    .then(function (response) {
        if(!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
}


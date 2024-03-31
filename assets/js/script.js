const dataContainer = document.querySelector('.data-container');
const searchEl = document.querySelector('#search-form');
const directGeoApiKey = 'f0d8b11b541461f5c9bb0d139ae4c34a';
const weatherDataApiKey = 'c7542432b88609520e1171d172ceb8be';
let cityNames = [];
let dataArr = [];

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
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

// Search the API and return weather data, given the lat and long coordinates
function searchApi(data) {
    let weatherQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    // let lat = data[0].lat
    // let lon = data[0].lon
    let lat = '41.4996574'
    let lon = '-81.6936772'

    weatherQueryUrl = `${weatherQueryUrl}?lat=${lat}&lon=${lon}&appid=${weatherDataApiKey}`

    fetch(weatherQueryUrl)
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then(data => {
        dataArr.push(data);
        console.log(data);
        console.log(dataArr);
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
    searchApi();
    printResults();
}

// Add event listener to search button
searchEl.addEventListener('submit', handleSearchSubmit);

function printResults() {
    console.log(dataArr[0].city.name);
  
    // set up `<div>` to hold result content
    const resultCard = document.createElement('div');
    resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');
  
    const resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);
  
    const titleEl = document.createElement('h3');
    titleEl.textContent = resultObj.title;
  
    const bodyContentEl = document.createElement('p');
    bodyContentEl.innerHTML =
      `<strong>Date:</strong>${resultObj.date}<br/>`;
  
    if (resultObj.subject) {
      bodyContentEl.innerHTML +=
        `<strong>Subjects:</strong>${resultObj.subject.join(', ')}<br/>`;
    } else {
      bodyContentEl.innerHTML +=
        '<strong>Subjects:</strong> No subject for this entry.';
    }
  
    if (resultObj.description) {
      bodyContentEl.innerHTML +=
        `<strong>Description:</strong>${resultObj.description[0]}`;
    } else {
      bodyContentEl.innerHTML +=
        '<strong>Description:</strong>  No description for this entry.';
    }
  
    const linkButtonEl = document.createElement('a');
    linkButtonEl.textContent = 'Read More';
    linkButtonEl.setAttribute('href', resultObj.url);
    linkButtonEl.classList.add('btn', 'btn-dark');
  
    resultBody.append(titleEl, bodyContentEl, linkButtonEl);
  
    resultContentEl.append(resultCard);
  }

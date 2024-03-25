const apiKey = "f0d8b11b541461f5c9bb0d139ae4c34a";
let cityLat = "";
let cityLong = "";

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key};

fetch(
    'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}'
);
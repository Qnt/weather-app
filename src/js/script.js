import { getGeolocationData, getWeatherData } from './api.js';

const search = async event => {
  const cityName = event.target.value.trim().toLowerCase();
  if (!cityName) {
    console.log('Enter a city');
    return;
  }
  const geoData = await getGeolocationData(cityName);
  if (!geoData.results) {
    console.log('No geodata!');
    return;
    //TODO propper handling
  }
  const lat = geoData.results[0].latitude;
  const lon = geoData.results[0].longitude;
  const weatherData = await getWeatherData(lat, lon);
  console.log(weatherData);
};

const init = () => {
  const searchInputEl = document.querySelector('#search-input');
  searchInputEl.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      search(event);
    }
  });
};

init();

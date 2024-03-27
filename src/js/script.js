import { getGeolocationData, getWeatherData } from './api.js';

const handleSearchBtnClick = async () => {
  const searchInputEl = document.querySelector('#search-input');
  const cityName = searchInputEl.value;
  const geoData = await getGeolocationData(cityName);
  if (!geoData.results) {
    console.log('No geodata!');
    return;
    //TODO propper handling
  }
  const lat = geoData.results[0].latitude;
  const lon = geoData.results[0].longitude;
  const weatherData = await getWeatherData(lat, lon);
};

const init = () => {
  const searchBtnEl = document.querySelector('.search');
  searchBtnEl.addEventListener('click', event => {
    event.preventDefault();
    handleSearchBtnClick();
  });
};

init();

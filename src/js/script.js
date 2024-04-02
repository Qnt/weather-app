import { getAirQualityData, getGeocodingData, getWeatherData } from './api.js';
import {
  aqiLevels,
  dayNames,
  getDescription,
  getIcon,
  uvIndices,
} from './weatherUtils.js';

let searchResults = [];
let weatherData = {};
let airQuialityData = {};
let city = {};

const resultsEl = document.querySelector('[data-search-results]');
const cityNameEl = document.querySelector('[data-city-name]');
const cityOtherEl = document.querySelector('[data-city-other]');
const currentSectionEl = document.querySelector('#current-section');
const hourlySectionEl = document.querySelector('#hourly-section');
const dailySectionEl = document.querySelector('#daily-section');
const currentOtherSectionEl = document.querySelector('#current-other-section');
const formEl = document.querySelector('.search-form');
const searchInputEl = document.querySelector('#search-input');

const render = async () => {
  cleanUpInput();
  renderCurrentSection();
  renderHourlySection();
  renderDailySection();
  renderCurrentOtherSection();
};

const cleanUpInput = () => {
  searchInputEl.value = '';
};

const renderCurrentSection = () => {
  const current = weatherData.current;
  currentSectionEl.classList.remove('hidden');
  cityNameEl.textContent = getCityName(city);
  cityOtherEl.textContent = getCityOther(city).join(', ');
  const descr = getDescription(current.weatherCode);
  const icon = getIcon(current.weatherCode, current.isDay);
  currentSectionEl.querySelector('[data-icon]').setAttribute('src', icon);
  setValue(currentSectionEl, '[data-temp]', current.temp);
  setValue(currentSectionEl, '[data-descr]', descr);
  setValue(currentSectionEl, '[data-apparent-temp]', current.apparentTemp);
};

const renderHourlySection = () => {
  hourlySectionEl.classList.remove('hidden');
  weatherData.hourly.forEach((hour, i) => {
    const icon = getIcon(hour.weatherCode, hour.isDay);
    hourlySectionEl.querySelector(`[data-icon-${i}]`).setAttribute('src', icon);
    const hourValue = hour.time.getHours().toString();
    const timeValue = `${hourValue.padStart(2, '0')}:00`;
    setValue(hourlySectionEl, `[data-time-${i}]`, timeValue);
    setValue(hourlySectionEl, `[data-temp-${i}]`, hour.temp);
    setValue(hourlySectionEl, `[data-precip-${i}]`, hour.precipitation);
  });
};

const renderDailySection = () => {
  dailySectionEl.classList.remove('hidden');
  weatherData.daily.forEach((day, i) => {
    const icon = getIcon(day.weatherCode);
    dailySectionEl.querySelector(`[data-icon-${i}]`).setAttribute('src', icon);
    const dayName = i === 0 ? 'Today' : getDayName(day.time);
    setValue(dailySectionEl, `[data-day-${i}]`, dayName);
    setValue(dailySectionEl, `[data-precip-${i}]`, day.precipitation);
    setValue(dailySectionEl, `[data-temp-max-${i}]`, day.tempMax);
    setValue(dailySectionEl, `[data-temp-min-${i}]`, day.tempMin);
  });
};

const renderCurrentOtherSection = () => {
  currentOtherSectionEl.classList.remove('hidden');
  const current = weatherData.current;

  const uvIndex = uvIndices.getDescr(current.uvIndex);
  const aqi = `${aqiLevels.getDescr(airQuialityData.aqi)} (${
    airQuialityData.aqi
  })`;
  setValue(currentOtherSectionEl, '[data-aqi]', aqi);
  setValue(currentOtherSectionEl, '[data-uv-index]', uvIndex);
  setValue(currentOtherSectionEl, '[data-humidity]', current.humidity);
  setValue(currentOtherSectionEl, '[data-wind]', current.windSpeed);
  setValue(currentOtherSectionEl, '[data-dew-point]', current.dewPoint);
  setValue(currentOtherSectionEl, '[data-pressure]', current.surfacePressure);
  setValue(currentOtherSectionEl, '[data-visibility]', current.visibility);
};

const getDayName = date => {
  const dayCode = date.getDay();
  return dayNames.get(dayCode);
};

const setValue = (parent, dataAttr, value) => {
  const el = parent.querySelector(dataAttr);
  el.textContent = value;
};

const handleSearch = async event => {
  const value = event.target.value;
  searchResults = await getGeocodingData(value);
  renderSearchResults();
};

const renderSearchResults = () => {
  resultsEl.replaceChildren();
  if (searchResults.length === 0) {
    resultsEl.classList.add('hidden');
    return;
  }
  resultsEl.classList.remove('hidden');
  searchResults.forEach((city, i) => {
    const liEl = document.createElement('li');
    const cityNameEl = document.createElement('p');
    const cityOtherEl = document.createElement('p');

    liEl.id = `city-${i}`;

    const cityName = getCityName(city);
    const other = getCityOther(city);

    cityNameEl.classList.add('city-name');
    cityOtherEl.classList.add('city-other');

    cityNameEl.textContent = `${cityName}`;
    cityOtherEl.textContent = other.join(', ');

    liEl.append(cityNameEl, cityOtherEl);
    resultsEl.appendChild(liEl);
  });
};

const getCityName = city => {
  return city?.name;
};

const getCityOther = city => {
  const admins = Object.entries(city)
    .filter(([key, value]) => /^admin\d*$/.test(key))
    .map(([key, value]) => value);
  return [city?.country, ...admins];
};

const debounce = (callee, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callee(...args), delay);
  };
};

const handleSearchDebounced = debounce(handleSearch, 1000);

const init = async () => {
  formEl.addEventListener('submit', event => {
    event.preventDefault();
  });
  searchInputEl.addEventListener('input', handleSearchDebounced);
  searchInputEl.addEventListener('blur', () => {
    setTimeout(() => {
      resultsEl.classList.add('hidden');
    }, 100);
  });
  searchInputEl.addEventListener('focus', event => {
    if (event.target.value) {
      resultsEl.classList.remove('hidden');
    }
  });
  resultsEl.addEventListener('click', async event => {
    if (
      event.target.tagName === 'LI' ||
      event.target.parentElement.tagName === 'LI'
    ) {
      const liEl =
        event.target.tagName === 'LI'
          ? event.target
          : event.target.parentElement;
      const indexInSearchResults = liEl.id.split('-')[1];
      city = searchResults[indexInSearchResults];
      weatherData = await getWeatherData(
        city.latitude,
        city.longitude,
        city.timezone
      );
      airQuialityData = await getAirQualityData(city.latitude, city.longitude);
      render(weatherData);
    }
  });
};

init();

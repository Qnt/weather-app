import { getAirQualityData, getGeocodingData, getWeatherData } from './api.js';
import { getDescription, getIcon } from './weather-codes.js';

const dayNames = new Map();

dayNames.set(0, 'Sunday');
dayNames.set(1, 'Monday');
dayNames.set(2, 'Tuesday');
dayNames.set(3, 'Wednesday');
dayNames.set(4, 'Thursday');
dayNames.set(5, 'Friday');
dayNames.set(6, 'Saturday');

const uvIndicesScale = new Map();
uvIndicesScale.set(0, 'Low');
uvIndicesScale.set(1, 'Low');
uvIndicesScale.set(2, 'Low');
uvIndicesScale.set(3, 'Moderate');
uvIndicesScale.set(4, 'Moderate');
uvIndicesScale.set(5, 'Moderate');
uvIndicesScale.set(6, 'High');
uvIndicesScale.set(7, 'High');
uvIndicesScale.set(8, 'Very high');
uvIndicesScale.set(9, 'Very high');
uvIndicesScale.set(10, 'Very high');
uvIndicesScale.set(11, 'Extreme');

const uvIndices = {
  scale: uvIndicesScale,
  maxValue: 11,
  getDescr(uvIndex) {
    return uvIndex > this.maxValue
      ? this.scale.get(this.maxValue)
      : this.scale.get(uvIndex);
  },
};

const aqiScale = new Map();
aqiScale.set(0, 'Good');
aqiScale.set(20, 'Fair');
aqiScale.set(40, 'Moderate');
aqiScale.set(60, 'Poor');
aqiScale.set(80, 'Very poor');
aqiScale.set(100, 'Expremely poor');

const aqiLevels = {
  levels: aqiScale,
  getDescr(aqi) {
    const entriesArray = [...this.levels.entries()].reverse();
    for (const [level, descr] of entriesArray) {
      if (aqi >= level) {
        return descr;
      }
    }
    return 'Unknown';
  },
};

let searchResults = [];
let airQuialityData = {};

const resultsEl = document.querySelector('[data-search-results]');
const cityNameEl = document.querySelector('[data-city-name]');
const cityOtherEl = document.querySelector('[data-city-other]');
const currentSectionEl = document.querySelector('#current-section');
const hourlySectionEl = document.querySelector('#hourly-section');
const dailySectionEl = document.querySelector('#daily-section');
const currentOtherSectionEl = document.querySelector('#current-other-section');
const formEl = document.querySelector('.search-form');
const searchInputEl = document.querySelector('#search-input');

const render = async (city, weatherData) => {
  renderCurrentSection(city, weatherData.current);
  renderHourlySection(weatherData.hourly);
  renderDailySection(weatherData.daily);
  renderCurrentOtherSection(weatherData.current);
};

const renderCurrentSection = (city, weatherData) => {
  currentSectionEl.classList.remove('hidden');
  cityNameEl.textContent = getCityName(city);
  cityOtherEl.textContent = getCityOther(city).join(', ');
  const descr = getDescription(weatherData.weatherCode);
  const icon = getIcon(weatherData.weatherCode, weatherData.isDay);
  currentSectionEl.querySelector('[data-icon]').setAttribute('src', icon);
  setValue(currentSectionEl, '[data-temp]', weatherData.temp);
  setValue(currentSectionEl, '[data-descr]', descr);
  setValue(currentSectionEl, '[data-apparent-temp]', weatherData.apparentTemp);
};

const renderHourlySection = data => {
  hourlySectionEl.classList.remove('hidden');
  data.forEach((hour, i) => {
    const icon = getIcon(hour.weatherCode, hour.isDay);
    hourlySectionEl.querySelector(`[data-icon-${i}]`).setAttribute('src', icon);
    const hourValue = hour.time.getHours().toString();
    const timeValue = `${hourValue.padStart(2, '0')}:00`;
    setValue(hourlySectionEl, `[data-time-${i}]`, timeValue);
    setValue(hourlySectionEl, `[data-temp-${i}]`, hour.temp);
    setValue(hourlySectionEl, `[data-precip-${i}]`, hour.precipitation);
  });
};

const renderDailySection = data => {
  dailySectionEl.classList.remove('hidden');
  data.forEach((day, i) => {
    const icon = getIcon(day.weatherCode);
    dailySectionEl.querySelector(`[data-icon-${i}]`).setAttribute('src', icon);
    const dayName = i === 0 ? 'Today' : getDayName(day.time);
    setValue(dailySectionEl, `[data-day-${i}]`, dayName);
    setValue(dailySectionEl, `[data-precip-${i}]`, day.precipitation);
    setValue(dailySectionEl, `[data-temp-max-${i}]`, day.tempMax);
    setValue(dailySectionEl, `[data-temp-min-${i}]`, day.tempMin);
  });
};

const renderCurrentOtherSection = data => {
  currentOtherSectionEl.classList.remove('hidden');

  const uvIndex = uvIndices.getDescr(data.uvIndex);
  const aqi = `${aqiLevels.getDescr(airQuialityData.aqi)} (${
    airQuialityData.aqi
  })`;
  setValue(currentOtherSectionEl, '[data-aqi]', aqi);
  setValue(currentOtherSectionEl, '[data-uv-index]', uvIndex);
  setValue(currentOtherSectionEl, '[data-humidity]', data.humidity);
  setValue(currentOtherSectionEl, '[data-wind]', data.windSpeed);
  setValue(currentOtherSectionEl, '[data-dew-point]', data.dewPoint);
  setValue(currentOtherSectionEl, '[data-pressure]', data.surfacePressure);
  setValue(currentOtherSectionEl, '[data-visibility]', data.visibility);
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
  console.log(value);
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
      const city = searchResults[indexInSearchResults];
      const weatherData = await getWeatherData(
        city.latitude,
        city.longitude,
        city.timezone
      );
      airQuialityData = await getAirQualityData(city.latitude, city.longitude);
      render(city, weatherData);
    }
  });
};

init();

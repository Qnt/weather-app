import getWeatherData from './api.js';
import { getDescription, getIcon } from './weather-codes.js';

const render = async weatherData => {
  renderCurrentSection(weatherData.current);
  renderHourlySection(weatherData.hourly);
};

const renderCurrentSection = data => {
  const sectionEl = document.querySelector('[data-current-section]');
  const descr = getDescription(data.weatherCode);
  const icon = getIcon(data.weatherCode, data.isDay);
  sectionEl.querySelector('[data-icon]').setAttribute('src', icon);
  setValue(sectionEl, '[data-temp]', data.temp);
  setValue(sectionEl, '[data-descr]', descr);
  setValue(sectionEl, '[data-apparent-temp]', data.apparentTemp);
};

const renderHourlySection = data => {
  const sectionEl = document.querySelector('[data-hourly-section]');

  data.forEach((hour, i) => {
    const icon = getIcon(hour.weatherCode, hour.isDay);
    sectionEl.querySelector(`[data-icon-${i}]`).setAttribute('src', icon);

    const hourValue = hour.time.getHours().toString();
    const timeValue = `${hourValue.padStart(2, '0')}:00`;
    setValue(sectionEl, `[data-time-${i}]`, timeValue);
    setValue(sectionEl, `[data-temp-${i}]`, hour.temp);
    setValue(sectionEl, `[data-precip-${i}]`, hour.precipitation);
  });
};

const setValue = (parent, dataAttr, value) => {
  const el = parent.querySelector(dataAttr);
  el.textContent = value;
};

const init = async () => {
  const searchInputEl = document.querySelector('#search-input');
  searchInputEl.addEventListener('keydown', async event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const cityName = event.target.value.trim().toLowerCase();
      if (!cityName) {
        console.log('Enter city');
        return;
      }
      const weatherData = await getWeatherData(cityName);

      console.log(weatherData);
      render(weatherData);
    }
  });
};

init();

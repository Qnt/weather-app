const WEATHER_QUERY_PARAMS = {
  current: [
    'temperature_2m',
    'relative_humidity_2m',
    'apparent_temperature',
    'is_day',
    'weather_code',
    'wind_speed_10m',
    'wind_direction_10m',
  ],
  hourly: [
    'temperature_2m',
    'relative_humidity_2m',
    'precipitation_probability',
    'weather_code',
  ],
  daily: [
    'weather_code',
    'temperature_2m_max',
    'temperature_2m_min',
    'sunrise',
    'sunset',
    'daylight_duration',
    'sunshine_duration',
    'precipitation_probability_max',
  ],
  timezone: 'auto',
};

const GEO_QUERY_PARAMS = {
  count: 10,
  language: 'en',
  format: 'json',
};

const weatherApiUrl = 'https://api.open-meteo.com/v1/forecast';
const geoApiUrl = 'https://geocoding-api.open-meteo.com/v1/search';

const generateURL = (url, queryParams) => {
  const resultURL = new URL(url);

  for (const [key, value] of Object.entries(queryParams)) {
    resultURL.searchParams.set(key, value);
  }
  return resultURL;
};

const getDataFromAPI = async url => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Error occurred!');
    }
    return await res.json();
  } catch (error) {
    console.error(error.message);
  }
};

export const getGeolocationData = async name => {
  const url = generateURL(geoApiUrl, { name, ...GEO_QUERY_PARAMS });
  return await getDataFromAPI(url);
};

export const getWeatherData = async (lat, lon) => {
  const url = generateURL(weatherApiUrl, {
    latitude: lat,
    longitude: lon,
    ...WEATHER_QUERY_PARAMS,
  });
  return await getDataFromAPI(url);
};

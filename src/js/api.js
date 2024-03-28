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
    'apparent_temperature',
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
    'precipitation_probability_max',
  ],
  timezone: 'auto',
};

const GEO_QUERY_PARAMS = {
  count: 10,
  language: 'en',
  format: 'json',
};

const geoApiUrl = 'https://geocoding-api.open-meteo.com/v1/search';
const weatherApiUrl = 'https://api.open-meteo.com/v1/forecast';

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

const generateURL = (url, queryParams) => {
  const resultURL = new URL(url);

  for (const [key, value] of Object.entries(queryParams)) {
    resultURL.searchParams.set(key, value);
  }
  return resultURL;
};

const getGeolocationData = async name => {
  const url = generateURL(geoApiUrl, { name, ...GEO_QUERY_PARAMS });
  return await getDataFromAPI(url);
};

const getWeatherData = async city => {
  const geolocationData = await getGeolocationData(city);
  const url = generateURL(weatherApiUrl, {
    latitude: geolocationData.results[0].latitude,
    longitude: geolocationData.results[0].longitude,
    ...WEATHER_QUERY_PARAMS,
  });
  const weatherData = await getDataFromAPI(url);

  return adaptWeatherData(weatherData);
};

const adaptWeatherData = data => {
  const current = data.current;
  const hourly = data.hourly;
  const daily = data.daily;

  const parsedData = {
    current: {
      temp: Math.round(current.temperature_2m),
      apparentTemp: Math.round(current.apparent_temperature),
      isDay: current.is_day,
      humidity: Math.round(current.relative_humidity_2m),
      weatherCode: current.weather_code,
      windSpeed: Math.round(current.wind_speed_10m),
      windDirection: Math.round(current.wind_direction_10m),
      precipitation: Math.round(current.precipitation),
    },
    hourly: hourly.time.map((time, index) => {
      return {
        time,
        temp: Math.round(hourly.temperature_2m[index]),
        apparentTemp: Math.round(hourly.apparent_temperature[index]),
        precipitation: Math.round(hourly.precipitation_probability[index]),
        weatherCode: hourly.weather_code,
      };
    }),
    daily: daily.time.map((time, index) => {
      return {
        time,
        tempMax: Math.round(daily.temperature_2m_max[index]),
        tempMin: Math.round(daily.temperature_2m_min[index]),
        precipitation: Math.round(daily.precipitation_probability_max[index]),
        sunrise: daily.sunrise[index],
        sunset: daily.sunset[index],
        weatherCode: daily.weather_code,
      };
    }),
  };

  return parsedData;
};

export default getWeatherData;

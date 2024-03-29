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
    'is_day',
  ],
  daily: [
    'weather_code',
    'temperature_2m_max',
    'temperature_2m_min',
    'sunrise',
    'sunset',
    'precipitation_probability_max',
  ],
  forecast_hours: 25,
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
    timezone: geolocationData.results[0].timezone,
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
      time: new Date(current.time),
      temp: Math.round(current.temperature_2m),
      apparentTemp: Math.round(current.apparent_temperature),
      isDay: current.is_day,
      humidity: Math.round(current.relative_humidity_2m),
      weatherCode: current.weather_code,
      windSpeed: Math.round(current.wind_speed_10m),
      windDirection: Math.round(current.wind_direction_10m),
    },
    hourly: hourly.time.slice(1).map((time, i) => {
      return {
        time: new Date(time),
        temp: Math.round(hourly.temperature_2m[i]),
        apparentTemp: Math.round(hourly.apparent_temperature[i]),
        precipitation: Math.round(hourly.precipitation_probability[i]),
        weatherCode: hourly.weather_code[i],
        isDay: hourly.is_day[i],
      };
    }),
    daily: daily.time.map((time, i) => {
      return {
        time: new Date(time),
        tempMax: Math.round(daily.temperature_2m_max[i]),
        tempMin: Math.round(daily.temperature_2m_min[i]),
        precipitation: Math.round(daily.precipitation_probability_max[i]),
        sunrise: daily.sunrise[i],
        sunset: daily.sunset[i],
        weatherCode: daily.weather_code[i],
      };
    }),
  };

  return parsedData;
};

export default getWeatherData;

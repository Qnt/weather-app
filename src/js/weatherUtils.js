const weatherCodes = {
  0: {
    description: 'Sunny',
    icon: {
      day: 'src/assets/icons/clear-svgrepo-com.svg',
      night: 'src/assets/icons/sunny-night-svgrepo-com.svg',
    },
  },
  1: {
    description: 'Mainly Sunny',
    icon: {
      day: 'src/assets/icons/clear-svgrepo-com.svg',
      night: 'src/assets/icons/sunny-night-svgrepo-com.svg',
    },
  },
  2: {
    description: 'Partly Cloudy',
    icon: {
      day: 'src/assets/icons/partly-cloudy-svgrepo-com.svg',
      night: 'src/assets/icons/cloudy-night-svgrepo-com.svg',
    },
  },
  3: {
    description: 'Cloudy',
    icon: {
      day: 'src/assets/icons/negative-svgrepo-com.svg',
      night: 'src/assets/icons/negative-svgrepo-com.svg',
    },
  },
  45: {
    description: 'Foggy',
    icon: {
      day: 'src/assets/icons/fog-svgrepo-com.svg',
      night: 'src/assets/icons/night-fog-svgrepo-com.svg',
    },
  },
  48: {
    description: 'Rime Fog',
    icon: {
      day: 'src/assets/icons/fog-svgrepo-com.svg',
      night: 'src/assets/icons/night-fog-svgrepo-com.svg',
    },
  },
  51: {
    description: 'Light Drizzle',
    icon: {
      day: 'src/assets/icons/light-rain-svgrepo-com.svg',
      night: 'src/assets/icons/light-rain-svgrepo-com.svg',
    },
  },
  53: {
    description: 'Drizzle',
    icon: {
      day: 'src/assets/icons/light-rain-svgrepo-com.svg',
      night: 'src/assets/icons/light-rain-svgrepo-com.svg',
    },
  },
  55: {
    description: 'Heavy Drizzle',
    icon: {
      day: 'src/assets/icons/light-rain-svgrepo-com.svg',
      night: 'src/assets/icons/light-rain-svgrepo-com.svg',
    },
  },
  56: {
    description: 'Light Freezing Drizzle',
    icon: {
      day: 'src/assets/icons/light-rain-svgrepo-com.svg',
      night: 'src/assets/icons/light-rain-svgrepo-com.svg',
    },
  },
  57: {
    description: 'Freezing Drizzle',
    icon: {
      day: 'src/assets/icons/light-rain-svgrepo-com.svg',
      night: 'src/assets/icons/light-rain-svgrepo-com.svg',
    },
  },
  61: {
    description: 'Light Rain',
    icon: {
      day: 'src/assets/icons/light-rain-svgrepo-com.svg',
      night: 'src/assets/icons/light-rain-svgrepo-com.svg',
    },
  },
  63: {
    description: 'Rain',
    icon: {
      day: 'src/assets/icons/moderate-rain-svgrepo-com.svg',
      night: 'src/assets/icons/moderate-rain-svgrepo-com.svg',
    },
  },
  65: {
    description: 'Heavy Rain',
    icon: {
      day: 'src/assets/icons/heavy-rain-svgrepo-com.svg',
      night: 'src/assets/icons/heavy-rain-svgrepo-com.svg',
    },
  },
  66: {
    description: 'Light Freezing Rain',
    icon: {
      day: 'src/assets/icons/light-rain-svgrepo-com.svg',
      night: 'src/assets/icons/light-rain-svgrepo-com.svg',
    },
  },
  67: {
    description: 'Freezing Rain',
    icon: {
      day: 'src/assets/icons/moderate-rain-svgrepo-com.svg',
      night: 'src/assets/icons/moderate-rain-svgrepo-com.svg',
    },
  },
  71: {
    description: 'Light Snow',
    icon: {
      day: 'src/assets/icons/light-snow-svgrepo-com.svg',
      night: 'src/assets/icons/light-snow-svgrepo-com.svg',
    },
  },
  73: {
    description: 'Snow',
    icon: {
      day: 'src/assets/icons/moderate-snow-svgrepo-com.svg',
      night: 'src/assets/icons/moderate-snow-svgrepo-com.svg',
    },
  },
  75: {
    description: 'Heavy Snow',
    icon: {
      day: 'src/assets/icons/heavy-snow-svgrepo-com.svg',
      night: 'src/assets/icons/heavy-snow-svgrepo-com.svg',
    },
  },
  77: {
    description: 'Snow Grains',
    icon: {
      day: 'src/assets/icons/heavy-snow-svgrepo-com.svg',
      night: 'src/assets/icons/heavy-snow-svgrepo-com.svg',
    },
  },
  80: {
    description: 'Light Showers',
    icon: {
      day: 'src/assets/icons/shower-svgrepo-com.svg',
      night: 'src/assets/icons/night-showers-svgrepo-com.svg',
    },
  },
  81: {
    description: 'Showers',
    icon: {
      day: 'src/assets/icons/shower-svgrepo-com.svg',
      night: 'src/assets/icons/night-showers-svgrepo-com.svg',
    },
  },
  82: {
    description: 'Heavy Showers',
    icon: {
      day: 'src/assets/icons/shower-svgrepo-com.svg',
      night: 'src/assets/icons/night-showers-svgrepo-com.svg',
    },
  },
  85: {
    description: 'Light Snow Showers',
    icon: {
      day: 'src/assets/icons/snow-showers-svgrepo-com.svg',
      night: 'src/assets/icons/snow-showers-at-night-svgrepo-com.svg',
    },
  },
  86: {
    description: 'Snow Showers',
    icon: {
      day: 'src/assets/icons/snow-showers-svgrepo-com.svg',
      night: 'src/assets/icons/snow-showers-at-night-svgrepo-com.svg',
    },
  },
  95: {
    description: 'Thunderstorm',
    icon: {
      day: 'src/assets/icons/thunderstorm-svgrepo-com.svg',
      night: 'src/assets/icons/thunderstorm-svgrepo-com.svg',
    },
  },
  96: {
    description: 'Light Thunderstorms With Hail',
    icon: {
      day: 'src/assets/icons/thunderstorm-svgrepo-com.svg',
      night: 'src/assets/icons/thunderstorm-svgrepo-com.svg',
    },
  },
  99: {
    description: 'Thunderstorm With Hail',
    icon: {
      day: 'src/assets/icons/thunderstorm-svgrepo-com.svg',
      night: 'src/assets/icons/thunderstorm-svgrepo-com.svg',
    },
  },
};

const getDescription = code => {
  if (!Object.hasOwn(weatherCodes, code)) {
    return;
  }
  return weatherCodes[code].description;
};

const getIcon = (code, isDay = 1) => {
  if (!Object.hasOwn(weatherCodes, code)) {
    return;
  }
  const timeOfDay = isDay ? 'day' : 'night';
  return weatherCodes[code].icon[timeOfDay];
};

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

export { aqiLevels, dayNames, getDescription, getIcon, uvIndices };

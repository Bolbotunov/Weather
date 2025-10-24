import { HourlyWeatherData, OpenWeatherForecastEntry } from '@/types/types';
import { getWeatherUrl } from '@/utils/getWeatherUrl';

export const getHourlyWeather = async (
  lat: number,
  lon: number,
): Promise<HourlyWeatherData[]> => {
  const response = await fetch(
    getWeatherUrl({ endpoint: 'forecast', lat, lon }),
  );
  if (!response.ok) {
    throw new Error('Error fetching hourly weather');
  }
  const data = await response.json();

  return data.list.slice(0, 8).map((entry: OpenWeatherForecastEntry) => ({
    temperature: Math.round(entry.main.temp),
    condition: entry.weather[0].main,
    windSpeed: Math.round(entry.wind.speed),
    time: entry.dt * 1000,
  }));
};

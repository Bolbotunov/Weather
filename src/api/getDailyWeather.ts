import { OpenWeatherForecastEntry } from '@/types/types';
import { getWeatherUrl } from '@/utils/getWeatherUrl';

export const getDailyWeather = async (
  lat: number,
  lon: number,
): Promise<OpenWeatherForecastEntry[]> => {
  const response = await fetch(
    getWeatherUrl({ endpoint: 'forecast', lat, lon }),
  );
  if (!response.ok) throw new Error('Error fetching daily weather');

  const data = await response.json();
  const map = new Map<string, OpenWeatherForecastEntry>();

  data.list.forEach((entry: OpenWeatherForecastEntry) => {
    const dateKey = new Date(entry.dt * 1000).toDateString();
    if (!map.has(dateKey)) {
      map.set(dateKey, entry);
    }
  });
  return Array.from(map.values()).slice(0, 7);
};

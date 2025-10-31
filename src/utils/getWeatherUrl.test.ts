import { API_KEY } from '@/config/env';
import { getWeatherUrl } from '@/utils/getWeatherUrl';

describe('getWeatherUrl', () => {
  const lat = 53.9;
  const lon = 27.5667;
  const query = 'Minsk';

  it('returns correct URL for weather endpoint', () => {
    const url = getWeatherUrl({ endpoint: 'weather', lat, lon });
    expect(url).toBe(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
    );
  });

  it('returns correct URL for forecast endpoint', () => {
    const url = getWeatherUrl({ endpoint: 'forecast', lat, lon });
    expect(url).toBe(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
    );
  });

  it('returns correct URL for geo endpoint', () => {
    const url = getWeatherUrl({ endpoint: 'geo', query });
    expect(url).toBe(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`,
    );
  });
});

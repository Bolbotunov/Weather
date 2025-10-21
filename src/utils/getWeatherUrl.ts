import { API_KEY } from '@/constants/constants';

const BASE_URL = 'https://api.openweathermap.org';

type WeatherParams =
  | { endpoint: 'weather' | 'forecast'; lat: number; lon: number }
  | { endpoint: 'geo'; query: string };

export function getWeatherUrl(params: WeatherParams): string {
  const common = `units=metric&appid=${API_KEY}`;

  switch (params.endpoint) {
    case 'weather':
    case 'forecast':
      return `${BASE_URL}/data/2.5/${params.endpoint}?lat=${params.lat}&lon=${params.lon}&${common}`;
    case 'geo':
      return `${BASE_URL}/geo/1.0/direct?q=${params.query}&limit=5&appid=${API_KEY}`;
  }
}

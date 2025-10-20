import { API_KEY } from '@/constants/constants';
import { WeatherData } from '@/types/types';

export const getCurrentWeather = async (
  lat?: number,
  lon?: number,
): Promise<WeatherData> => {
  if (lat == null || lon == null) {
    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported');
    }

    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      },
    );

    lat = position.coords.latitude;
    lon = position.coords.longitude;
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
  );
  if (!response.ok) {
    throw new Error('Error getting weather');
  }
  const data = await response.json();
  return {
    temperature: Math.round(data.main.temp),
    condition: data.weather[0].main,
    city: data.name,
  };
};

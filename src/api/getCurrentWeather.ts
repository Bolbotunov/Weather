import { API_KEY } from '@/constants/constants';
import { WeatherData } from '@/types/types';

export const getCurrentWeather = (): Promise<WeatherData> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`,
          );
          if (!response.ok) {
            throw new Error('Error getting weather');
          }
          const data = await response.json();
          resolve({
            temperature: Math.round(data.main.temp),
            condition: data.weather[0].main,
            city: data.name,
          });
        } catch (err) {
          reject(err);
        }
      },
      (error) => {
        reject(new Error('Failed to get geolocation'));
        console.error(error);
      },
    );
  });
};

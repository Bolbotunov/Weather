import { FC } from 'react';

import CloudsIcon from '@/assets/cloudsIcon.svg?react';

export type LocationData = {
  latitude: number;
  longitude: number;
  city?: string;
};

export type WeatherData = {
  temperature: number;
  condition: WeatherConditionIcons;
  city: string;
};

export type BlockProps = {
  size: BlockSize;
  className?: string;
  gridClass?: string;
  children?: React.ReactNode;
};

export enum BlockSize {
  CurrentWeatherCard = 'currentWeatherCard',
  DailyBlock = 'dailyBlock',
  HourlyBlock = 'hourlyBlock',
  RunningLine = 'runningLine',
  UserBlock = 'userBlock',
  WeatherIconBlock = 'weatherIconBlock',
}

export enum WeatherConditionIcons {
  Rainy = 'Rainy',
  Thunderstorm = 'Thunderstorm',
  Stormy = 'Stormy',
  Sunny = 'Sunny',
  Snow = 'Snow',
  Overcast = 'Overcast',
  PartlyCloudy = 'PartlyCloudy',
  Windy = 'Windy',
  Clouds = 'Clouds',
  Fog = 'Fog',
  HeavyRain = 'HeavyRain',
  Hail = 'Hail',
}

export const weatherIcons: Record<WeatherConditionIcons, FC> = {
  Rainy: CloudsIcon,
  Thunderstorm: CloudsIcon,
  Stormy: CloudsIcon,
  Sunny: CloudsIcon,
  Snow: CloudsIcon,
  Overcast: CloudsIcon,
  PartlyCloudy: CloudsIcon,
  Windy: CloudsIcon,
  Clouds: CloudsIcon,
  Fog: CloudsIcon,
  HeavyRain: CloudsIcon,
  Hail: CloudsIcon,
};

export type LocationSuggestion = {
  name: string;
  country: string;
  lat: number;
  lon: number;
};

export type AppState = {
  weather: WeatherData | null;
  suggestions: LocationSuggestion[];
};

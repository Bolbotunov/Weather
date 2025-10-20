import { FC } from 'react';

import CloudsIcon from '@/assets/CloudsIcon.svg?react';
import DrizzleIcon from '@/assets/DrizzleIcon.svg?react';
import FogIcon from '@/assets/FogIcon.svg?react';
import RainyIcon from '@/assets/RainyIcon.svg?react';
import SnowIcon from '@/assets/SnowIcon.svg?react';
import SquallIcon from '@/assets/SquallIcon.svg?react';
import SunnyIcon from '@/assets/SunnyIcon.svg?react';
import ThunderStormIcon from '@/assets/ThunderStormIcon.svg?react';

export type LocationData = {
  latitude: number;
  longitude: number;
  city?: string;
};

export type WeatherData = {
  temperature: number;
  condition: WeatherCondition;
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

export enum WeatherCondition {
  Clouds = 'Clouds',
  Clear = 'Clear',
  Rain = 'Rain',
  Drizzle = 'Drizzle',
  Thunderstorm = 'Thunderstorm',
  Snow = 'Snow',
  Fog = 'Fog',
  Squall = 'Squall',
}

export type WeatherThemeKey =
  | 'sunny'
  | 'cloudy'
  | 'rainy'
  | 'thunderstorm'
  | 'snow'
  | 'fog'
  | 'windy';

export const weatherConfig: Record<
  WeatherCondition,
  {
    icon: FC;
    theme: WeatherThemeKey;
  }
> = {
  [WeatherCondition.Clear]: {
    icon: SunnyIcon,
    theme: 'sunny',
  },
  [WeatherCondition.Clouds]: {
    icon: CloudsIcon,
    theme: 'cloudy',
  },
  [WeatherCondition.Rain]: {
    icon: RainyIcon,
    theme: 'rainy',
  },
  [WeatherCondition.Drizzle]: {
    icon: DrizzleIcon,
    theme: 'rainy',
  },
  [WeatherCondition.Thunderstorm]: {
    icon: ThunderStormIcon,
    theme: 'thunderstorm',
  },
  [WeatherCondition.Snow]: {
    icon: SnowIcon,
    theme: 'snow',
  },
  [WeatherCondition.Fog]: {
    icon: FogIcon,
    theme: 'fog',
  },
  [WeatherCondition.Squall]: {
    icon: SquallIcon,
    theme: 'windy',
  },
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
  theme: string;
};

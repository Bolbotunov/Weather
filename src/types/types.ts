import { FC } from 'react';

import CloudsIcon from '@/assets/CloudsIcon.svg?react';
import DrizzleIcon from '@/assets/DrizzleIcon.svg?react';
import FogIcon from '@/assets/FogIcon.svg?react';
import RainyIcon from '@/assets/RainyIcon.svg?react';
import SnowIcon from '@/assets/SnowIcon.svg?react';
import SquallIcon from '@/assets/SquallIcon.svg?react';
import SunnyIcon from '@/assets/SunnyIcon.svg?react';
import ThunderStormIcon from '@/assets/ThunderStormIcon.svg?react';

export enum AppRoutes {
  CONTENT = '/',
  NOTFOUND = '*',
}

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
export enum BlockSize {
  CurrentWeatherCard = 'currentWeatherCard',
  DailyBlock = 'dailyBlock',
  HourlyBlock = 'hourlyBlock',
  RunningLine = 'runningLine',
  UserBlock = 'userBlock',
  WeatherIconBlock = 'weatherIconBlock',
}

export type BlockProps = {
  size: BlockSize;
  className?: string;
  gridClass?: string;
  children?: React.ReactNode;
};

export type SubBlockProps = {
  size: SubBlockSize;
  children: React.ReactNode;
  className?: string;
};

export enum SubBlockSize {
  HourlySubBlock = 'hourlySubBlock',
  UserSubBlock = 'userSubBlock',
  NoTasksSubBlock = 'noTasksSubBlock',
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
  hourlyWeather: HourlyWeatherData[];
  dailyWeather: OpenWeatherForecastEntry[];
  selectedDate: string;
};

export type HourlyWeatherData = {
  temperature: number;
  condition: WeatherCondition;
  windSpeed: number;
  time: number;
};

export type OpenWeatherForecastEntry = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
  };
  weather: {
    main: WeatherCondition;
  }[];
  wind: {
    speed: number;
  };
  pop: number;
  uvi: number;
};

export type GoogleCalendarEventRaw = {
  id: string;
  summary: string;
  start: {
    dateTime?: string;
    date?: string;
  };
};

export type DailySliderProps = {
  forecast: OpenWeatherForecastEntry[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  handleDayChange?: (index: number) => void;
};

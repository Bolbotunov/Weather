import { ReactElement, ReactNode } from 'react';

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
  loading: boolean;
  error: string | null;
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

export type CalendarEventProps = {
  id: string;
  summary: string;
  start: string;
};

export type ChildrenProps = {
  children?: ReactNode;
};

export type BoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export type WeatherIconWrapperProps = {
  icon: ReactElement;
  variant?: 'big' | 'small' | 'extraSmall';
};

export type OpenWeatherForecastEntryProps = {
  conditions: OpenWeatherForecastEntry;
};

export type ClassNameProps = {
  className?: string;
};

export type WeatherSliderProps = {
  hourlyWeather: HourlyWeatherData[];
};

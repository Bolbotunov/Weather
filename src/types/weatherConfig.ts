import { FC } from 'react';

import CloudsIcon from '@/assets/CloudsIcon.svg?react';
import DrizzleIcon from '@/assets/DrizzleIcon.svg?react';
import FogIcon from '@/assets/FogIcon.svg?react';
import RainyIcon from '@/assets/RainyIcon.svg?react';
import SnowIcon from '@/assets/SnowIcon.svg?react';
import SquallIcon from '@/assets/SquallIcon.svg?react';
import SunnyIcon from '@/assets/SunnyIcon.svg?react';
import ThunderStormIcon from '@/assets/ThunderStormIcon.svg?react';

import { WeatherCondition, WeatherThemeKey } from './types';

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

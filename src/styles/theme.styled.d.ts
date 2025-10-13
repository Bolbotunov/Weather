import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      rainy: string;
      thunderstorm: string;
      stormy: string;
      sunny: string;
      snow: string;
      overcast: string;
      partlyCloudy: string;
      windy: string;
      cloudy: string;
      fog: string;
      heavyRain: string;
      hail: string;
    };
    fonts: {
      family: string;
      size: {
        font12: string;
        font16: string;
        font20: string;
        font24: string;
        font32: string;
        font48: string;
      };
      weight: {
        regular: number;
        medium: number;
      };
    };
  }
}

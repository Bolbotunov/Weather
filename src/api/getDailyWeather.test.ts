import { getDailyWeather } from '@/api/getDailyWeather';
import { WeatherCondition } from '@/types/types';

jest.mock('@/utils/getFormatDate', () => ({
  formatDate: jest.fn(),
  FormatType: { RawDate: 'RawDate' },
}));

import { formatDate } from '@/utils/getFormatDate';

describe('getDailyWeather', () => {
  const mockLat = 53.9;

  const mockLon = 27.5667;

  const mockApiResponse = {
    ok: true,
    json: async () => ({
      list: [
        {
          dt: 123456,
          main: { temp: 10, feels_like: 8 },
          weather: [{ main: WeatherCondition.Clouds }],
          wind: { speed: 5 },
          pop: 0.1,
          uvi: 2.5,
        },
        {
          dt: 123457,
          main: { temp: 12, feels_like: 10 },
          weather: [{ main: WeatherCondition.Clear }],
          wind: { speed: 3 },
          pop: 0.2,
          uvi: 3.0,
        },
        {
          dt: 123456,
          main: { temp: 13, feels_like: 11 },
          weather: [{ main: WeatherCondition.Rain }],
          wind: { speed: 4 },
          pop: 0.3,
          uvi: 1.5,
        },
      ],
    }),
  };

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue(mockApiResponse);
    (formatDate as jest.Mock).mockImplementation((dt: number) => {
      return dt === 123456 ? '2025-10-29' : '2025-10-30';
    });
  });

  it('returns deduplicated daily weather data (max 7)', async () => {
    const result = await getDailyWeather(mockLat, mockLon);

    expect(result).toEqual([
      {
        dt: 123456,
        main: { temp: 10, feels_like: 8 },
        weather: [{ main: WeatherCondition.Clouds }],
        wind: { speed: 5 },
        pop: 0.1,
        uvi: 2.5,
      },
      {
        dt: 123457,
        main: { temp: 12, feels_like: 10 },
        weather: [{ main: WeatherCondition.Clear }],
        wind: { speed: 3 },
        pop: 0.2,
        uvi: 3.0,
      },
    ]);

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('forecast'));
    expect(formatDate).toHaveBeenCalledTimes(3);
  });

  it('throws error when response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(getDailyWeather(mockLat, mockLon)).rejects.toThrow(
      'Error fetching daily weather',
    );
  });
});

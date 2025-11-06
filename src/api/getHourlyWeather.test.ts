import { getHourlyWeather } from '@/api/getHourlyWeather';
import { WeatherCondition } from '@/types/types';

jest.mock('@/constants/constants');

describe('getHourlyWeather', () => {
  const mockLat = 53.9;

  const mockLon = 27.5667;

  const mockApiResponse = {
    ok: true,
    json: async () => ({
      list: [
        {
          dt: 123456,
          main: { temp: 10 },
          weather: [{ main: WeatherCondition.Clouds }],
          wind: { speed: 5 },
        },
        {
          dt: 123457,
          main: { temp: 12 },
          weather: [{ main: WeatherCondition.Clear }],
          wind: { speed: 3.5 },
        },
      ],
    }),
  };

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue(mockApiResponse);
  });

  it('returns transformed hourly weather data', async () => {
    const result = await getHourlyWeather(mockLat, mockLon);

    expect(result).toEqual([
      {
        temperature: 10,
        condition: WeatherCondition.Clouds,
        windSpeed: 5,
        time: 123456000,
      },
      {
        temperature: 12,
        condition: WeatherCondition.Clear,
        windSpeed: 4,
        time: 123457000,
      },
    ]);

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('forecast'));
  });

  it('throws error when response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(getHourlyWeather(mockLat, mockLon)).rejects.toThrow(
      'Error fetching hourly weather',
    );
  });
});

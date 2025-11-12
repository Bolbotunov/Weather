import { getCurrentWeather } from '@/api/getCurrentWeather';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        main: { temp: 22.5 },
        weather: [{ main: 'Clear' }],
        name: 'Minsk',
      }),
  }),
) as jest.Mock;

describe('getCurrentWeather', () => {
  it('returns parsed weather data', async () => {
    const result = await getCurrentWeather(53.9, 27.5667);
    expect(result).toEqual({
      temperature: 23,
      condition: 'Clear',
      city: 'Minsk',
      lat: 53.9,
      lon: 27.5667,
    });
  });

  it('throws error if response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(getCurrentWeather(53.9, 27.5667)).rejects.toThrow(
      'Error getting weather',
    );
  });
});

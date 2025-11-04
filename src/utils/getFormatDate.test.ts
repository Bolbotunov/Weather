import { formatDate, FormatType } from './getFormatDate';

describe('formatDate', () => {
  const timestamp = Date.UTC(2026, 0, 31) / 1000;

  it('returns full date format', () => {
    const result = formatDate(timestamp, FormatType.FullDate);
    expect(result).toBe('Sat | Jan 31, 2026');
  });

  it('returns short date format', () => {
    const result = formatDate(timestamp, FormatType.ShortDate);
    expect(result).toBe('Jan 31');
  });

  it('returns 12-hour time format', () => {
    const result = formatDate(timestamp, FormatType.Time12);
    expect(result).toMatch(/^\d{2}:\d{2} [AP]M$/);
  });

  it('returns 24-hour time format', () => {
    const result = formatDate(timestamp, FormatType.Time24);
    expect(result).toMatch(/^\d{2}:\d{2}$/);
  });

  it('returns raw date string', () => {
    const result = formatDate(timestamp, FormatType.RawDate);
    expect(result).toBe('Sat Jan 31 2026');
  });

  it('returns invalid date', () => {
    const result = formatDate(NaN, FormatType.RawDate);
    expect(result).toBe('Invalid Date');
  });

  it('returns incorrect date format', () => {
    const result = formatDate(timestamp, FormatType.RawDate);
    expect(result).not.toBe('Sat 31 Jan 2026');
    const shortDate = formatDate(timestamp, FormatType.ShortDate);
    expect(shortDate).not.toBe('31 Jan');
    const rawDate = formatDate(timestamp, FormatType.RawDate);
    expect(rawDate).not.toBe('Sat 31 Jan 2026');
    const time12 = formatDate(timestamp, FormatType.Time12);
    expect(time12).not.toMatch(/^\d{2}:\d{2}$/);
    const time24 = formatDate(timestamp, FormatType.Time24);
    expect(time24).not.toMatch(/^\d{2}:\d{2} [AP]M$/);
  });
});

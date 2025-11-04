export enum FormatType {
  FullDate = 'fullDate',
  ShortDate = 'shortDate',
  Time12 = 'time12',
  Time24 = 'time24',
  RawDate = 'rawDate',
}

export const formatDate = (dt: number, type: FormatType) => {
  const date = new Date(dt * 1000);

  return getFormatDate(date, type);
};

export const getFormatDate = (date: Date, type: FormatType) => {
  switch (type) {
    case FormatType.FullDate: {
      const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });

      const dayMonthYear = date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });

      return `${weekday} | ${dayMonthYear}`;
    }

    case FormatType.ShortDate:
      return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
      });

    case FormatType.Time12:
    case FormatType.Time24:
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: type === FormatType.Time12,
      });
    case FormatType.RawDate:
      return date.toDateString();

    default:
      return '';
  }
};

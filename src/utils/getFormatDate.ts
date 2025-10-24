export enum FormatType {
  FullDate = 'fullDate',
  ShortDate = 'shortDate',
  Time12 = 'time12',
  Time24 = 'time24',
}

export const getFormatDate = (date: Date, type: FormatType) => {
  if (type === FormatType.FullDate) {
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayMonthYear = date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    return `${weekday} | ${dayMonthYear}`;
  }
  if (type === FormatType.ShortDate) {
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
    });
  }

  if (type === FormatType.Time12 || type === FormatType.Time24) {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: type === FormatType.Time12 ? true : false,
    });
  }
};

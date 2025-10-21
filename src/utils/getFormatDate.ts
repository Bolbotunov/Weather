type FormatType = 'date' | 'time';

export const getFormatDate = (date: Date, type: FormatType) => {
  if (type === 'date') {
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayMonthYear = date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    return `${weekday} | ${dayMonthYear}`;
  }

  if (type === 'time') {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }
};

const getFormatDate = (date: Date) => {
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dayMonthYear = date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return `${weekday} | ${dayMonthYear}`;
};

export default getFormatDate;

import {
  MINUTES_IN_DAY,
  MINUTES_IN_HOUR,
  MS_IN_MINUTE,
} from '@/constants/constants';

export default function getTimeBeforeEvent(start: string) {
  const now = new Date();

  const eventTime = new Date(start);

  const diff = eventTime.getTime() - now.getTime();

  if (diff <= 0) return 'now';

  const diffMin = Math.floor(diff / MS_IN_MINUTE);

  const days = Math.floor(diffMin / MINUTES_IN_DAY);

  const hours = Math.floor((diffMin % MINUTES_IN_DAY) / MINUTES_IN_HOUR);

  const minutes = diffMin % MINUTES_IN_HOUR;

  if (days > 0) return `in ${days}d ${hours}h`;
  if (hours > 0) return `in ${hours}h ${minutes}m`;

  return `in ${minutes} min`;
}

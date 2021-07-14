import {MINUTES_IN_HOUR} from './const';

const isPositiveNumber = (number) => !isNaN(number) && number >= 0;

export const getRandomInt = (rangeStart = 0, rangeEnd = 0) => {
  if (!isPositiveNumber(rangeStart) || !isPositiveNumber(rangeEnd)) {
    return 0;
  }

  if (rangeEnd <= rangeStart) {
    return rangeStart;
  }

  return Number(rangeStart) + Math.round(Math.random() * (rangeEnd - rangeStart));
};

export const getFormattedMovieRuntime = (runtime) => {
  const fullHours = Math.floor(runtime / MINUTES_IN_HOUR);
  const leftMinutes = runtime - fullHours * MINUTES_IN_HOUR;

  return `${fullHours}h ${leftMinutes}m`;
};

export const getFormattedDate = (dateInISOStringFormat) => {
  const date = new Date(dateInISOStringFormat);

  return `${date.toLocaleString('en-US', { month: 'long' })} ${date.getDay()}, ${date.getFullYear()}`;
};

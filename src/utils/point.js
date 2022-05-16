import dayjs from 'dayjs';

const HOUR_MINUT = 60;
const DAY_HOURS = 24;
const DAY_MINUT = DAY_HOURS * HOUR_MINUT;

const getTwoDigits = (number) => number.toString().length === 1 ? `0${number}` : `${number}`;

export const calcDuration = (begin, end) => {
  const durationInMinutes = dayjs(end).diff(begin, 'minutes');
  const durationInHours = Math.floor(durationInMinutes / HOUR_MINUT);
  const durationInDays = Math.floor(durationInHours / DAY_HOURS);

  if (durationInMinutes < HOUR_MINUT) {
    return `${getTwoDigits(durationInMinutes)} M`;
  } else if (durationInMinutes < DAY_MINUT) {
    return `${getTwoDigits(durationInHours)} H ${getTwoDigits(+durationInMinutes - durationInHours * HOUR_MINUT)} M`;
  } else {
    return `${getTwoDigits(durationInDays)} D ${getTwoDigits(+durationInHours - durationInDays * DAY_HOURS)} H
            ${getTwoDigits(+durationInMinutes - durationInHours * HOUR_MINUT)} M}`;
  }
};

import dayjs from 'dayjs';

const DAY_MINUT = 1440;

const getTwoDigits = (number) => number.toString().length === 1 ? `0${number}` : `${number}`;

const calcDuration = (begin, end) => {
  const durationInMinutes = dayjs(end).diff(begin, 'minutes');
  const durationInHours = Math.floor(durationInMinutes / 60);
  const durationInDays = Math.floor(durationInHours / 24);

  if (durationInMinutes < 60) {
    return `${getTwoDigits(durationInMinutes)} M`;
  } else if (durationInMinutes < DAY_MINUT) {
    return `${getTwoDigits(durationInHours)} H ${getTwoDigits(+durationInMinutes - durationInHours * 60)} M`;
  } else {
    return `${getTwoDigits(durationInDays)} D ${getTwoDigits(+durationInHours - durationInDays * 24)} H
            ${getTwoDigits(+durationInMinutes - durationInHours * 60)} M}`;
  }
};

export { calcDuration };

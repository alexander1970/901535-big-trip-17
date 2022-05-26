import dayjs from 'dayjs';

const HOUR_MINUT = 60;
const DAY_HOURS = 24;
const DAY_MINUT = DAY_HOURS * HOUR_MINUT;

const getDuration = (begin, end) => {
  const durationInMinutes = dayjs(end).diff(begin, 'minutes');
  const durationInHours = Math.floor(durationInMinutes / HOUR_MINUT);
  const durationInDays = Math.floor(durationInHours / DAY_HOURS);

  if (durationInMinutes < HOUR_MINUT) {
    return `${durationInMinutes.toString().padStart(2, 0)}M`;
  } else if (durationInMinutes < DAY_MINUT) {
    return `${durationInHours.toString().padStart(2, 0)} H
            ${(+durationInMinutes - durationInHours * HOUR_MINUT).toString().padStart(2, 0)} M`;
  } else {
    return `${durationInDays.toString().padStart(2, 0)} D
            ${(+durationInHours - durationInDays * DAY_HOURS).toString().padStart(2, 0)} H
            ${(+durationInMinutes - durationInHours * HOUR_MINUT).toString().padStart(2, 0)} M}`;
  }
};

const calcDuration = (event) => dayjs(event.dateTo).diff(event.dateFrom, 'minutes');

export { getDuration, calcDuration };

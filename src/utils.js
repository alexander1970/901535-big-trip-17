import dayjs from 'dayjs';

const getRandomInt = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const shuffleArr = (arr) => {
  const newArr = arr.slice();

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }

  return newArr;
};

const getRandomArr = (arr) => {
  const randomArr = [];

  if (arr.length !== 0) {
    const count = getRandomInt(1, arr.length);
    const elements = shuffleArr(arr);

    for (let i = 0; i < count; i++) {
      randomArr.push(elements[i]);
    }
  }

  return randomArr;
};

const capitalizeFirstLetter = (str) => {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
};

const getTwoDigits = (number) => number.toString().length === 1 ? `0${number}` : `${number}`;

const calcDuration = (begin, end) => {
  const durationInMinutes = dayjs(end).diff(begin, 'minutes');
  const durationInHours = Math.floor(durationInMinutes / 60);
  const durationInDays = Math.floor(durationInHours / 24);

  if (durationInMinutes < 60) {
    return `${getTwoDigits(durationInMinutes)} M`;
  } else if (durationInMinutes < 86400) {
    return `${getTwoDigits(durationInHours)} H ${getTwoDigits(+durationInMinutes - durationInHours * 60)} M`;
  } else {
    return `${getTwoDigits(durationInDays)} D ${getTwoDigits(+durationInHours - durationInDays * 24)} H
            ${getTwoDigits(+durationInMinutes - durationInHours * 60)} M}`;
  }
};

export {
  getRandomInt,
  getRandomElement,
  getRandomArr,
  shuffleArr,
  capitalizeFirstLetter,
  calcDuration
};

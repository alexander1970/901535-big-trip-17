import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { getRandomArr, getRandomElement, getRandomInt, shuffleArr } from '../utils/common.js';
import { DESTINATIONS, OFFER_TITLES, PLACEHOLDER_TEXT, TYPES } from './consts.js';

const maxDayGap = 7;
const OFFERS_MIN_COUNT = 0;
const OFFERS_MAX_COUNT = 5;

const generateDateFrom = () => {
  const gap = getRandomInt(-maxDayGap, maxDayGap);

  return dayjs().add(gap, 'day').toDate();
};

const generateDateTo = (startTime) => dayjs(startTime).add(getRandomInt(1, 9) * 10, 'minute').toDate();

const generateEventOffers = () => {
  const count = getRandomInt(OFFERS_MIN_COUNT, OFFERS_MAX_COUNT);
  const offerRandomTitles = shuffleArr(OFFER_TITLES).slice(0, count);
  const offers = [];

  const createEventOffer = (randomTitle) => ({
    title: randomTitle,
    cost: getRandomInt(1, 10) * 10,
  });

  offerRandomTitles.forEach((element) => {
    offers.push(createEventOffer(element));
  });

  return offers;
};

const generateDescriptionText = () => {
  const placeholders = getRandomArr(Array.from(PLACEHOLDER_TEXT.split('. ')));
  let description ='';

  for (const fragment of placeholders) {
    description = description.concat(`${fragment}. `);
  }

  return description;
};

export const generatePoint = () => {
  const date = generateDateFrom();

  return {
    id: nanoid(),
    basePrice: getRandomInt(1, 100) * 10,
    dateFrom: date,
    dateTo: generateDateTo(date),
    destination: getRandomElement(DESTINATIONS),
    isFavorite: Boolean(getRandomInt()),
    offers: generateEventOffers(),
    type: getRandomElement(TYPES),
    description: generateDescriptionText(),
  };
};

import { SortType } from '../consts.js';
import { calcDuration } from './point.js';

const getSortedPoints = (points, sortType) => {
  switch (sortType) {
    case SortType.DAY:
      return points.slice().sort((a, b) => a.dateFrom - b.dateFrom);
    case SortType.TIME:
      return points.slice().sort((a, b) => calcDuration(a) - calcDuration(b));
    case SortType.PRICE:
      return points.slice().sort((a, b) => a.basePrice - b.basePrice);
    default:
      return points;
  }
};

export { getSortedPoints };

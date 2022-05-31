import { FilterType } from '../consts.js';

const isDateInFuture = (point) => Date.parse(point.dateFrom) - Date.now() >= 0;
const isDateInPast = (point) => Date.parse(point.dateTo) - Date.now() < 0;

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isDateInFuture(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isDateInPast(point)),
};

export { filter };

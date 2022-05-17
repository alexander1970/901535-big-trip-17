import { SortType } from '../mock/consts.js';

const filter = {
  [SortType.DAY]: (points) => points.filter((point) => point.DAY),
  [SortType.TIME]: (points) => points.filter((point) => point.TIME),
  [SortType.PRICE]: (points) => points.filter((point) => point.PRICE),
  [SortType.OFFER]: (points) => points.filter((point) => point.OFFER),
};

export { filter };

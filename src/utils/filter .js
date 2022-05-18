import { SortType } from '../consts.js';

const filter = {
  [SortType.DAY]: (points) => points.filter((point) => point.DAY),
  [SortType.TIME]: (points) => points.filter((point) => point.TIME),
  [SortType.PRICE]: (points) => points.filter((point) => point.PRICE),
};

export { filter };

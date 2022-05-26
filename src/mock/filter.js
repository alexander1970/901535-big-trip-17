import { filter } from '../utils/filter.js';

export const generateFilter = (points) => Object.points(filter).map(
  ([filterName, filterPoints]) => ({
    name: filterName,
    count: filterPoints(points).length,
  }),
);

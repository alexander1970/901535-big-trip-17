const SortType = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price'
};

const getSortedPoints = (points, sortType) => {
  switch (sortType) {
    case SortType.DAY:
      return points.slice().sort((a, b) => a.date - b.date);
    case SortType.TIME:
      return points.slice().sort((a, b) => a.dateFrom - b.dateFrom);
    case SortType.PRICE:
      return points.slice().sort((a, b) => a.basePrice - b.basePrice);
    default:
      return points;
  }
};

export { getSortedPoints, SortType };

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const SortType = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDIT: 'EDIT',
  NEW: 'NEW',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

const BLANK_POINT = {
  type: 'taxi',
  destination: '',
  description: '',
  offers: [],
  basePrice: 0,
  dateFrom: Date.now(),
  dateTo: Date.now() + 30000,
  isFavorite: false,
  photos: null,
};

export {
  FilterType,
  SortType,
  Mode,
  UserAction,
  UpdateType,
  BLANK_POINT
};

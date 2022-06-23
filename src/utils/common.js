const capitalizeFirstLetter = (str) => (str) ? str[0].toUpperCase() + str.slice(1) : str;

const isOnline = () => window.navigator.onLine;

export {
  capitalizeFirstLetter,
  isOnline
};

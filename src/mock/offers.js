const getOfferTemplate = (offer) => {
  const {title, cost} = offer;

  return `
    <li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${cost}</span>
    </li>
  `;
};

export const generateOffers = (offers) => {
  const offersList = offers.reduce((acc, element) => {
    acc += getOfferTemplate(element);
    return  acc;
  }, '');

  return `
    <ul class="event__selected-offers">
      ${offersList}
    </ul>
  `;
};

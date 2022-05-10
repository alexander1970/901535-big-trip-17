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
  let offersList = '';

  offers.forEach((element) => {
    offersList = offersList.concat(getOfferTemplate(element));
  });

  return `
    <ul class="event__selected-offers">
      ${offersList}
    </ul>
  `;
};

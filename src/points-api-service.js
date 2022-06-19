import ApiService from './framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  updatePoint = async (point) => {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  };

  #adaptToServer = (point) => {
    const adaptedPoint = {...point,
      'base_price': point.price,
      'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOStrihg() : null,
      'date_to': point.dateTo instanceof Date ? point.dateTo.toISOStrihg() : null,
      'is_favorite': point.isFavorite,
      'destination': {
        name: point.destination,
        description: point.description,
        pictures: point.photos,
      }
    };

    delete adaptedPoint.destination;
    delete adaptedPoint.description;
    delete adaptedPoint.photos;
    delete adaptedPoint.price;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  };
}

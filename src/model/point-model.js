import { generatePoint } from '../mock/point.js';

export default class PointModel {
  points = Array.from({length: 20}, generatePoint);

  getPoints = () => this.points;
}

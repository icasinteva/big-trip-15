import Api from '../api';
import { END_POINT, AUTHORIZATION } from '../const';

const api = new Api(END_POINT, AUTHORIZATION);

let destinations;

const getOffers = async () => {
  destinations = await api.getDestinations();
};

getOffers();

export { destinations };

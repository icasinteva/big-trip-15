import { Type, Destination, OfferId, OfferName } from '../enums';
import { generatePhotos } from '../mock/photos';
import { generateType, generateDestination } from '../utils';
import { eventDetailsSection } from './event-details__section';

const createAddEventFormTemplate = () => {
  const selectedType = generateType();
  const selectedDestination = generateDestination();
  const typeItems = Type.map((type) => {
    const checked = type === selectedType ? 'checked' : '';
    return `<div class="event__type-item">
                          <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${type} ${checked}>
                          <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
                        </div>`;
  }).join('');

  const destinations = Object.values(Destination).map(
    (destination) => `<option value=${destination}></option>`,
  );

  const destinationsData = {
    [Destination.AMSTERDAM]: {
      description: '',
      photos: generatePhotos(),
    },
    [Destination.GENEVA]: {
      offers: [
        {
          name: OfferName.LUGGAGE,
          id: OfferId.LUGGAGE,
          priceAmount: 300,
        },
        {
          name: OfferName.COMFORT,
          id: OfferId.COMFORT,
          priceAmount: 100,
        },
        {
          name: OfferName.MEAL,
          id: OfferId.MEAL,
          priceAmount: 15,
        },
        {
          name: OfferName.SEATS,
          id: OfferId.SEATS,
          priceAmount: 5,
        },
        {
          name: OfferName.TRAIN,
          id: OfferId.TRAIN,
          priceAmount: 40,
        },
      ],
      description:
        'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
      photos: generatePhotos(),
    },
    [Destination.CHAMONIX]: {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus',
      photos: generatePhotos(),
      offers: [],
    },
    [Destination.WARSAW]: {
      description: 'Super city!',
      offers: [],
    },
  };

  return `<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${selectedType}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${typeItems}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${selectedType}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${selectedDestination} list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${destinations}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="">
                    —
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      €
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
                ${eventDetailsSection(
    destinationsData[selectedDestination],
    selectedType,
  )}
              </form>`;
};
export { createAddEventFormTemplate };

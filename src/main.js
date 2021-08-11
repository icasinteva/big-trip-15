import NoEventsView from './view/no-events';
import TripInfoView from './view/trip-info';
import SiteNavigationView  from './view/site-navigation';
import EventsFiltersView from './view/events-filters';
import AddEventButtonView from './view/add-event-button';
import EventsListView from './view/events-list-section';
import EventsListItemView from './view/events-list-item';
import EventAddView from './view/event-add';
import BoardView from './view/board';
import { generateEvent } from './mock/event';
import { RenderPosition, FilterEventsTypeToMethod, SortEventsTypeToMethod } from './enums';
import { DEFAULT_FILTER, DEFAULT_SORTING } from './const';
import { onEscKeyDown } from './utils';
import { render, remove, renderEventDetailsSection } from './utils/render';

const EVENTS_COUNT = 20;
const events = new Array(EVENTS_COUNT).fill().map(generateEvent);

const filter = () => FilterEventsTypeToMethod[DEFAULT_FILTER](events);
const selectedSortingMethod = SortEventsTypeToMethod[DEFAULT_SORTING];

const filteredEvents = filter();
const sortedEvents = selectedSortingMethod(filteredEvents);

const siteHeaderElement = document.querySelector('.page-header .trip-main');
const siteNavContainer = siteHeaderElement.querySelector('.trip-controls__navigation');
const eventsFiltersContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main .page-body__container');

const addEventButtonComponent = new AddEventButtonView();
const eventsFiltersComponent = new EventsFiltersView();

const renderAddEventForm = (listContainer) => {
  const eventListItemComponent = new EventsListItemView();
  const eventAddComponent = new EventAddView();
  const noEventsComponent = new NoEventsView();

  const removeForm = () => {
    remove(eventListItemComponent);
    const eventsListContainer = siteMainElement.querySelector('.trip-events');
    const eventsListElement = siteMainElement.querySelector('.trip-events__list');

    if (!eventsListElement.children.length) {
      remove(eventsListElement);
      render(eventsListContainer, noEventsComponent, RenderPosition.BEFOREEND);
    }

    addEventButtonComponent.toggleDisabled();
  };

  render(eventListItemComponent, eventAddComponent, RenderPosition.AFTERBEGIN);
  render(listContainer, eventListItemComponent, RenderPosition.AFTERBEGIN);

  eventAddComponent.setCancelListener(removeForm);
  eventAddComponent.setSaveChangesListener(() => {
    removeForm();
    document.removeEventListener('keydown', onEscKeyDown);
  });
  eventAddComponent.setChangeDestinationListener(({ target: { value } }) => {
    renderEventDetailsSection(eventAddComponent, { destination: value, eventType: eventAddComponent.eventType });
  });
  eventAddComponent.setChangeEventTypeListener(({ target: { value } }) => {
    eventAddComponent.changeEventType(value);
    renderEventDetailsSection(eventAddComponent, { destination: eventAddComponent.destination, eventType: value});
  });

  document.addEventListener('keydown', (evt) => onEscKeyDown(evt, removeForm));
};

eventsFiltersComponent.setFilterEventsListeners(sortedEvents);
addEventButtonComponent.setEnterAddModeListener(() => {
  const eventsListContainer = siteMainElement.querySelector('.trip-events');
  let eventsListElement = eventsListContainer.querySelector('.trip-events__list');

  if (!eventsListElement) {
    const eventsListComponent = new EventsListView([]);

    remove(eventsListContainer.querySelector('.trip-events__msg'));
    render(eventsListContainer, eventsListComponent, RenderPosition.BEFOREEND);
    eventsListElement = eventsListContainer.querySelector('.trip-events__list');
  }

  renderAddEventForm(eventsListElement);
  addEventButtonComponent.toggleDisabled();
});

render(siteHeaderElement, new TripInfoView(sortedEvents), RenderPosition.AFTERBEGIN);
render(siteNavContainer, new SiteNavigationView(), RenderPosition.BEFOREEND);
render(eventsFiltersContainer, eventsFiltersComponent, RenderPosition.BEFOREEND);
render(siteHeaderElement, addEventButtonComponent, RenderPosition.BEFOREEND);
render(siteMainElement, new BoardView(sortedEvents), RenderPosition.BEFOREEND);

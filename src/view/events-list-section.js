import { renderEventDetailsSection } from '../utils/render';

import AbstractView from './abstract';
import EventEditView from './event-edit';
import EventDetailsView from './event-details-section';

const createEventsListTemplate = () => '<ul class="trip-events__list"></ul>';

class EventsListView extends AbstractView {
  _renderEvent(eventsListComponent, event) {
    const eventEditComponent = new EventEditView(event);

    eventEditComponent.setChangeDestinationListener(({ target: { value } }) => {
      const eventDetailsComponent = new EventDetailsView({ destination: value, eventType: eventEditComponent.eventType });

      renderEventDetailsSection(eventEditComponent, eventDetailsComponent);
    });
    eventEditComponent.setChangeEventTypeListener(({ target: { value } }) => {
      const eventDetailsComponent = new EventDetailsView({ destination: eventEditComponent.destination, eventType: value});

      eventEditComponent.changeEventType(value);
      renderEventDetailsSection(eventEditComponent, eventDetailsComponent);
    });

  }

  getTemplate() {
    return createEventsListTemplate();
  }
}

export default EventsListView;

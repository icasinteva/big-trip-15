import { RenderPosition } from '../enums';
import AbstractView from '../view/abstract';

const createElement = (template) => {
  const newElement = document.createElement('div');

  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

const render = (container, child, place) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (child instanceof AbstractView) {
    child = child.getElement();
  }

  if (container && child) {
    switch (place) {
      case RenderPosition.AFTERBEGIN: {
        container.prepend(child);
        break;
      }
      case RenderPosition.BEFOREEND: {
        container.append(child);
        break;
      }
      case RenderPosition.BEFOREBEGIN: {
        container.parentNode.insertBefore(child, container);
        break;
      }
    }
  }
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof AbstractView) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};

const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

const createPriceTemplate = (className, amount) =>
  `€&nbsp;<span class="${className}-value">${amount}</span>`;

const renderEventDetailsSection = (container, eventDetailsComponent) => {
  remove(container.queryChildElement('.event__details'));
  render(container, eventDetailsComponent, RenderPosition.BEFOREEND);
};


export {createElement, render, replace, remove, createPriceTemplate, renderEventDetailsSection};

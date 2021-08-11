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

const replace = (container, child1, child2) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (child1 instanceof AbstractView) {
    child1 = child1.getElement();
  }

  if (child2 instanceof AbstractView) {
    child2 = child2.getElement();
  }
  container.replaceChild(child1, child2);
};

const remove = (elementToRemove) => {
  if (!elementToRemove) {
    return false;
  }

  if (elementToRemove instanceof AbstractView) {
    elementToRemove = elementToRemove.getElement();
  }

  elementToRemove.parentNode.removeChild(elementToRemove);
};

const createPriceTemplate = (className, amount) =>
  `€&nbsp;<span class="${className}-value">${amount}</span>`;


export {createElement, render, replace, remove, createPriceTemplate};

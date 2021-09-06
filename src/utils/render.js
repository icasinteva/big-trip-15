import { RenderPosition } from '../enums';
import AbstractView from '../view/abstract';

const createElement = (template) => {
  const newElement = document.createElement('div');

  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

const contains = (component, child) => {
  if (component instanceof AbstractView) {
    component = component.getElement();
  }

  if (child instanceof AbstractView) {
    child = child.getElement();
  }

  return component.contains(child);
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

const createPriceTemplate = (className, amount = 0) =>
  `€&nbsp;<span class="${className}-value">${amount}</span>`;

export {createElement, contains, render, replace, remove, createPriceTemplate};

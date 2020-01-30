import {RankGradation} from '../const.js';

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const getItemsByField = (array, field, length) => {
  return array
    .filter(element => !!element[field])
    .sort((a, b) => b[field] - a[field])
    .slice(0, length);
};
export const getTopRated = (films) => {
  return getItemsByField(films, `rating`, 2);
};

export const getMostCommented = (films) => {
  return films
    .filter(element => !!element.comments)
    .sort((a, b) => b.comments.length - a.comments.length)
    .slice(0, 2);
};

export const createElement = (component) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = component;

  return newElement.firstChild;
};
export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(element.getElement());
      break;
  }
};
export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};
export const getRank = (isHistoryCount) => {
  let rank = Object.keys(RankGradation).find(key => {
    const min = Number(RankGradation[key].MIN_VALUE);
    const max = Number(RankGradation[key].MAX_VALUE);
    return min <= isHistoryCount && isHistoryCount <= max;
  });
  return rank;
};

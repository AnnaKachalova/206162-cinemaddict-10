export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const getItemsByField = (array, field) => {
  return array
    .filter(element => !!element[field])
    .sort((a, b) => b[field] - a[field])
    .slice(0, 2);
};

export const createElement = component => {
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
export const remove = component => {
  component.getElement().remove();
  component.removeElement();
};

export const createMenuComponent = (filters) => {
  const filtersMarkup = filters
    .map((it, i) => createFilterTemplate(it, i === 0))
    .join(`\n`);
  return `
<nav class="main-navigation">
  ${filtersMarkup}
  <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
</nav>
<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
</ul>
`;
};
const createFilterTemplate = (filter) => {
  const {name, quantity} = filter;
  return `<a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${quantity}</span></a>`;
};

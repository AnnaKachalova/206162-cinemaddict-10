const createFilmCardTemplate = (films) => {
  return Array.from(films).map((film) => {
    const {
      title,
      poster,
      description,
      rating,
      productionYear,
      duration,
      genre,
      numberOfComments,
    } = film;
    return `
    <article class="film-card">
        <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${rating}</p>
            <p class="film-card__info">
            <span class="film-card__year">${productionYear}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genre}</span>
            </p>
            <img src="./images/posters/${poster}.jpg" alt="" class="film-card__poster">
            <p class="film-card__description">${description}</p>
            <a class="film-card__comments">${numberOfComments} comments</a>
        <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
        </form>
    </article>`;
  });
};

export const createMostCommentedComponent = films => {
  const filmCardMarkup = createFilmCardTemplate(films);
  return `
  <section class="films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container">
    ${filmCardMarkup}
    </div>
  </section>`;
};

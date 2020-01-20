import { render, RenderPosition } from '../utils/render.js';

import AbstractSmartComponent from './abstract-smart-component.js';

const EMOJI = [`smile`, `sleeping`, `puke`, `angry`];

const createGenreTemplate = genres => {
  return Array.from(genres).map(element => {
    return `<span class="film-details__genre">${element}</span>`;
  });
};

const createCommentTemplate = comments => {
  return Array.from(comments).map(comment => {
    const { emoticon, text, autor, date } = comment;
    return `<li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="./images/emoji/${emoticon}.png" width="55" height="55" alt="emoji">
              </span>
              <div>
                <p class="film-details__comment-text">${text}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${autor}</span>
                  <span class="film-details__comment-day">${date}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
          </li>`;
  });
};

const createFilmRaringTemplate = () => {
  return `<div class="form-details__middle-container">
      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <button class="film-details__watched-reset" type="button">Undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="./images/posters/the-great-flamarion.jpg" alt="film-poster" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">The Great Flamarion</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>
            <div class="film-details__user-rating-score">
              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1">
              <label class="film-details__user-rating-label" for="rating-1">1</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2">
              <label class="film-details__user-rating-label" for="rating-2">2</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3">
              <label class="film-details__user-rating-label" for="rating-3">3</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4">
              <label class="film-details__user-rating-label" for="rating-4">4</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5">
              <label class="film-details__user-rating-label" for="rating-5">5</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6">
              <label class="film-details__user-rating-label" for="rating-6">6</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7">
              <label class="film-details__user-rating-label" for="rating-7">7</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8">
              <label class="film-details__user-rating-label" for="rating-8">8</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9" checked>
              <label class="film-details__user-rating-label" for="rating-9">9</label>
            </div>
          </section>
        </div>
      </section>
    </div>`;
};

const createPopupCardComponent = film => {
  const {
    poster,
    title,
    originalTitle,
    rating,
    producer,
    screenwriter,
    actor,
    releaseDate,
    duration,
    country,
    genre,
    isWatchlist,
    isHistory,
    isFavorite,
    description,
    ageRating,
    comments,
    userRating,
  } = film;
  //const { isHistory } = options;

  const hasUserRatign = userRating !== 0 && isHistory;
  const commentsMarkup = createCommentTemplate(comments);
  const genreMarkup = createGenreTemplate(genre);

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}.jpg" alt="">

          <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${originalTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
  ${hasUserRatign ? `<p class="film-details__user-rating">Your rate ${userRating}</p>` : ``}
            </div>
          </div>
          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${producer}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${screenwriter}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actor}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genre.length > 1 ? 'Genres' : 'Genre'}</td>
              <td class="film-details__cell">
                ${genreMarkup}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${
          isWatchlist ? `checked` : ``
        }>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${
          isHistory ? `checked` : ``
        }>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${
          isFavorite ? `checked` : ``
        }>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>
    ${isHistory ? createFilmRaringTemplate() : ''}
    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${
          comments.length
        }</span></h3>

        <ul class="film-details__comments-list">
          ${commentsMarkup}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};
const parseFormData = formData => {
  const options = {
    hour12: false,
    year: `numeric`,
    month: `numeric`,
    day: `numeric`,
    hour: `numeric`,
    minute: `numeric`,
  };
  console.log(formData.get(`comment-emoji`));
  return {
    name: `You`,
    text: formData.get(`comment`),
    time: new Date().toLocaleString(`en-US`, options),
    emoji: `./images/emoji/${formData.get(`comment-emoji`)}.png`,
  };
};

export default class Popup extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;

    this._isHistory = this._film.isHistory;
    this._commentInputEnterPressHandler = null;
  }

  getTemplate() {
    return createPopupCardComponent(this._film);
  }
  getData() {
    const form = this.getElement().querySelector(`.film-details__inner`);
    const formData = new FormData(form);

    return parseFormData(formData);
  }
  setDeleteClickHandler(handler) {
    this.getElement()
      .querySelectorAll(`.film-details__comment-delete`)
      .forEach((it, i) =>
        it.addEventListener(`click`, evt => {
          evt.preventDefault();
          handler(i);
        })
      );
  }

  setCommentEnterPressHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, evt => {
        if (evt.ctrlKey === true && evt.key === `Enter`) {
          handler();
        }
      });
    this._commentInputEnterPressHandler = handler;
  }
  recoveryListeners() {
    this._subscribeOnEvents();
  }
  rerender() {
    super.rerender();
  }
  reset() {
    this._isHistory = Object.values(this._film.isHistory).some(Boolean);

    this.rerender();
  }

  hidePopup() {
    document.onkeydown = null;
    this._element.remove();
    this.removeElement();
  }
  onButtonKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    const isCtrlEnter = evt.key == `Enter` && evt.ctrlKey;

    if (isCtrlEnter) {
      console.log('сохранение комментария');
    } else if (isEscKey) {
      console.log('выход из попапа');
      this.hidePopup();
    }
  }

  showElement() {
    const bodyElement = document.querySelector(`body`);
    const visiblePopup = bodyElement.querySelector(`.film-details`);
    if (visiblePopup) {
      visiblePopup.remove();
    }

    render(bodyElement, this, RenderPosition.BEFOREEND);

    document.onkeydown = evt => this.onButtonKeyDown(evt);
    this.setCommentEnterPressHandler(this._commentInputEnterPressHandler);
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    const popupElement = this.getElement();
    const controlInputs = popupElement.querySelectorAll(`.film-details__control-input`);

    controlInputs.forEach(input => {
      input.addEventListener(`change`, () => {
        if (input.name === 'watched') {
          this._film.isHistory = !this._film.isHistory;
          this._film.isWatchlist = false;
          this._onDataChange(this, card, Object.assign({}, card, { isWatchlist: !card.isWatchlist, isHistory: false }));
        } else if (input.name === 'watchlist') {
          this._film.isWatchlist = !this._film.isWatchlist;
          this._film.isHistory = false;
          this._onDataChange(this, card, Object.assign({}, card, { isHistory: !card.isHistory, isWatchlist: false }));
        } else if (input.name === 'favorite') {
          this._film.isFavorite = !this._film.isFavorite;
          this._onDataChange(this, card, Object.assign({}, card, { isFavorite: !card.isFavorite }));
        }
        this.rerender();
      });
    });

    const popupButtonClose = popupElement.querySelector(`.film-details__close-btn`);
    popupButtonClose.addEventListener(`click`, () => this.hidePopup());

    // change emoji
    const emoji = popupElement.querySelectorAll(`.film-details__emoji-item`);
    const parentEmotion = popupElement.querySelector(`.film-details__add-emoji-label`);

    emoji.forEach(emotion => {
      emotion.addEventListener(`change`, () => {
        const emotionValue = emotion.value;
        const newImg = document.createElement('img');
        newImg.style.width = '50px';
        newImg.style.height = '50px';
        newImg.src = `./images/emoji/${emotionValue}.png`;
        parentEmotion.innerHTML = '';
        parentEmotion.append(newImg);
      });
    });
  }
}

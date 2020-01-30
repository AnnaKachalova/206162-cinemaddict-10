import { render, RenderPosition, createElement } from '../utils/render.js';
import AbstractSmartComponent from './abstract-smart-component.js';
import { formatReleaseDate, formatDateAgo, formatDuration } from '../utils/common.js';
import moment from 'moment';

const createGenreTemplate = genres => {
  return Array.from(genres)
    .map(element => {
      return `<span class="film-details__genre">${element},</span>`;
    })
    .join('');
};

const createCommentTemplate = comments => {
  return Array.from(comments)
    .map(commentItem => {
      const { emotion, author, comment, date } = commentItem;
      return `<li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji">
              </span>
              <div>
                <p class="film-details__comment-text">${comment}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${author}</span>
                  <span class="film-details__comment-day">${formatDateAgo(date)}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
          </li>`;
    })
    .join('');
};

const createRatingItems = userRating => {
  let scores = [];
  for (let i = 1; i < 10; i++) {
    const row = `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${i}" id="rating-${i}" ${
      Number(userRating) === i ? 'checked' : ''
    }>
    <label class="film-details__user-rating-label" for="rating-${i}">${i}</label>`;
    scores += row;
  }
  return scores;
};

const createFilmRaringTemplate = (poster, title, userRating) => {
  return `<div class="form-details__middle-container">
      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <button class="film-details__watched-reset" type="button">Undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="./${poster}" alt="film-poster" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">${title}</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>
            <div class="film-details__user-rating-score">
            ${createRatingItems(userRating)}
            </div>
          </section>
        </div>
      </section>
    </div>`;
};

const createPopupCardComponent = film => {
  const {
    title,
    poster,
    description,
    originalTitle,
    rating,
    duration,
    genre,
    producer,
    screenwriter,
    actors,
    country,
    ageRating,
    releaseDate,
    isHistory,
    isWatchlist,
    isFavorite,
    userRating,
  } = film;
  const comments = film[`comments`];

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
          <img class="film-details__poster-img" src="./${poster}" alt="">

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
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${formatReleaseDate(releaseDate)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${formatDuration(duration)}</td>
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
    ${isHistory ? createFilmRaringTemplate(poster, title, userRating) : ''}
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
  return {
    author: `You`,
    comment: formData.get(`comment`),
    date: moment().format(),
    emotion: formData.get(`comment-emoji`),
  };
};

export default class Popup extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;

    this._isHistory = this._film.isHistory;
    this._commentInputEnterPressHandler = null;
    this._onDataChange = null;
    this._bodyElement = document.querySelector(`body`);
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
      .forEach((it, index) =>
        it.addEventListener(`click`, evt => {
          evt.preventDefault();
          const button = evt.target;
          this._disabledButtonDelete(evt.target);
          handler({ index, button });
        })
      );
  }
  _disabledButtonDelete(button) {
    button.disabled = true;
    button.textContent = `Deleting…`;
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

    if (isEscKey) {
      this.hidePopup();
    }
  }
  showElement() {
    const visiblePopup = this._bodyElement.querySelector(`.film-details`);
    if (visiblePopup) {
      visiblePopup.remove();
    }

    render(this._bodyElement, this, RenderPosition.BEFOREEND);
    document.onkeydown = evt => this.onButtonKeyDown(evt);
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    const popupElement = this.getElement();

    const controlsWrapper = popupElement.querySelector(`.film-details__controls`);

    controlsWrapper.addEventListener(`change`, evt => {
      switch (evt.target.name) {
        case 'watched':
          this._film.isHistory = !this._film.isHistory;
          this._film.isWatchlist = false;
          break;
        case 'watchlist':
          this._film.isWatchlist = !this._film.isWatchlist;
          this._film.isHistory = false;
          break;
        case 'favorite':
          this._film.isFavorite = !this._film.isFavorite;
          break;
      }
      this._onDataChange(this._film);
      this.rerender();
    });

    const ratingWrappers = popupElement.querySelector(`.film-details__user-rating-score`);
    if (ratingWrappers) {
      ratingWrappers.addEventListener(`change`, evt => {
        if (evt.target.name === `score`) {
          this._film.userRating = evt.target.value;
          evt.target.checked = true;
          this._onDataChange(this._film);
          this.rerender();
        }
      });
      const buttonUndo = popupElement.querySelector('.film-details__watched-reset');
      buttonUndo.addEventListener(`click`, () => {
        this._film.userRating = 0;
        this._onDataChange(this._film);
        this.rerender();
      });
    }

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
  onControlsChangeHandler(handler) {
    this._onDataChange = handler;
  }
  onRatingClichHandler(handler) {
    this._onDataChange = handler;
  }
}

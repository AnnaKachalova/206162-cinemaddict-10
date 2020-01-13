import { render, RenderPosition } from '../utils/render.js';

import AbstractSmartComponent from './abstract-smart-component.js';

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

const createPopupCardComponent = (film, options = {}) => {
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
    description,
    ageRating,
    comments,
    userRating,
  } = film;
  const { isHistory } = options;
  console.log(isHistory);

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
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>
    ${isHistory ? createFilmRaringTemplate() : ''}
    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>

        <ul class="film-details__comments-list">
          ${commentsMarkup}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
            <label class="film-details__emoji-label" for="emoji-gpuke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
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
export default class Popup extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;

    this._isHistory = this._film.isHistory;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createPopupCardComponent(this._film, { isHistory: this._isHistory });
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
  onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this.hidePopup();
    }
  }
  showElement() {
    const bodyElement = document.querySelector(`body`);
    const visiblePopup = bodyElement.querySelector(`.film-details`);
    if (visiblePopup) {
      visiblePopup.remove();
    }

    const popupElement = this.getElement();
    render(bodyElement, this, RenderPosition.BEFOREEND);
    const popupButtonClose = popupElement.querySelector(`.film-details__close-btn`);

    document.onkeydown = evt => this.onEscKeyDown(evt);
    popupButtonClose.addEventListener(`click`, () => this.hidePopup());
  }

  onWatchlistButtonClick(element) {
    this.getElement()
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, element);
  }
  onWatchedButtonClick(element) {
    this.getElement()
      .querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, element);
  }
  onFavoritesButtonClick(element) {
    this.getElement()
      .querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, element);
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    element.querySelector(`.film-details__control-label--watched`).addEventListener(`click`, () => {
      this._isHistory = !this._isHistory;
      this.rerender();
    });

    /*const emoji = element.querySelectorAll(`.film-details__emoji-label`);
    const parentEmotion = element.querySelector(`.film-details__add-emoji-label`);
    console.log(parentEmotion);
    emoji.forEach(emotion => {
      emotion.addEventListener(`click`, () => {
        console.log(emotion);
        //parentEmotion.innerHtml = '';
        const emotionImg = emotion.querySelectorAll(`.img`);
        console.log(emotionImg);

        let emotionImgClone = emotionImg.cloneNode(true);
        parentEmotion.appendChild(emotionImgClone);

        //film-details__emoji-label
        //
        console.log('эмоция');
      });
    });*/
  }
}

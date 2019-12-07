/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/film-card.js":
/*!*************************************!*\
  !*** ./src/components/film-card.js ***!
  \*************************************/
/*! exports provided: createFilmCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilmCardComponent", function() { return createFilmCardComponent; });
const createFilmCardComponent = film => {
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
};


/***/ }),

/***/ "./src/components/films-container.js":
/*!*******************************************!*\
  !*** ./src/components/films-container.js ***!
  \*******************************************/
/*! exports provided: createFilmsContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilmsContainerComponent", function() { return createFilmsContainerComponent; });
const createFilmsContainerComponent = () => {
  return `
<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container"></div>
  </section>
</section>`;
};


/***/ }),

/***/ "./src/components/menu.js":
/*!********************************!*\
  !*** ./src/components/menu.js ***!
  \********************************/
/*! exports provided: createMenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMenuComponent", function() { return createMenuComponent; });
const createMenuComponent = filters => {
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
const createFilterTemplate = (filter, isChecked) => {
  const { name, quantity } = filter;
  return `<a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${quantity}</span></a>`;
};


/***/ }),

/***/ "./src/components/more-button.js":
/*!***************************************!*\
  !*** ./src/components/more-button.js ***!
  \***************************************/
/*! exports provided: createShowMoreButtonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createShowMoreButtonComponent", function() { return createShowMoreButtonComponent; });
const createShowMoreButtonComponent = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};


/***/ }),

/***/ "./src/components/most-commented.js":
/*!******************************************!*\
  !*** ./src/components/most-commented.js ***!
  \******************************************/
/*! exports provided: createMostCommentedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMostCommentedComponent", function() { return createMostCommentedComponent; });
const createFilmCardTemplate = films => {
  return Array.from(films).map(film => {
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

const createMostCommentedComponent = films => {
  const filmCardMarkup = createFilmCardTemplate(films);
  return `
  <section class="films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container">
    ${filmCardMarkup}
    </div>
  </section>`;
};


/***/ }),

/***/ "./src/components/popup.js":
/*!*********************************!*\
  !*** ./src/components/popup.js ***!
  \*********************************/
/*! exports provided: createPopupCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPopupCardComponent", function() { return createPopupCardComponent; });
const createGenre = genres => {
  return Array.from(genres).map(genre => {
    return `<span class="film-details__genre">${genre}</span>`;
  });
};

const createComment = comments => {
  return Array.from(comments).map(comment => {
    const { emoticon, text, autor, date } = comment;
    return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emoticon}.png" width="55" height="55" alt="emoji">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">J${autor}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
  });
};
const createPopupCardComponent = popup => {
  const {
    poster,
    title,
    original,
    rating,
    userRating,
    producer,
    screenwriter,
    actors,
    releaseDate,
    duration,
    country,
    genre,
    description,
    ageRating,
    comments,
  } = popup;

  const genreMarkup = createGenre(genre);
  const commentsMarkup = createComment(comments);

  return `
<section class="film-details visually-hidden">
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
              <p class="film-details__title-original">Original: ${original}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
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
              <td class="film-details__term">Genres</td>
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
</section>
`;
};


/***/ }),

/***/ "./src/components/profile.js":
/*!***********************************!*\
  !*** ./src/components/profile.js ***!
  \***********************************/
/*! exports provided: createHeaderProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createHeaderProfileComponent", function() { return createHeaderProfileComponent; });
const createHeaderProfileComponent = rank => {
  return `
<section class="header__profile profile">
  <p class="profile__rating">${rank}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>
`;
};


/***/ }),

/***/ "./src/components/top-rated.js":
/*!*************************************!*\
  !*** ./src/components/top-rated.js ***!
  \*************************************/
/*! exports provided: createTopRatedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTopRatedComponent", function() { return createTopRatedComponent; });
const createFilmCardTemplate = films => {
  return Array.from(films).map(film => {
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

const createTopRatedComponent = films => {
  const filmCardMarkup = createFilmCardTemplate(films);
  return `
<section class="films-list--extra">
  <h2 class="films-list__title">Top rated</h2>
  <div class="films-list__container">
    ${filmCardMarkup}
  </div>
</section>`;
};


/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/*! exports provided: MONTH_NAMES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MONTH_NAMES", function() { return MONTH_NAMES; });
const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_films_container_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/films-container.js */ "./src/components/films-container.js");
/* harmony import */ var _components_film_card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/film-card.js */ "./src/components/film-card.js");
/* harmony import */ var _components_profile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/profile.js */ "./src/components/profile.js");
/* harmony import */ var _components_menu_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/menu.js */ "./src/components/menu.js");
/* harmony import */ var _components_top_rated_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/top-rated.js */ "./src/components/top-rated.js");
/* harmony import */ var _components_most_commented_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/most-commented.js */ "./src/components/most-commented.js");
/* harmony import */ var _components_popup_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/popup.js */ "./src/components/popup.js");
/* harmony import */ var _components_more_button_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/more-button.js */ "./src/components/more-button.js");
/* harmony import */ var _mock_film_card_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mock/film-card.js */ "./src/mock/film-card.js");
/* harmony import */ var _mock_profile_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mock/profile.js */ "./src/mock/profile.js");
/* harmony import */ var _mock_menu_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mock/menu.js */ "./src/mock/menu.js");
/* harmony import */ var _mock_popup_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./mock/popup.js */ "./src/mock/popup.js");
/* harmony import */ var _mock_most_commented_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./mock/most-commented.js */ "./src/mock/most-commented.js");
/* harmony import */ var _mock_top_rated__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./mock/top-rated */ "./src/mock/top-rated.js");









// mock








const CARD_COUNT = 15;
const SHOWING_TASKS_COUNT_ON_START = 6;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`.header`);
render(siteHeader, Object(_components_profile_js__WEBPACK_IMPORTED_MODULE_2__["createHeaderProfileComponent"])(_mock_profile_js__WEBPACK_IMPORTED_MODULE_9__["rank"]));

const bodyElement = document.querySelector(`body`);
const mainElement = document.querySelector(`.main`);

// создание фильтров
const cards = Object(_mock_film_card_js__WEBPACK_IMPORTED_MODULE_8__["generateFilmCards"])(CARD_COUNT);
const filters = Object(_mock_menu_js__WEBPACK_IMPORTED_MODULE_10__["generateFilters"])(_mock_film_card_js__WEBPACK_IMPORTED_MODULE_8__["films"]);

render(mainElement, Object(_components_menu_js__WEBPACK_IMPORTED_MODULE_3__["createMenuComponent"])(filters));

render(mainElement, Object(_components_films_container_js__WEBPACK_IMPORTED_MODULE_0__["createFilmsContainerComponent"])());
const popup = Object(_mock_popup_js__WEBPACK_IMPORTED_MODULE_11__["generatePopup"])();
render(bodyElement, Object(_components_popup_js__WEBPACK_IMPORTED_MODULE_6__["createPopupCardComponent"])(popup));

// получение блоков для фильмов
const filmsContainer = mainElement.querySelector(`.films`);
const filmList = filmsContainer.querySelector(`.films-list`);
const filmListContainer = filmList.querySelector(`.films-list__container`);

// наполенение контейнера с фильмами
let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
cards
  .slice(1, showingTasksCount)
  .forEach(card => render(filmListContainer, Object(_components_film_card_js__WEBPACK_IMPORTED_MODULE_1__["createFilmCardComponent"])(card)));
render(filmList, Object(_components_more_button_js__WEBPACK_IMPORTED_MODULE_7__["createShowMoreButtonComponent"])());

// наполнение контейнеров  Top rated и Most commented
const mostCommeted = Object(_mock_most_commented_js__WEBPACK_IMPORTED_MODULE_12__["generateMostCommented"])(_mock_film_card_js__WEBPACK_IMPORTED_MODULE_8__["films"]);
render(filmsContainer, Object(_components_most_commented_js__WEBPACK_IMPORTED_MODULE_5__["createMostCommentedComponent"])(mostCommeted));

const topRated = Object(_mock_top_rated__WEBPACK_IMPORTED_MODULE_13__["generateTopRated"])(_mock_film_card_js__WEBPACK_IMPORTED_MODULE_8__["films"]);
render(filmsContainer, Object(_components_top_rated_js__WEBPACK_IMPORTED_MODULE_4__["createTopRatedComponent"])(topRated));

// наполнение контейнеров  Top rated и Most commented
const showMoreButton = mainElement.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  cards
    .slice(prevTasksCount, showingTasksCount)
    .forEach(card => render(filmListContainer, Object(_components_film_card_js__WEBPACK_IMPORTED_MODULE_1__["createFilmCardComponent"])(card)));

  if (showingTasksCount >= cards.length) {
    showMoreButton.remove();
  }
});


/***/ }),

/***/ "./src/mock/film-card.js":
/*!*******************************!*\
  !*** ./src/mock/film-card.js ***!
  \*******************************/
/*! exports provided: generateFilmCards, films */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateFilmCards", function() { return generateFilmCards; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "films", function() { return films; });
const films = [];
const FilmTitles = [
  `Чужой`,
  `Амели`,
  `Аватар`,
  `Назад в будущее`,
  `Брюс Всемогущий`,
  `Бойцовский клуб`,
  `Гладиатор`,
  `Унесенные ветром`,
  `Мистер и миссис Смит`,
  `1+1`,
  `Притворись моей женой`,
  `Криминальное чтиво`,
  `Тёмный рыцарь`,
  `В джазе только девушки`,
  `Шоу Трумана`,
];
const FilmPosters = [
  `alien`,
  `ameli`,
  `avatar`,
  `back_to_the_future`,
  `bruce_almighty`,
  `fight_club`,
  `gladiator`,
  `gone_with_the_wind`,
  `mr_and_mrs_smith`,
  `one_plus_one`,
  `pretend_my_wife`,
  `pulp_fiction`,
  `the_dark_knight`,
  `there_are_only_girls_in_jazz`,
  `truman_show`,
];
const FilmGenres = [
  `Боевик`,
  `Вестерн`,
  `Детектив`,
  `Драма`,
  `Исторический`,
  `Комедия`,
  `Мелодрама`,
];
const FilmDescriptions = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const getRandomArrayIndex = array => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return randomIndex;
};
const getRandomArrayElem = array => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const getDescription = () => {
  const descriptions = FilmDescriptions.split('. ');
  return [getRandomArrayElem(descriptions), getRandomArrayElem(descriptions)].join('.');
};
const getRating = (min = 0, max = 10) => {
  const randRating = Math.random() * (max - min) + min;
  return randRating.toFixed(1);
};
const getDuration = () => {
  const hours = getRandomIntegerNumber(1, 5);
  const minutes = getRandomIntegerNumber(1, 59);

  return `${hours}h ${minutes}m`;
};
const generateFilmCard = () => {
  const randomIndex = getRandomArrayIndex(FilmTitles);

  const film = {
    title: FilmTitles[randomIndex],
    poster: FilmPosters[randomIndex],
    description: getDescription(),
    rating: getRating(),
    productionYear: getRandomIntegerNumber(1990, 2019),
    duration: getDuration(),
    genre: getRandomArrayElem(FilmGenres),
    numberOfComments: getRandomIntegerNumber(0, 100),
    isWatchilst: Math.random() > 0.5,
    isHistory: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
  };
  films.push(film);

  return film;
};
const generateFilmCards = count => {
  return new Array(count).fill(``).map(generateFilmCard);
};




/***/ }),

/***/ "./src/mock/menu.js":
/*!**************************!*\
  !*** ./src/mock/menu.js ***!
  \**************************/
/*! exports provided: generateFilters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateFilters", function() { return generateFilters; });
const generateFilters = films => {
  const isWatchilst = films.filter(film => film.isWatchilst === true).length;
  const isHistory = films.filter(film => film.isHistory === true).length;
  const isFavorite = films.filter(film => film.isFavorite === true).length;

  return [
    { name: 'All movies', quantity: films.length },
    { name: 'Watchlist', quantity: isWatchilst },
    { name: 'History', quantity: isHistory },
    { name: 'Favorites', quantity: isFavorite },
  ];
};




/***/ }),

/***/ "./src/mock/most-commented.js":
/*!************************************!*\
  !*** ./src/mock/most-commented.js ***!
  \************************************/
/*! exports provided: generateMostCommented */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateMostCommented", function() { return generateMostCommented; });
const generateMostCommented = films => {
  const sortByСomment = arr => {
    arr.sort((a, b) => (a.numberOfComments > b.numberOfComments ? 1 : -1)).reverse();
  };
  sortByСomment(films);
  return films.slice(0, 2);
};




/***/ }),

/***/ "./src/mock/popup.js":
/*!***************************!*\
  !*** ./src/mock/popup.js ***!
  \***************************/
/*! exports provided: generatePopup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generatePopup", function() { return generatePopup; });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./src/const.js");

const FilmTitles = [
  `Чужой`,
  `Амели`,
  `Аватар`,
  `Назад в будущее`,
  `Брюс Всемогущий`,
  `Бойцовский клуб`,
  `Гладиатор`,
  `Унесенные ветром`,
  `Мистер и миссис Смит`,
  `1+1`,
  `Притворись моей женой`,
  `Криминальное чтиво`,
  `Тёмный рыцарь`,
  `В джазе только девушки`,
  `Шоу Трумана`,
];
const FilmPosters = [
  `alien`,
  `ameli`,
  `avatar`,
  `back_to_the_future`,
  `bruce_almighty`,
  `fight_club`,
  `gladiator`,
  `gone_with_the_wind`,
  `mr_and_mrs_smith`,
  `one_plus_one`,
  `pretend_my_wife`,
  `pulp_fiction`,
  `the_dark_knight`,
  `there_are_only_girls_in_jazz`,
  `truman_show`,
];
const FilmGenres = [
  `Боевик`,
  `Вестерн`,
  `Детектив`,
  `Драма`,
  `Исторический`,
  `Комедия`,
  `Мелодрама`,
];
const FilmProducers = [`Аарон Спеллинг`, `Джеймс Кэмерон`, `Майкл Бин`];
const FilmScreenwriters = [`Аарон Спеллинг`, `Джеймс Кэмерон`, `Майкл Бин`];
const FilmActors = [`Аарон Спеллинг`, `Джеймс Кэмерон`, `Майкл Бин`];
const FilmCountries = [`США`, `Франция`, `Великобритания`];

const getDuration = () => {
  const hours = getRandomIntegerNumber(1, 5);
  const minutes = getRandomIntegerNumber(1, 59);

  return `${hours}h ${minutes}m`;
};
const getRating = (min = 0, max = 10) => {
  const randRating = Math.random() * (max - min) + min;
  return randRating.toFixed(1);
};
const FilmDescriptions = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const getRandomArrayIndex = array => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return randomIndex;
};
const getRandomArrayElem = array => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};
const getGenres = () => {
  return [getRandomArrayElem(FilmGenres), getRandomArrayElem(FilmGenres)];
};
const getRandomDate = () => {
  const targerDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 7);
  const day = targerDate.getDate() + diffValue;
  const month = getRandomArrayElem(_const_js__WEBPACK_IMPORTED_MODULE_0__["MONTH_NAMES"]);
  const year = getRandomIntegerNumber(1990, 2019);

  return `${day} ${month} ${year}`;
};
// комментарии
const emoticons = [`smile`, `sleeping`, `puke`, `angry`];
const emoticonsText = [
  `Almost two hours? Seriously?`,
  `Very very old. Meh`,
  `Booooooooooring`,
];
const emoticonsAutor = [`John Doe`, `Tim Macoveev`];

const getRandomDateEmoticons = () => {
  const targerDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 7);
  const day = targerDate.getDate() + diffValue;
  const month = targerDate.getMonth();
  const year = getRandomIntegerNumber(1990, 2019);
  const hours = getRandomIntegerNumber(1, 23);
  const minutes = getRandomIntegerNumber(1, 59);

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};
const generateComments = () => {
  const randomCount = getRandomIntegerNumber(1, 5);
  const comments = [];
  for (let i = 0; i < randomCount; i++) {
    const comment = {
      emoticon: getRandomArrayElem(emoticons),
      text: getRandomArrayElem(emoticonsText),
      autor: getRandomArrayElem(emoticonsAutor),
      date: getRandomDateEmoticons(),
    };
    comments.push(comment);
  }
  return comments;
};

const generatePopup = () => {
  const randomIndex = getRandomArrayIndex(FilmTitles);

  return {
    poster: FilmPosters[randomIndex],
    title: FilmTitles[randomIndex],
    original: FilmTitles[randomIndex],
    rating: getRating(),
    userRating: getRandomIntegerNumber(0, 5),
    producer: getRandomArrayElem(FilmProducers),
    screenwriter: getRandomArrayElem(FilmScreenwriters),
    actors: getRandomArrayElem(FilmActors),
    releaseDate: getRandomDate(),
    duration: getDuration(),
    country: getRandomArrayElem(FilmCountries),
    genre: getGenres(),
    description: FilmDescriptions,
    ageRating: getRandomIntegerNumber(6, 18),
    comments: generateComments(),
  };
};




/***/ }),

/***/ "./src/mock/profile.js":
/*!*****************************!*\
  !*** ./src/mock/profile.js ***!
  \*****************************/
/*! exports provided: rank */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rank", function() { return rank; });
const numberOfMovies = 15;

const RankType = {
  NEITHER: 'neither',
  NOVICE: 'novice',
  FAN: 'fan',
  MOVIE_BUFF: 'movie buff',
};
const RankGradation = {
  [RankType.NEITHER]: {
    MIN_VALUE: -1,
    MAX_VALUE: 0,
  },
  [RankType.NOVICE]: {
    MIN_VALUE: 1,
    MAX_VALUE: 10,
  },
  [RankType.FAN]: {
    MIN_VALUE: 11,
    MAX_VALUE: 20,
  },
  [RankType.MOVIE_BUFF]: {
    MIN_VALUE: 20,
    MAX_VALUE: Infinity,
  },
};

let rank = Object.keys(RankGradation).find(key => {
  const min = Number(RankGradation[key].MIN_VALUE);
  const max = Number(RankGradation[key].MAX_VALUE);

  if (min <= numberOfMovies && numberOfMovies <= max) return key;
});



/***/ }),

/***/ "./src/mock/top-rated.js":
/*!*******************************!*\
  !*** ./src/mock/top-rated.js ***!
  \*******************************/
/*! exports provided: generateTopRated */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateTopRated", function() { return generateTopRated; });
const generateTopRated = films => {
  const sortByRating = arr => {
    arr.sort((a, b) => (a.rating > b.rating ? 1 : -1)).reverse();
  };
  sortByRating(films);
  return films.slice(0, 2);
};




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
import {createElement} from '../utils.js';
const createHeaderProfileComponent = (rank) => {
  const hasRank = !!rank;
  return `${hasRank ? `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
    : ``}`;
};
export default class Profile {
  constructor(rank) {
    this._element = null;
    this._rank = rank;
  }

  getTemplate() {
    return createHeaderProfileComponent(this._rank);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
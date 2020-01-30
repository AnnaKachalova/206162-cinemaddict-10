import moment from 'moment';

export default class FilmCard {
  constructor(data) {
    this.id = data[`id`];
    this.title = data[`film_info`][`title`] || ``;
    this.poster = data[`film_info`][`poster`] || ``;
    this.description = data[`film_info`][`description`] || ``;
    this.originalTitle = data[`film_info`][`alternative_title`] || ``;
    this.rating = data[`film_info`][`total_rating`] || 0;
    this.duration = data[`film_info`][`runtime`] || null;
    this.genre = data[`film_info`][`genre`] || [];
    this.isHistory = Boolean(data[`user_details`][`already_watched`]) || false;
    this.isWatchlist = Boolean(data[`user_details`][`watchlist`]) || false;
    this.isFavorite = Boolean(data[`user_details`][`favorite`]) || false;
    this.userRating = data[`user_details`][`personal_rating`] || ``;
    this.producer = data[`film_info`][`director`] || ``;
    this.screenwriter = data[`film_info`][`writers`] || [];
    this.actors = data[`film_info`][`actors`] || [];
    this.releaseDate = new Date(data[`film_info`][`release`][`date`] || null);
    this.country = data[`film_info`][`release`][`release_country`] || ``;
    this.ageRating = data[`film_info`][`age_rating`] || 0;
    this.comments = data[`comments`];
    this.watchedDate = moment(data[`user_details`][`watching_date`]).format() || null;
  }

  toRAW() {
    return {
      'comments': this.comments,

      'film_info': {
        'actors': this.actors,
        'age_rating': this.ageRating,
        'alternative_title': this.originalTitle,
        'description': this.description,
        'director': this.producer,
        'genre': this.genre,
        'poster': this.poster,
        'release': {
          'date': new Date(this.releaseDate),
          'release_country': this.country,
        },
        'runtime': this.duration,
        'title': this.title,
        'total_rating': parseInt(this.rating, 10),
        'writers': this.screenwriter,
      },
      'id': this.id,
      'user_details': {
        'already_watched': this.isHistory,
        'favorite': this.isFavorite,
        'personal_rating': parseInt(this.userRating, 10) || 0,
        'watching_date': new Date(this.watchedDate) || null,
        'watchlist': this.isWatchlist,
      },
    };
  }

  static parseCard(data) {
    return new FilmCard(data);
  }

  static parseCards(data) {
    return data.map(FilmCard.parseCard);
  }

  static clone(data) {
    return new FilmCard(data.toRAW());
  }
}

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
      film_info: {
        title: this.title,
        poster: this.poster,
        description: this.description,
        originalTitle: this.originalTitle,
        rating: this.rating,
        duration: this.duration,
        genre: this.genre,
        producer: this.producer,
        screenwriter: this.screenwriter,
        actors: this.actors,
        country: this.country,
        ageRating: this.ageRating,
        release: {
          date: new Date(this.releaseDate),
          release_country: this.country,
        },
      },
      comments: this.comments,
      user_details: {
        watchedDate: new Date(this.watchedDate) || null,
        isHistory: this.isHistory,
        isWatchlist: this.isWatchlist,
        isFavorite: this.isFavorite,
        userRating: this.userRating,
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

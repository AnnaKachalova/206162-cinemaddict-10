import { formatReleaseDate, formatDateAgo, formatDuration } from '../utils/common.js';

// main fields
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

const OriginalTitles = [
  `Alien`,
  `Ameli`,
  `Avatar`,
  `Back to the future`,
  `Bruce almighty`,
  `Fight club`,
  `Gladiator`,
  `Gone with the wind`,
  `Mr and Mrs Smith`,
  `1+1`,
  `Pretend my wife`,
  `Pulp fiction`,
  `The dark_knight`,
  `There are only girls in jazz`,
  `Truman show`,
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
const FilmGenres = [`Комедия`, `Мелодрама`];
const FilmDescriptions = `Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
// additional fields
const FilmProducers = [`Аарон Спеллинг`, `Джеймс Кэмерон`, `Майкл Бин`];
const FilmScreenwriters = [`Аарон Спеллинг`, `Джеймс Кэмерон`, `Майкл Бин`];
const FilmActors = [`Аарон Спеллинг`, `Джеймс Кэмерон`, `Майкл Бин`];
const FilmCountries = [`США`, `Франция`, `Великобритания`];
// comments
const emoticons = [`smile`, `sleeping`, `puke`, `angry`];
const emoticonsText = [
  `Almost two hours? Seriously?`,
  `Very very old. Meh`,
  `Booooooooooring`,
];
const emoticonsAutor = [`John Doe`, `Tim Macoveev`];

// utility functions
const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const getRandomArrayElem = array => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

// functions for fields
const getDescription = () => {
  const descriptions = FilmDescriptions.split(`. `);
  return [getRandomArrayElem(descriptions), getRandomArrayElem(descriptions)].join(`.`);
};
const getRating = (min = 0, max = 10) => {
  const randRating = Math.random() * (max - min) + min;
  return randRating.toFixed(1);
};
const getDuration = () => {
  const minutes = getRandomIntegerNumber(120, 400);

  return minutes;
};

const generateComments = () => {
  const randomCount = getRandomIntegerNumber(1, 5);
  const comments = [];
  for (let i = 0; i < randomCount; i++) {
    const comment = {
      emoji: getRandomArrayElem(emoticons),
      name: getRandomArrayElem(emoticonsAutor),
      text: getRandomArrayElem(emoticonsText),
      time: formatDateAgo(new Date()),
    };
    comments.push(comment);
  }
  return comments;
};

const generateFilmCard = () => {
  const randomIndex = getRandomIntegerNumber(0, FilmTitles.length);
  const isHistory = Math.random() > 0.5;
  return {
    id: String(new Date() + Math.random()),
    title: FilmTitles[randomIndex],
    poster: FilmPosters[randomIndex],
    description: getDescription(),
    rating: getRating(),
    productionYear: getRandomIntegerNumber(1990, 2019),
    duration: getDuration(),
    genre: FilmGenres,
    isHistory,
    isWatchlist: !isHistory,
    isFavorite: Math.random() > 0.5,
    originalTitle: OriginalTitles[randomIndex],
    userRating: getRandomIntegerNumber(0, 5),
    producer: getRandomArrayElem(FilmProducers),
    screenwriter: getRandomArrayElem(FilmScreenwriters),
    actor: getRandomArrayElem(FilmActors),
    releaseDate: formatReleaseDate(new Date()),
    country: getRandomArrayElem(FilmCountries),
    fullDescription: FilmDescriptions,
    ageRating: getRandomIntegerNumber(6, 18),
    comments: generateComments(),
    watchedDate: new Date(),
  };
};
const generateFilmCards = count => {
  return new Array(count).fill(``).map(generateFilmCard);
};

export { generateFilmCards };

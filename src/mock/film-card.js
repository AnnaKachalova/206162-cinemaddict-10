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
const FilmDescriptions = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
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

const generateFilmCard = () => {
  const randomIndex = getRandomArrayIndex(FilmTitles);

  return {
    title: FilmTitles[randomIndex],
    poster: FilmPosters[randomIndex],
    description: getDescription(),
  };
};
const generateFilmCards = count => {
  return new Array(count).fill(``).map(generateFilmCard);
};

export { generateFilmCards, generateFilmCard };

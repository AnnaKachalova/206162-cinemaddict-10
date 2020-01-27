export const FilterType = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
};

export const StatisticFilterType = [
  { title: `All time`, value: `all-time` },
  { title: `Today`, value: `today` },
  { title: `Week`, value: `week` },
  { title: `Month`, value: `month` },
  { title: `Year`, value: `year` },
];
export const RankType = {
  NEITHER: false,
  NOVICE: `novice`,
  FAN: `fan`,
  MOVIE_BUFF: `movie buff`,
};
export const RankGradation = {
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

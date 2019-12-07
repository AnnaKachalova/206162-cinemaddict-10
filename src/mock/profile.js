const numberOfMovies = 15;

const RankType = {
  NEITHER: `neither`,
  NOVICE: `novice`,
  FAN: `fan`,
  MOVIE_BUFF: `movie buff`,
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

let rank = Object.keys(RankGradation).find((key) => {
  const min = Number(RankGradation[key].MIN_VALUE);
  const max = Number(RankGradation[key].MAX_VALUE);
  if (min <= numberOfMovies && numberOfMovies <= max) {
    return key;
  }
  return RankType.NEITHER;
});
export {rank};

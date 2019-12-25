
const generateMostCommented = (films) => {

  return films
    .filter((element) => !!element.comments)
    .sort((a, b) => b.comments.length - a.comments.length)
    .slice(0, 2);

};

export {generateMostCommented};

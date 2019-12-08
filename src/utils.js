export const sortBy = (array, field) => {
  var newArray = array.slice();
  newArray.sort((a, b) => (a[field] > b[field] ? 1 : -1)).reverse();

  return newArray[0].field === 0 ? false : newArray.slice(0, 2);
};


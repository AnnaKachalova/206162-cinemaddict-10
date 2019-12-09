export const getItemsByField = (array, field) => {

  return array
    .filter((element) => !!element[field])
    .sort((a, b) => b[field] - a[field])
    .slice(0, 2);
};

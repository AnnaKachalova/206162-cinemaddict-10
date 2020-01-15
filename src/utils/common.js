import moment from 'moment';

export const formatReleaseDate = date => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const formatDateAgo = date => {
  return moment(date).format(`YYYY/MM/DD HH:MM`);
};
export const formatDuration = minutes => {
  return moment
    .utc(moment.duration(minutes, 'minutes').asMilliseconds())
    .format(`h[h] m[m]`);
};

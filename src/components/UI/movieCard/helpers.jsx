export function extractReleaseYear(details) {
  const date = details.release_date
    ? details.release_date
    : details.first_air_date;
  if (date) {
    return date.split('-')[0];
  } else {
    return '';
  }
}

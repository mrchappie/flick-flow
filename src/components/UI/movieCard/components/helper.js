export function checkMediaType(details) {
  return details['first_air_date'] ? 'tv' : 'movie';
}

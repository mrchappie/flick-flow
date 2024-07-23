export const tmdbImagesOrigin = process.env.REACT_APP_TMDB_IMAGE_API_ORIGIN;

export function capitalize(string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}

export function capitalizeWord(listName) {
  const trimedName = listName.replaceAll('_', ' ');
  return trimedName.slice(0, 1).toUpperCase() + trimedName.slice(1);
}

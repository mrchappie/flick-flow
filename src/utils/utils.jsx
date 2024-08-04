export const tmdbImagesOrigin = process.env.REACT_APP_TMDB_IMAGE_API_ORIGIN;

export function capitalize(string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}

export function capitalizeWords(listName) {
  const trimedName = listName.replaceAll('_', ' ');
  return trimedName.slice(0, 1).toUpperCase() + trimedName.slice(1);
}

export function trimText(text, size) {
  return text.slice(0, size);
}

export function formatRunningTime(itemDetails) {
  if (itemDetails.runtime) {
    // time is in minutes
    const hours = Math.floor(itemDetails.runtime / 60);
    const minutes = itemDetails.runtime - hours * 60;
    return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
  } else {
    return `${itemDetails.number_of_seasons} seasons • ${itemDetails.number_of_episodes} episodes`;
  }
}

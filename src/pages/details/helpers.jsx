export function formatRunningTime(time) {
  // time is minutes
  const hours = Math.floor(time / 60);
  const minutes = time - hours * 60;
  return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
}

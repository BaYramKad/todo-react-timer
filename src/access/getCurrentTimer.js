export function getCurrentTimer(number) {
  const date = new Date(number);
  date.setHours(0);
  date.setSeconds(number);

  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const minnutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

  return `${hours}:${minnutes}:${seconds}`;
}

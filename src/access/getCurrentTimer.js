export function getCurrentTimer(number) {
  const hours = Math.floor(number / 60 / 60) % 24;
  const minutes = Math.floor((number % 1000) / 60);
  const seconds = number % 60;

  const hoursCurrect = hours < 10 ? '0' + hours : hours;
  const minutesCurrect = minutes < 10 ? '0' + minutes : minutes;
  const secondsCurrect = seconds < 10 ? '0' + seconds : seconds;

  return `${hoursCurrect}:${minutesCurrect}:${secondsCurrect}`;
}

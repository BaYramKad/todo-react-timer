export function getCurrentTimer(number) {
  const seconds = number % 60;
  const hours = Math.floor(number / 60 / 60);
  const minutes = Math.floor(number / 60) - hours * 60;

  const hoursCurrect = hours < 10 ? '0' + hours : hours;
  const minutesCurrect = minutes < 10 ? '0' + minutes : minutes;
  const secondsCurrect = seconds < 10 ? '0' + seconds : seconds;

  return `${hoursCurrect}:${minutesCurrect}:${secondsCurrect}`;
}

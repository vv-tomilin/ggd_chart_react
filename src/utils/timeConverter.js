export function millisecondsToFormattedString(milliseconds) {
  const date = new Date(milliseconds);

  // Получаем компоненты даты и времени
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
  const year = date.getFullYear();
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  // Формируем строку в формате "DD.MM.YYYY HH:MM"
  return `${day}.${month}.${year} ${hour}:${minute}`;
}

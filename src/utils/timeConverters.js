export function excelDateToMilliseconds(serial) {
  // Основная дата в Excel (1 января 1900 года)
  const excelStartDate = new Date(Date.UTC(1900, 0, 1));

  // Количество дней между Excel и Unix эпохами
  const daysBetweenEpochs = (new Date(Date.UTC(1970, 0, 1)) - excelStartDate) / (1000 * 60 * 60 * 24);

  // Конвертация в миллисекунды
  const utcDays = Math.floor(serial - 25569 + daysBetweenEpochs);
  const utcValue = utcDays * 86400 * 1000; // количество миллисекунд за дни
  const dateInfo = new Date(utcValue);

  // Десятичная часть дня (время)
  const fractionalDay = serial - Math.floor(serial);
  const totalMilliseconds = Math.floor(86400 * 1000 * fractionalDay);

  return utcValue + totalMilliseconds;
}

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

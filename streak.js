export function toLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function shiftDate(dateString, amount) {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + amount);
  return toLocalDateString(date);
}

export function calculateCurrentStreak(completedDates, today = toLocalDateString()) {
  const completed = new Set(completedDates);
  const startDate = completed.has(today) ? today : shiftDate(today, -1);
  if (!completed.has(startDate)) return 0;
  let streak = 0;
  let date = startDate;
  while (completed.has(date)) {
    streak += 1;
    date = shiftDate(date, -1);
  }
  return streak;
}

export function isCompletedToday(completedDates) {
  return completedDates.includes(toLocalDateString());
}

export function getWeekDates(today = new Date()) {
  return Array.from({ length: 7 }, (_, index) => toLocalDateString(new Date(today.getFullYear(), today.getMonth(), today.getDate() - (6 - index))));
}
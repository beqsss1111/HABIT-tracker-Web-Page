const STORAGE_KEY = 'daymark-habits';

export function loadHabits() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const habits = JSON.parse(saved);
    return Array.isArray(habits) ? habits : [];
  } catch {
    return [];
  }
}

export function saveHabits(habits) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}
import { useEffect, useState } from 'react';
import AddHabitForm from './components/AddHabitForm';
import HabitList from './components/HabitList';
import Logo from './components/Logo';
import Statistics from './components/Statistics';
import Timer from './components/Timer';
import { loadHabits, saveHabits } from './utils/storage';
import { calculateCurrentStreak, getWeekDates, toLocalDateString } from './utils/streak';
import { playSuccess, playTap } from './utils/sounds';

function App() {
  const [habits, setHabits] = useState(loadHabits);
  const today = toLocalDateString();
  useEffect(() => saveHabits(habits), [habits]);
  function addHabit({ name, color }) { playSuccess(); setHabits((current) => [...current, { id: crypto.randomUUID(), name, color, completedDates: [] }]); }
  function toggleHabit(id) { const habit = habits.find((item) => item.id === id); if (habit && !habit.completedDates.includes(today)) playSuccess(); else playTap(); setHabits((current) => current.map((item) => { if (item.id !== id) return item; const dates = item.completedDates.includes(today) ? item.completedDates.filter((date) => date !== today) : [...item.completedDates, today]; return { ...item, completedDates: dates }; })); }
  function editHabit(id, changes) { setHabits((current) => current.map((habit) => habit.id === id ? { ...habit, ...changes } : habit)); }
  function deleteHabit(id) { const habit = habits.find((item) => item.id === id); if (habit && window.confirm(`Delete "${habit.name}"? This cannot be undone.`)) { playTap(); setHabits((current) => current.filter((item) => item.id !== id)); } }
  const weekDates = getWeekDates();
  const weekCompletions = habits.reduce((total, habit) => total + weekDates.filter((date) => habit.completedDates.includes(date)).length, 0);
  const longestStreak = habits.reduce((longest, habit) => Math.max(longest, calculateCurrentStreak(habit.completedDates)), 0);
  return <main className="app-shell motion-page"><header className="topbar motion-rise"><Logo /><span className="date-note">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span></header><section className="hero motion-rise"><div><p className="eyebrow">A little progress, every day</p><h1>Keep your promises<br /><em>to yourself.</em></h1><p className="hero-copy">Small rituals become the shape of a life. Keep track of the ones that matter.</p></div><div className="hero-tools"><div className="today-badge motion-card"><span>Today</span><strong>{habits.filter((habit) => habit.completedDates.includes(today)).length}<small> / {habits.length} done</small></strong></div><Timer /></div></section><section className="stats motion-rise" aria-label="Habit summary"><div><span>Total habits</span><strong>{habits.length}</strong></div><div><span>Longest streak</span><strong>{longestStreak}<small> days</small></strong></div><div><span>This week</span><strong>{weekCompletions}<small> completions</small></strong></div></section><Statistics habits={habits} /><AddHabitForm onAdd={addHabit} /><HabitList habits={habits} onToggle={toggleHabit} onEdit={editHabit} onDelete={deleteHabit} /></main>;
}

export default App;
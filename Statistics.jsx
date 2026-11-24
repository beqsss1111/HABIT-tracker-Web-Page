import { calculateCurrentStreak, getWeekDates, toLocalDateString } from '../utils/streak';

function formatDay(dateString) {
  return new Date(`${dateString}T12:00:00`).toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 2);
}

export default function Statistics({ habits }) {
  const today = toLocalDateString();
  const weekDates = getWeekDates();
  const totalCompletions = habits.reduce((total, habit) => total + habit.completedDates.length, 0);
  const completedToday = habits.filter((habit) => habit.completedDates.includes(today)).length;
  const completionRate = habits.length ? Math.round((completedToday / habits.length) * 100) : 0;
  const activeStreaks = habits.filter((habit) => calculateCurrentStreak(habit.completedDates) > 0).length;
  const dailyTotals = weekDates.map((date) => habits.filter((habit) => habit.completedDates.includes(date)).length);
  const chartMaximum = Math.max(habits.length, 1);

  return <section className="statistics motion-rise" aria-label="Detailed habit statistics">
    <div className="statistics-heading"><div><p className="eyebrow">The bigger picture</p><h2>Your statistics</h2></div><span className="statistics-period">Last 7 days</span></div>
    <div className="statistics-grid">
      <div className="stat-card"><span>Total completions</span><strong>{totalCompletions}</strong><small>All time</small></div>
      <div className="stat-card"><span>Today&apos;s rate</span><strong>{completionRate}<small>%</small></strong><small>{completedToday} of {habits.length} habits</small></div>
      <div className="stat-card"><span>Active streaks</span><strong>{activeStreaks}</strong><small>Habits with momentum</small></div>
    </div>
    <div className="activity-chart"><div className="chart-heading"><span>Daily activity</span><strong>{dailyTotals.reduce((total, count) => total + count, 0)} completions</strong></div><div className="chart-bars" role="img" aria-label="Completions for the last seven days">{dailyTotals.map((count, index) => <div className="chart-column" key={weekDates[index]}><span className="chart-value">{count || ''}</span><div className="chart-bar-track"><div className="chart-bar" style={{ height: `${Math.max((count / chartMaximum) * 100, count ? 8 : 2)}%` }} /></div><span className="chart-day">{formatDay(weekDates[index])}</span></div>)}</div></div>
  </section>;
}
import { toLocalDateString } from '../utils/streak';

function getHeatmapDates() {
  const today = new Date();
  const firstDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 89);
  const dates = Array.from({ length: 90 }, (_, index) => toLocalDateString(new Date(today.getFullYear(), today.getMonth(), today.getDate() - (89 - index))));
  return [...Array(firstDate.getDay()).fill(null), ...dates];
}

export default function HeatMap({ completedDates, color }) {
  const completed = new Set(completedDates);
  const dates = getHeatmapDates();
  const weeks = [];
  for (let index = 0; index < dates.length; index += 7) weeks.push(dates.slice(index, index + 7));
  return <div className="heatmap" aria-label="Completion history for the last 90 days">{weeks.map((week, weekIndex) => <div className="heatmap-week" key={`${week[0] || 'blank'}-${weekIndex}`}>{week.map((date, dateIndex) => date ? <span className={`heat-cell motion-cell ${completed.has(date) ? 'complete' : ''}`} style={completed.has(date) ? { '--habit-color': color, color } : undefined} title={`${date}${completed.has(date) ? ' - completed' : ''}`} key={date} /> : <span className="heat-cell blank" key={`blank-${dateIndex}`} />)}</div>)}</div>;
}
import HabitItem from './HabitItem';
export default function HabitList({ habits, onToggle, onEdit, onDelete }) {
  if (!habits.length) return <div className="empty-state"><div className="empty-mark">+</div><h2>Your rhythm starts here</h2><p>Add your first habit above and make today count.</p></div>;
  return <section className="habit-list motion-rise">{habits.map((habit) => <HabitItem key={habit.id} habit={habit} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />)}</section>;
}
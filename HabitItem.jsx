import { useState } from 'react';
import HeatMap from './HeatMap';
import { calculateCurrentStreak, isCompletedToday } from '../utils/streak';
import { playTap } from '../utils/sounds';

export default function HabitItem({ habit, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [name, setName] = useState(habit.name);
  const [color, setColor] = useState(habit.color);
  const doneToday = isCompletedToday(habit.completedDates);
  function handleToggle() {
    if (!doneToday) {
      setCelebrating(true);
      window.setTimeout(() => setCelebrating(false), 720);
    }
    onToggle(habit.id);
  }
  function saveEdit(event) {
    event.preventDefault();
    if (!name.trim()) return;
    playTap();
    onEdit(habit.id, { name: name.trim(), color });
    setEditing(false);
  }
  return <article className={`habit-card motion-card ${celebrating ? 'motion-celebrate' : ''}`} style={{ '--habit-color': habit.color }}><div className="habit-main"><button className={`done-button motion-button ${doneToday ? 'is-done' : ''}`} onClick={handleToggle} aria-label={doneToday ? `Unmark ${habit.name} for today` : `Mark ${habit.name} done today`}>{doneToday ? '✓' : ''}</button>{editing ? <form className="edit-form" onSubmit={saveEdit}><input className="motion-input" value={name} onChange={(event) => setName(event.target.value)} autoFocus aria-label="Edit habit name" /><input type="color" value={color} onChange={(event) => setColor(event.target.value)} aria-label="Edit habit color" /><button type="submit" className="text-button motion-button">Save</button><button type="button" className="text-button motion-button muted" onClick={() => setEditing(false)}>Cancel</button></form> : <div className="habit-copy"><h3>{habit.name}</h3><span className="habit-status">{doneToday ? 'Completed today' : 'Ready when you are'}</span></div>}{!editing && <div className="habit-actions"><button className="icon-button motion-button" onClick={() => setEditing(true)} aria-label={`Edit ${habit.name}`}>Edit</button><button className="icon-button danger motion-button" onClick={() => onDelete(habit.id)} aria-label={`Delete ${habit.name}`}>Delete</button></div>}</div><div className="habit-meta"><div className="streak"><strong className="streak-number">{calculateCurrentStreak(habit.completedDates)}</strong><span>day streak</span></div><div className="heatmap-wrap"><span className="history-label">Last 90 days</span><HeatMap completedDates={habit.completedDates} color={habit.color} /></div></div></article>;
}
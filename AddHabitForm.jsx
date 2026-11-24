import { useState } from 'react';

const COLORS = ['#2f8f83', '#e47a5f', '#d6a84f', '#6c83c2', '#9a6caf', '#477b5d'];

export default function AddHabitForm({ onAdd }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;
    onAdd({ name: trimmedName, color });
    setName('');
  }
  return <form className="add-form motion-rise" onSubmit={handleSubmit}><div className="form-heading"><span className="form-kicker">Build your rhythm</span><h2>Add a habit</h2></div><div className="form-fields"><label className="name-field"><span className="sr-only">Habit name</span><input className="motion-input" value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Read for 20 minutes" maxLength={80} /></label><div className="color-picker" aria-label="Choose a color tag">{COLORS.map((option) => <button type="button" className={`color-swatch motion-button ${color === option ? 'selected' : ''}`} style={{ backgroundColor: option }} onClick={() => setColor(option)} key={option} aria-label={`Use ${option} tag`} />)}</div><button className="primary-button motion-button motion-submit" type="submit">Add habit <span aria-hidden="true">+</span></button></div></form>;
}
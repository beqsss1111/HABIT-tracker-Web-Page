import { useEffect, useState } from 'react';
import { playReset, playTap } from '../utils/sounds';

const MODES = [
  { label: 'Work', seconds: 25 * 60 },
  { label: 'Short break', seconds: 5 * 60 },
  { label: 'Long break', seconds: 15 * 60 },
];
const CIRCUMFERENCE = 2 * Math.PI * 90;

export default function Timer() {
  const [mode, setMode] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return undefined;
    const interval = window.setInterval(() => {
      setElapsed((current) => Math.min(current + 1, MODES[mode].seconds));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [mode, running]);

  const total = MODES[mode].seconds;
  const remaining = Math.max(total - elapsed, 0);
  const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
  const seconds = String(remaining % 60).padStart(2, '0');

  function selectMode(nextMode) {
    playTap();
    setRunning(false);
    setMode(nextMode);
    setElapsed(0);
  }

  function reset() {
    playReset();
    setRunning(false);
    setElapsed(0);
  }

  return (
    <section className={`focus-panel ${running ? 'motion-running' : ''} motion-rise`}>
      <div className="focus-copy">
        <p className="focus-kicker">A minute for yourself</p>
        <h2>Focus mode</h2>
        <p>Work deeply, rest deliberately, and let the timer hold the rhythm.</p>
      </div>
      <div>
        <div className="timer-shell">
          <svg className="timer-ring" viewBox="0 0 200 200" aria-hidden="true">
            <circle className="timer-track" cx="100" cy="100" r="90" />
            <circle className="timer-progress" cx="100" cy="100" r="90" style={{ strokeDasharray: CIRCUMFERENCE, strokeDashoffset: CIRCUMFERENCE - (elapsed / total) * CIRCUMFERENCE }} />
          </svg>
          <div className="timer-center"><span className="timer-time">{minutes}:{seconds}</span><span className="timer-label">{running ? 'In progress' : elapsed ? 'Paused' : MODES[mode].label}</span></div>
        </div>
        <div className="timer-modes">{MODES.map((item, index) => <button type="button" className={`timer-mode motion-button ${mode === index ? 'active' : ''}`} onClick={() => selectMode(index)} key={item.label}>{item.label} {item.seconds / 60}</button>)}</div>
        <div className="timer-controls"><button type="button" className="timer-btn primary motion-button" onClick={() => { playTap(); setRunning((current) => !current); }}>{running ? 'Pause' : 'Start'}</button><button type="button" className="timer-btn motion-button" onClick={reset}>Reset</button></div>
      </div>
    </section>
  );
}

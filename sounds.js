let audioContext;

function getAudioContext() {
  audioContext ??= new window.AudioContext();
  if (audioContext.state === 'suspended') audioContext.resume();
  return audioContext;
}

function tone(frequency, duration, volume, type = 'sine', delay = 0) {
  const context = getAudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const start = context.currentTime + delay;
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

export function playTap() {
  tone(520, 0.07, 0.025, 'sine');
}

export function playSuccess() {
  tone(660, 0.12, 0.035, 'sine');
  tone(880, 0.18, 0.028, 'sine', 0.08);
}

export function playReset() {
  tone(360, 0.11, 0.022, 'triangle');
}

(() => {
  const focus = document.getElementById('focus');
  const controls = focus?.querySelector('.controls');
  if (!controls) return;
  const goal = document.createElement('div');
  goal.className = 'focus-goal';
  goal.innerHTML = '<div class="goal-row"><span>Daily focus goal</span><select class="goal-select"><option value="30">30 min</option><option value="60" selected>60 min</option><option value="90">90 min</option><option value="120">120 min</option></select></div><div class="goal-track"><div class="goal-fill"></div></div><div class="reward"><span class="reward-icon">◇</span><span>Focus your first minute to unlock Momentum</span></div>';
  controls.after(goal);
  const select = goal.querySelector('.goal-select');
  const fill = goal.querySelector('.goal-fill');
  const reward = goal.querySelector('.reward');
  const text = goal.querySelector('span:last-child');
  let seconds = Number(localStorage.getItem('daymark-focus-seconds') || 0);
  function draw() {
    const target = Number(select.value) * 60;
    fill.style.width = `${Math.min(seconds / target * 100, 100)}%`;
    reward.classList.toggle('unlocked', seconds >= 60);
    text.textContent = seconds >= target ? 'Goal complete - Momentum unlocked' : seconds >= 60 ? 'Momentum unlocked - keep going' : 'Focus your first minute to unlock Momentum';
  }
  setInterval(() => {
    if (document.getElementById('label')?.textContent === 'In progress') {
      seconds += 1;
      if (seconds % 15 === 0) localStorage.setItem('daymark-focus-seconds', seconds);
      draw();
    }
  }, 1000);
  select.addEventListener('change', draw);
  draw();
})();

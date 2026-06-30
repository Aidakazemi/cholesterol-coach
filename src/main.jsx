import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Activity, Apple, ChevronLeft, ChevronRight, Dumbbell, Droplets, Moon, Salad, ShoppingBasket, TrendingUp, Utensils, Waves } from 'lucide-react';
import './styles.css';
import { buildPlan, groceryList } from './planData';

const STORAGE_KEY = 'cholesterol-coach-progress-v1';

const checklistItems = [
  { key: 'breakfast', label: 'Breakfast', icon: Utensils },
  { key: 'lunch', label: 'Lunch', icon: Salad },
  { key: 'dinner', label: 'Dinner', icon: Apple },
  { key: 'snack', label: 'Snack', icon: ShoppingBasket },
  { key: 'workout', label: 'Workout', icon: Dumbbell },
  { key: 'walk', label: 'Walking', icon: Activity },
  { key: 'water', label: 'Water', icon: Droplets },
  { key: 'sleep', label: 'Sleep', icon: Moon }
];

const metricLabels = {
  calories: 'Calories',
  protein: 'Protein',
  fiber: 'Fiber',
  saturatedFat: 'Sat fat',
  cholesterol: 'Cholesterol'
};

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function getWeekStats(plan, progress, weekIndex) {
  const weekDays = plan.slice(weekIndex * 7, weekIndex * 7 + 7);
  const totals = weekDays.reduce((acc, day) => {
    const dayProgress = progress[day.day] || {};
    const completed = checklistItems.filter((item) => dayProgress[item.key]).length;
    acc.checks += completed;
    acc.possible += checklistItems.length;
    acc.fiber += day.totals.fiber;
    acc.protein += day.totals.protein;
    acc.workouts += dayProgress.workout ? 1 : 0;
    acc.limitDays += day.totals.saturatedFat <= day.limits.saturatedFatGrams && day.totals.cholesterol <= 200 ? 1 : 0;
    return acc;
  }, { checks: 0, possible: 0, fiber: 0, protein: 0, workouts: 0, limitDays: 0 });

  return {
    adherence: totals.possible ? Math.round((totals.checks / totals.possible) * 100) : 0,
    avgFiber: Math.round(totals.fiber / weekDays.length),
    avgProtein: Math.round(totals.protein / weekDays.length),
    workouts: totals.workouts,
    limitDays: totals.limitDays
  };
}

function formatMacro(value, key) {
  if (key === 'calories') return Math.round(value).toLocaleString();
  if (key === 'cholesterol') return Math.round(value) + ' mg';
  return Math.round(value) + ' g';
}

function App() {
  const plan = useMemo(() => buildPlan(), []);
  const [selectedDay, setSelectedDay] = useState(1);
  const [progress, setProgress] = useState(loadProgress);
  const day = plan[selectedDay - 1];
  const dayProgress = progress[selectedDay] || {};
  const activeWeek = Math.floor((selectedDay - 1) / 7);
  const weekStats = getWeekStats(plan, progress, activeWeek);
  const satFatPercent = Math.round(((day.totals.saturatedFat * 9) / day.totals.calories) * 100);
  const completedChecks = checklistItems.filter((item) => dayProgress[item.key]).length;

  function updateCheck(key) {
    setProgress((current) => {
      const next = { ...current, [selectedDay]: { ...current[selectedDay], [key]: !current[selectedDay]?.[key] } };
      saveProgress(next);
      return next;
    });
  }

  function jumpDay(delta) {
    setSelectedDay((current) => Math.min(60, Math.max(1, current + delta)));
  }

  return (
    <main className="app-shell">
      <section className="topbar">
        <div>
          <p className="eyebrow">60-day cholesterol coach</p>
          <h1>Day {selectedDay}: {day.theme}</h1>
        </div>
        <div className="day-switcher" aria-label="Day navigation">
          <button type="button" onClick={() => jumpDay(-1)} disabled={selectedDay === 1} aria-label="Previous day"><ChevronLeft size={18} /></button>
          <select value={selectedDay} onChange={(event) => setSelectedDay(Number(event.target.value))}>
            {plan.map((item) => <option key={item.day} value={item.day}>Day {item.day}</option>)}
          </select>
          <button type="button" onClick={() => jumpDay(1)} disabled={selectedDay === 60} aria-label="Next day"><ChevronRight size={18} /></button>
        </div>
      </section>

      <section className="status-grid" aria-label="Daily nutrition limits">
        <MetricCard label="Calories" value={formatMacro(day.totals.calories, 'calories')} detail={day.totals.protein + 'g protein'} />
        <MetricCard label="Saturated fat" value={day.totals.saturatedFat + 'g'} detail={satFatPercent + '% of calories, max ' + day.limits.saturatedFatGrams + 'g'} alert={satFatPercent > 8} />
        <MetricCard label="Cholesterol" value={day.totals.cholesterol + 'mg'} detail="Max 200mg daily" alert={day.totals.cholesterol > 200} />
        <MetricCard label="Fiber" value={day.totals.fiber + 'g'} detail="Aim for 30g or more" good={day.totals.fiber >= 30} />
      </section>

      <section className="content-grid">
        <div className="panel meal-panel">
          <div className="panel-heading"><div><p className="eyebrow">Trader Joe's, Costco, easy grocery</p><h2>Meal Plan</h2></div><Utensils size={22} /></div>
          <div className="meal-list">
            {day.meals.map((meal) => (
              <article className="meal-card" key={meal.slot}>
                <div className="meal-title-row"><span>{meal.slot}</span><strong>{meal.name}</strong></div>
                <p>{meal.items}</p>
                <div className="macro-row">
                  {Object.entries(metricLabels).map(([key, label]) => <span key={key}>{label}: {formatMacro(meal.macros[key], key)}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="panel checklist-panel">
          <div className="panel-heading"><div><p className="eyebrow">{completedChecks}/8 completed</p><h2>Daily Checklist</h2></div><TrendingUp size={22} /></div>
          <div className="checklist">
            {checklistItems.map((item) => {
              const Icon = item.icon;
              const checked = Boolean(dayProgress[item.key]);
              return <button className={'check-item ' + (checked ? 'checked' : '')} key={item.key} type="button" onClick={() => updateCheck(item.key)} aria-pressed={checked}><Icon size={18} /><span>{item.label}</span></button>;
            })}
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel grocery-panel">
          <div className="panel-heading">
            <div><p className="eyebrow">Shopping guide</p><h2>Grocery List</h2></div>
            <ShoppingBasket size={22} />
          </div>
          <div className="grocery-grid">
            {groceryList.map((group) => (
              <article className="grocery-group" key={group.store}>
                <h3>{group.store}</h3>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="panel workout-panel">
          <div className="panel-heading"><div><p className="eyebrow">{day.workout.isWorkoutDay ? day.weekday + ', 35-45 minutes' : 'Next session Tuesday or Saturday'}</p><h2>Workout Plan</h2></div><Dumbbell size={22} /></div>
          {day.workout.isWorkoutDay ? <div className="workout-options"><WorkoutBlock title="Home" plan={day.workout.home} /><WorkoutBlock title="Gym" plan={day.workout.gym} /></div> : <div className="rest-day"><Waves size={26} /><p>{day.workout.note}</p></div>}
        </div>

        <div className="panel week-panel full-width-panel">
          <div className="panel-heading"><div><p className="eyebrow">Week {activeWeek + 1}</p><h2>Progress Summary</h2></div><Activity size={22} /></div>
          <div className="summary-grid">
            <MetricCard label="Checklist" value={weekStats.adherence + '%'} detail="Weekly completion" />
            <MetricCard label="Fiber" value={weekStats.avgFiber + 'g'} detail="Daily average" />
            <MetricCard label="Protein" value={weekStats.avgProtein + 'g'} detail="Daily average" />
            <MetricCard label="Limits met" value={weekStats.limitDays + '/7'} detail="Sat fat and cholesterol" />
          </div>
          <div className="mini-calendar" aria-label="Week day completion">
            {plan.slice(activeWeek * 7, activeWeek * 7 + 7).map((item) => {
              const checks = checklistItems.filter((check) => progress[item.day]?.[check.key]).length;
              return <button key={item.day} type="button" className={item.day === selectedDay ? 'active' : ''} onClick={() => setSelectedDay(item.day)}><span>{item.weekday.slice(0, 3)}</span><strong>{checks}/8</strong></button>;
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function MetricCard({ label, value, detail, alert, good }) {
  return <article className={'metric-card ' + (alert ? 'alert ' : '') + (good ? 'good' : '')}><span>{label}</span><strong>{value}</strong><p>{detail}</p></article>;
}

function WorkoutBlock({ title, plan }) {
  return <article className="workout-block"><h3>{title}</h3><ol>{plan.map((step) => <li key={step}>{step}</li>)}</ol></article>;
}

createRoot(document.getElementById('root')).render(<App />);

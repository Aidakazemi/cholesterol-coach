import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  Apple,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Dumbbell,
  Droplets,
  HeartPulse,
  Moon,
  Salad,
  ShoppingBasket,
  TrendingUp,
  Utensils,
  UserRound,
} from 'lucide-react';
import './styles.css';
import { buildPlan, getWeeklyGroceryList } from './planData';

const STORAGE_KEY = 'cholesterol-coach-state-v2';

const checklistItems = [
  { key: 'breakfast', label: 'Breakfast', icon: Utensils },
  { key: 'lunch', label: 'Lunch', icon: Salad },
  { key: 'dinner', label: 'Dinner', icon: Apple },
  { key: 'snack', label: 'Snack', icon: ShoppingBasket },
  { key: 'workout', label: 'Workout', icon: Dumbbell },
  { key: 'walk', label: 'Walking', icon: Activity },
  { key: 'water', label: 'Water', icon: Droplets },
  { key: 'sleep', label: 'Sleep', icon: Moon },
];

const defaultProfile = {
  startDate: new Date().toISOString().slice(0, 10),
  age: '45',
  gender: 'female',
  height: '165',
  weight: '75',
  activity: 'light',
  goal: 'steady_loss',
  calorieTarget: '',
};

const defaultState = { progress: {}, profile: defaultProfile, labs: [] };

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...defaultState, ...stored, profile: { ...defaultProfile, ...stored?.profile } };
  } catch {
    return defaultState;
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function addDays(dateText, offset) {
  const date = new Date(dateText + 'T12:00:00');
  date.setDate(date.getDate() + offset);
  return date;
}

function formatDate(date) {
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(date);
}

function formatLongDate(date) {
  return new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

function estimateCalories(profile) {
  const age = Number(profile.age);
  const height = Number(profile.height);
  const weight = Number(profile.weight);
  if (!age || !height || !weight) return 1850;
  const base = profile.gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  const activityMap = { sedentary: 1.2, light: 1.35, moderate: 1.5, active: 1.7 };
  const goalMap = { steady_loss: -250, maintain: 0, performance: 150 };
  return Math.max(1400, Math.round(base * activityMap[profile.activity] + goalMap[profile.goal]));
}

function getTarget(profile) {
  return Number(profile.calorieTarget) || estimateCalories(profile);
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
    acc.limitDays += day.totals.saturatedFat <= day.limits.saturatedFatGrams && day.totals.cholesterol <= 200 ? 1 : 0;
    return acc;
  }, { checks: 0, possible: 0, fiber: 0, protein: 0, limitDays: 0 });

  return {
    adherence: totals.possible ? Math.round((totals.checks / totals.possible) * 100) : 0,
    avgFiber: Math.round(totals.fiber / weekDays.length),
    avgProtein: Math.round(totals.protein / weekDays.length),
    limitDays: totals.limitDays,
  };
}

function formatMacro(value, key) {
  if (key === 'calories') return Math.round(value).toLocaleString();
  if (key === 'cholesterol') return Math.round(value) + ' mg';
  return Math.round(value) + ' g';
}

function App() {
  const [state, setState] = useState(loadState);
  const [selectedDay, setSelectedDay] = useState(1);
  const calorieTarget = getTarget(state.profile);
  const plan = useMemo(() => buildPlan({ calorieTarget }), [calorieTarget]);
  const day = plan[selectedDay - 1];
  const dayDate = addDays(state.profile.startDate, selectedDay - 1);
  const activeWeek = Math.floor((selectedDay - 1) / 7);
  const grocery = getWeeklyGroceryList(activeWeek);
  const dayProgress = state.progress[selectedDay] || {};
  const weekStats = getWeekStats(plan, state.progress, activeWeek);
  const satFatPercent = Math.round(((day.totals.saturatedFat * 9) / day.totals.calories) * 100);
  const completedChecks = checklistItems.filter((item) => dayProgress[item.key]).length;

  function patchState(patch) {
    setState((current) => {
      const next = typeof patch === 'function' ? patch(current) : { ...current, ...patch };
      saveState(next);
      return next;
    });
  }

  function updateCheck(key) {
    patchState((current) => ({
      ...current,
      progress: {
        ...current.progress,
        [selectedDay]: { ...current.progress[selectedDay], [key]: !current.progress[selectedDay]?.[key] },
      },
    }));
  }

  function updateProfile(key, value) {
    patchState((current) => ({ ...current, profile: { ...current.profile, [key]: value } }));
  }

  function addLab(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const lab = Object.fromEntries(form.entries());
    if (!lab.date) return;
    patchState((current) => ({ ...current, labs: [...current.labs, lab].sort((a, b) => a.date.localeCompare(b.date)) }));
    event.currentTarget.reset();
  }

  function jumpDay(delta) {
    setSelectedDay((current) => Math.min(60, Math.max(1, current + delta)));
  }

  return (
    <main className="app-shell">
      <section className="hero-band">
        <div>
          <p className="eyebrow">Personal cholesterol coach</p>
          <h1>Day {selectedDay}: {day.theme}</h1>
          <p className="hero-date"><CalendarDays size={18} /> {formatLongDate(dayDate)}</p>
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
        <MetricCard label="Calorie target" value={calorieTarget.toLocaleString()} detail={day.totals.calories.toLocaleString() + ' planned today'} />
        <MetricCard label="Saturated fat" value={day.totals.saturatedFat + 'g'} detail={satFatPercent + '% of calories, max ' + day.limits.saturatedFatGrams + 'g'} alert={satFatPercent > 8} />
        <MetricCard label="Cholesterol" value={day.totals.cholesterol + 'mg'} detail="Max 200mg daily" alert={day.totals.cholesterol > 200} />
        <MetricCard label="Fiber / Protein" value={day.totals.fiber + 'g / ' + day.totals.protein + 'g'} detail="High fiber, lean protein focus" good={day.totals.fiber >= 30} />
      </section>

      <section className="content-grid main-grid">
        <div className="panel meal-panel">
          <PanelTitle eyebrow="Cook at home with easy groceries" title="Meal Plan" icon={Utensils} />
          <div className="meal-list">
            {day.meals.map((meal) => <MealCard meal={meal} key={meal.slot} />)}
          </div>
        </div>

        <aside className="side-stack">
          <div className="panel checklist-panel">
            <PanelTitle eyebrow={completedChecks + '/8 completed'} title="Daily Checklist" icon={ClipboardList} />
            <div className="checklist">
              {checklistItems.map((item) => {
                const Icon = item.icon;
                const checked = Boolean(dayProgress[item.key]);
                return <button className={'check-item ' + (checked ? 'checked' : '')} key={item.key} type="button" onClick={() => updateCheck(item.key)} aria-pressed={checked}><Icon size={18} /><span>{item.label}</span></button>;
              })}
            </div>
          </div>
          <ProfilePanel profile={state.profile} calorieTarget={calorieTarget} updateProfile={updateProfile} />
        </aside>
      </section>

      <section className="content-grid lower-grid">
        <WorkoutPanel workout={day.workout} weekday={day.weekday} />
        <GroceryPanel grocery={grocery} weekNumber={activeWeek + 1} />
        <WeekPanel plan={plan} progress={state.progress} selectedDay={selectedDay} setSelectedDay={setSelectedDay} activeWeek={activeWeek} weekStats={weekStats} startDate={state.profile.startDate} />
        <LabPanel labs={state.labs} addLab={addLab} />
      </section>
    </main>
  );
}

function PanelTitle({ eyebrow, title, icon: Icon }) {
  return <div className="panel-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div><Icon size={22} /></div>;
}

function MetricCard({ label, value, detail, alert, good }) {
  return <article className={'metric-card ' + (alert ? 'alert ' : '') + (good ? 'good' : '')}><span>{label}</span><strong>{value}</strong><p>{detail}</p></article>;
}

function MealCard({ meal }) {
  return <article className="meal-card">
    <div className="meal-title-row"><span>{meal.slot}</span><strong>{meal.name}</strong></div>
    <p>{meal.description}</p>
    <div className="prep-box"><strong>Simple prep:</strong> {meal.prep}</div>
    <div className="source-row">{meal.sources.map((source) => <span key={source}>{source}</span>)}</div>
    <div className="macro-row">
      <span>Calories: {formatMacro(meal.macros.calories, 'calories')}</span>
      <span>Protein: {formatMacro(meal.macros.protein, 'protein')}</span>
      <span>Fiber: {formatMacro(meal.macros.fiber, 'fiber')}</span>
      <span>Sat fat: {formatMacro(meal.macros.saturatedFat, 'saturatedFat')}</span>
      <span>Cholesterol: {formatMacro(meal.macros.cholesterol, 'cholesterol')}</span>
    </div>
  </article>;
}

function ProfilePanel({ profile, calorieTarget, updateProfile }) {
  return <div className="panel profile-panel">
    <PanelTitle eyebrow="Personalize portions" title="Profile" icon={UserRound} />
    <div className="form-grid">
      <label>Start date<input type="date" value={profile.startDate} onChange={(e) => updateProfile('startDate', e.target.value)} /></label>
      <label>Age<input inputMode="numeric" value={profile.age} onChange={(e) => updateProfile('age', e.target.value)} /></label>
      <label>Gender<select value={profile.gender} onChange={(e) => updateProfile('gender', e.target.value)}><option value="female">Female</option><option value="male">Male</option><option value="other">Other</option></select></label>
      <label>Height cm<input inputMode="numeric" value={profile.height} onChange={(e) => updateProfile('height', e.target.value)} /></label>
      <label>Weight kg<input inputMode="numeric" value={profile.weight} onChange={(e) => updateProfile('weight', e.target.value)} /></label>
      <label>Activity<select value={profile.activity} onChange={(e) => updateProfile('activity', e.target.value)}><option value="sedentary">Sedentary</option><option value="light">Light</option><option value="moderate">Moderate</option><option value="active">Active</option></select></label>
      <label>Goal<select value={profile.goal} onChange={(e) => updateProfile('goal', e.target.value)}><option value="steady_loss">Gentle weight loss</option><option value="maintain">Maintain</option><option value="performance">Fuel workouts</option></select></label>
      <label>Manual calories<input inputMode="numeric" placeholder="Optional" value={profile.calorieTarget} onChange={(e) => updateProfile('calorieTarget', e.target.value)} /></label>
    </div>
    <p className="note">Estimated target: {calorieTarget.toLocaleString()} calories. This app is a planning aid, not medical advice.</p>
  </div>;
}

function WorkoutPanel({ workout, weekday }) {
  return <div className="panel workout-panel">
    <PanelTitle eyebrow={workout.isWorkoutDay ? weekday + ', 35-45 minutes' : 'Next session Tuesday or Saturday'} title="Workout Guide" icon={Dumbbell} />
    {workout.isWorkoutDay ? <div className="workout-options"><WorkoutBlock title="Home" plan={workout.home} /><WorkoutBlock title="Gym" plan={workout.gym} /></div> : <div className="rest-day"><Activity size={28} /><p>{workout.note}</p></div>}
  </div>;
}

function WorkoutBlock({ title, plan }) {
  return <article className="workout-block"><h3>{title}</h3><div className="movement-grid">{plan.map((move) => <MovementCard move={move} key={move.name} />)}</div></article>;
}

function MovementCard({ move }) {
  return <div className="movement-card"><div className={'movement-figure ' + move.type}><span></span></div><div><strong>{move.name}</strong><p>{move.dose}</p><small>{move.cue}</small></div></div>;
}

function GroceryPanel({ grocery, weekNumber }) {
  return <div className="panel grocery-panel"><PanelTitle eyebrow={'Week ' + weekNumber + ' shopping'} title="Weekly Grocery List" icon={ShoppingBasket} /><div className="grocery-grid">{grocery.groups.map((group) => <article className="grocery-group" key={group.store}><h3>{group.store}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></div>;
}

function WeekPanel({ plan, progress, selectedDay, setSelectedDay, activeWeek, weekStats, startDate }) {
  return <div className="panel week-panel"><PanelTitle eyebrow={'Week ' + (activeWeek + 1)} title="Calendar & Progress" icon={CalendarDays} /><div className="summary-grid"><MetricCard label="Checklist" value={weekStats.adherence + '%'} detail="Weekly completion" /><MetricCard label="Fiber" value={weekStats.avgFiber + 'g'} detail="Daily average" /><MetricCard label="Protein" value={weekStats.avgProtein + 'g'} detail="Daily average" /><MetricCard label="Limits met" value={weekStats.limitDays + '/7'} detail="Sat fat and cholesterol" /></div><div className="calendar-grid" aria-label="Week calendar">{plan.slice(activeWeek * 7, activeWeek * 7 + 7).map((item) => { const checks = checklistItems.filter((check) => progress[item.day]?.[check.key]).length; const date = addDays(startDate, item.day - 1); return <button key={item.day} type="button" className={item.day === selectedDay ? 'active' : ''} onClick={() => setSelectedDay(item.day)}><span>{item.weekday.slice(0, 3)}</span><strong>{formatDate(date)}</strong><em>{checks}/8</em></button>; })}</div></div>;
}

function LabPanel({ labs, addLab }) {
  const latest = labs[labs.length - 1];
  const first = labs[0];
  return <div className="panel lab-panel"><PanelTitle eyebrow="Blood test tracking" title="Lipid Labs" icon={HeartPulse} /><form className="lab-form" onSubmit={addLab}><input name="date" type="date" required /><input name="total" placeholder="Total" inputMode="numeric" /><input name="ldl" placeholder="LDL" inputMode="numeric" /><input name="hdl" placeholder="HDL" inputMode="numeric" /><input name="triglycerides" placeholder="Triglycerides" inputMode="numeric" /><button type="submit">Add</button></form>{labs.length ? <div className="lab-table"><div className="lab-row lab-head"><span>Date</span><span>Total</span><span>LDL</span><span>HDL</span><span>TG</span></div>{labs.map((lab) => <div className="lab-row" key={lab.date + lab.ldl}><span>{lab.date}</span><span>{lab.total || '-'}</span><span>{lab.ldl || '-'}</span><span>{lab.hdl || '-'}</span><span>{lab.triglycerides || '-'}</span></div>)}{latest && first && latest !== first ? <p className="note">Latest vs first LDL: {Number(latest.ldl || 0) - Number(first.ldl || 0)} mg/dL.</p> : null}</div> : <p className="note">Enter values from each blood test so you can compare trends over time.</p>}</div>;
}

createRoot(document.getElementById('root')).render(<App />);

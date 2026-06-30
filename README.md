# 60-Day Cholesterol Coach

A React + local storage web app for a 60-day cholesterol-support plan.

## What is included

- Dated 60-day calendar tracking based on your chosen start date
- Daily meal plan with breakfast, lunch, dinner, and snack
- Cook-at-home meals using ingredients from Costco, Trader Joe's, and normal pantry items
- Daily nutrition totals for calories, protein, fiber, saturated fat, and cholesterol
- Saturated fat limit shown as max 8% of calories, plus cholesterol max 200 mg/day
- Profile inputs for age, gender, height, weight, activity level, goal, and optional manual calorie target
- Calorie plan adjusts from the profile estimate
- Tuesday and Saturday workout schedule with home and gym versions
- Visual movement cards for each workout step
- Daily checklist for meals, workout, walking, water, and sleep
- Weekly progress summary with dated calendar tiles
- Weekly grocery list grouped by Costco, Trader Joe's, and pantry / regular grocery
- Lipid lab tracker for total cholesterol, LDL, HDL, and triglycerides
- Browser local storage persistence, no backend

## Run locally

```bash
npm install
npm run dev
```

Open the local URL Vite prints, usually:

```text
http://127.0.0.1:5173
```

## Build

```bash
npm run build
```

## Publish updates to GitHub

After making changes locally:

```bash
git status
git add .
git commit -m "Update cholesterol coach app"
git push
```

If the site is connected to Vercel, each push to GitHub should redeploy automatically.

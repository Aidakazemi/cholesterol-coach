const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const mealTemplates = [
  {
    theme: 'Oat-forward reset',
    meals: [
      meal('Breakfast', 'Costco oatmeal berry bowl', 'Old-fashioned oats, blueberries, chia, nonfat Greek yogurt, cinnamon', 430, 29, 12, 1.2, 8),
      meal('Lunch', "Trader Joe's lentil veggie bowl", 'Steamed lentils, cruciferous crunch, brown rice, salsa verde, avocado', 520, 24, 17, 1.6, 0),
      meal('Dinner', 'Sheet-pan salmon plate', 'Salmon, sweet potato, broccoli, lemon, olive oil spray', 610, 42, 10, 3.2, 82),
      meal('Snack', 'Apple almond crunch', 'Apple, powdered peanut butter dip, 10 almonds', 220, 9, 7, 0.7, 0)
    ]
  },
  {
    theme: 'Mediterranean grocery day',
    meals: [
      meal('Breakfast', 'Egg-white veggie wrap', 'Egg whites, whole wheat tortilla, spinach, pico, fruit', 390, 31, 8, 1.1, 0),
      meal('Lunch', 'Costco chicken hummus box', 'Rotisserie chicken breast, hummus, cucumbers, tomatoes, mini naan', 560, 46, 11, 2.1, 78),
      meal('Dinner', "Trader Joe's turkey chili rice", 'Extra lean turkey chili, cauliflower rice, beans, side salad', 590, 48, 16, 3.5, 88),
      meal('Snack', 'Greek yogurt berries', 'Nonfat Greek yogurt, raspberries, ground flax', 210, 22, 8, 0.4, 8)
    ]
  },
  {
    theme: 'High-fiber comfort',
    meals: [
      meal('Breakfast', 'Overnight oats jar', 'Oats, soy milk, chia, strawberries, walnuts', 460, 22, 14, 1.8, 0),
      meal('Lunch', 'Black bean quinoa bowl', 'Quinoa, black beans, corn, cabbage, salsa, cilantro', 570, 25, 19, 1.4, 0),
      meal('Dinner', 'Cod taco salad', 'Baked cod, romaine, pinto beans, corn tortillas, avocado lime crema', 560, 44, 13, 2.4, 70),
      meal('Snack', 'Carrots and edamame', 'Baby carrots, shelled edamame, everything seasoning', 230, 17, 9, 0.5, 0)
    ]
  },
  {
    theme: 'Costco prep bowl',
    meals: [
      meal('Breakfast', 'Protein cereal bowl', 'High-fiber cereal, nonfat milk, banana, hemp hearts', 410, 28, 13, 1.5, 7),
      meal('Lunch', 'Turkey avocado sandwich', 'Whole grain bread, turkey breast, avocado, tomato, greens, mustard', 540, 42, 12, 2.2, 55),
      meal('Dinner', 'Tofu stir-fry noodles', 'High-protein tofu, frozen stir-fry vegetables, soba, low-sodium sauce', 610, 36, 11, 2.0, 0),
      meal('Snack', 'Pear cottage cup', 'Pear and low-fat cottage cheese with cinnamon', 230, 20, 5, 1.4, 18)
    ]
  },
  {
    theme: "Trader Joe's freezer assist",
    meals: [
      meal('Breakfast', 'Berry smoothie bowl', 'Frozen berries, spinach, soy milk, protein powder, oats', 450, 34, 12, 1.0, 0),
      meal('Lunch', 'Reduced-guilt veggie pizza plate', 'Vegetable flatbread portion, arugula salad, chickpeas', 560, 25, 13, 3.3, 18),
      meal('Dinner', 'Chicken shawarma plate', 'Chicken breast shawarma, brown rice, cucumber salad, tzatziki light', 620, 52, 9, 3.4, 92),
      meal('Snack', 'Orange pistachio snack', 'Orange, pistachios, herbal tea', 210, 7, 6, 0.9, 0)
    ]
  },
  {
    theme: 'Plant-powered Saturday',
    meals: [
      meal('Breakfast', 'Avocado bean toast', 'Sprouted toast, white beans, avocado, tomato, lemon', 440, 19, 15, 1.7, 0),
      meal('Lunch', 'Minestrone and salad', 'Vegetable minestrone, side salad, whole grain crackers', 520, 22, 18, 1.3, 0),
      meal('Dinner', 'Shrimp fajita bowl', 'Shrimp, peppers, onions, brown rice, black beans, salsa', 600, 47, 14, 2.1, 170),
      meal('Snack', 'Chia pudding cup', 'Chia, unsweetened almond milk, mango, pumpkin seeds', 260, 10, 11, 1.4, 0)
    ]
  },
  {
    theme: 'Simple Sunday prep',
    meals: [
      meal('Breakfast', 'Greek yogurt muesli', 'Nonfat yogurt, muesli, blueberries, flax, sliced almonds', 430, 31, 11, 1.2, 9),
      meal('Lunch', 'Tuna white bean salad', 'Water-packed tuna, white beans, greens, olive oil, lemon', 540, 46, 13, 2.0, 45),
      meal('Dinner', 'Turkey meatball pasta', 'Extra lean turkey meatballs, lentil pasta, marinara, zucchini', 650, 54, 15, 3.6, 96),
      meal('Snack', 'Popcorn and kiwi', 'Air-popped popcorn, kiwi, sparkling water', 190, 5, 7, 0.3, 0)
    ]
  },
  {
    theme: 'Lean protein basics',
    meals: [
      meal('Breakfast', 'Cinnamon apple oats', 'Oats, diced apple, skim milk, chia, cinnamon', 420, 24, 13, 1.1, 5),
      meal('Lunch', 'Chicken quinoa salad', 'Grilled chicken breast, quinoa, greens, berries, balsamic', 560, 49, 10, 2.0, 82),
      meal('Dinner', 'Bean and veggie enchiladas', 'Corn tortillas, pinto beans, vegetables, red sauce, light cheese', 610, 28, 18, 3.4, 18),
      meal('Snack', 'Protein latte and banana', 'Skim latte, banana, peanut powder', 230, 20, 5, 0.6, 6)
    ]
  },
  {
    theme: 'Fish and fiber',
    meals: [
      meal('Breakfast', 'Tofu scramble toast', 'Tofu, peppers, spinach, nutritional yeast, sprouted toast', 440, 30, 10, 1.5, 0),
      meal('Lunch', 'Farro chickpea bowl', 'Farro, chickpeas, cucumber, roasted peppers, herbs, lemon', 570, 24, 17, 1.5, 0),
      meal('Dinner', 'Trout potato dinner', 'Rainbow trout, roasted potatoes, green beans, dill yogurt sauce', 620, 45, 9, 3.0, 82),
      meal('Snack', 'Berries and walnuts', 'Mixed berries, 12 walnut halves, mint tea', 230, 5, 8, 1.2, 0)
    ]
  },
  {
    theme: 'No-fuss grocery cart',
    meals: [
      meal('Breakfast', 'Bagel thin breakfast stack', 'Whole grain bagel thin, egg whites, tomato, spinach, melon', 390, 29, 7, 0.9, 0),
      meal('Lunch', 'Lentil soup combo', 'Lentil soup, side greens, whole grain roll, apple', 540, 26, 20, 1.2, 0),
      meal('Dinner', 'Chicken pesto veggie pasta', 'Chicken breast, chickpea pasta, broccoli, basil pesto light', 650, 55, 12, 3.7, 88),
      meal('Snack', 'Hummus snap peas', 'Snap peas, hummus, grapes', 230, 8, 7, 0.6, 0)
    ]
  }
];

const workoutTemplates = [
  {
    home: ['5 min brisk warm-up march', '3 rounds: 12 chair squats, 10 incline pushups, 12 reverse lunges', '3 rounds: 30 sec plank, 12 hip bridges, 15 band rows', '8 min easy intervals: 40 sec fast walk, 80 sec easy', '5 min stretch'],
    gym: ['5 min treadmill warm-up', '3 rounds: leg press, chest press, seated row, 10-12 reps', '3 rounds: cable pull-through, step-ups, dead bug', '10 min bike intervals, moderate effort', '5 min stretch']
  },
  {
    home: ['6 min mobility and stairs', '4 rounds: 10 split squats, 12 countertop pushups, 12 backpack rows', '3 rounds: side plank, bird dog, calf raises', '8 min brisk walk finish', 'Cool down breathing'],
    gym: ['6 min elliptical', '3 rounds: goblet squat, lat pulldown, dumbbell bench, 10 reps', '3 rounds: hamstring curl, farmer carry, Pallof press', '8 min incline walk', 'Cool down stretch']
  },
  {
    home: ['5 min warm-up walk', 'Circuit: squat to chair, wall sit, band pull-apart, glute bridge', 'Repeat circuit 4 times at steady effort', 'Core: dead bug, heel taps, front plank', '5 min easy walk'],
    gym: ['5 min rower', 'Strength: hack squat, cable row, dumbbell shoulder press', 'Accessory: leg curl, cable chop, back extension', '10 min zone 2 cardio', 'Stretch hips and chest']
  },
  {
    home: ['5 min dynamic warm-up', 'EMOM 16: squats, pushups, lunges, band rows', 'Core: 3 rounds mountain climbers, side plank, bridge march', '7 min walk intervals', 'Stretch'],
    gym: ['5 min bike', 'Superset: leg press and chest-supported row', 'Superset: Romanian deadlift and incline press', 'Core: cable press and plank', '10 min treadmill walk']
  }
];

function meal(slot, name, items, calories, protein, fiber, saturatedFat, cholesterol) {
  return { slot, name, items, macros: { calories, protein, fiber, saturatedFat, cholesterol } };
}

function addTotals(meals) {
  return meals.reduce((totals, item) => {
    Object.entries(item.macros).forEach(([key, value]) => {
      totals[key] = Number(((totals[key] || 0) + value).toFixed(1));
    });
    return totals;
  }, {});
}

function tuneMeal(meal, day) {
  const fiberBoost = day % 5 === 0 ? 2 : 0;
  const proteinBoost = day % 4 === 0 ? 3 : 0;
  return {
    ...meal,
    macros: {
      ...meal.macros,
      calories: meal.macros.calories + (day % 3) * 10,
      protein: meal.macros.protein + proteinBoost,
      fiber: meal.macros.fiber + fiberBoost
    }
  };
}

export function buildPlan() {
  return Array.from({ length: 60 }, (_, index) => {
    const day = index + 1;
    const weekday = weekdays[index % weekdays.length];
    const base = mealTemplates[index % mealTemplates.length];
    const meals = base.meals.map((item) => tuneMeal(item, day));
    const totals = addTotals(meals);
    const workoutBase = workoutTemplates[Math.floor(index / 7) % workoutTemplates.length];
    const isWorkoutDay = weekday === 'Tuesday' || weekday === 'Saturday';
    const saturatedFatGrams = Number(((totals.calories * 0.08) / 9).toFixed(1));

    return {
      day,
      weekday,
      theme: base.theme,
      meals,
      totals,
      limits: { saturatedFatPercent: 8, saturatedFatGrams, cholesterolMg: 200 },
      workout: isWorkoutDay
        ? { isWorkoutDay, home: workoutBase.home, gym: workoutBase.gym }
        : { isWorkoutDay, note: 'Recovery day: 20-30 minutes of comfortable walking, light stretching, and a full water bottle nearby.' }
    };
  });
}


export const groceryList = [
  {
    store: "Trader Joe's",
    items: [
      'Steamed lentils',
      'Cruciferous crunch salad mix',
      'Frozen brown rice',
      'Salsa verde and pico de gallo',
      'High-protein tofu',
      'Frozen stir-fry vegetables',
      'Chicken shawarma breast',
      'Vegetable flatbread or veggie pizza',
      'Reduced-sodium soups',
      'Berries, apples, pears, kiwi, oranges'
    ]
  },
  {
    store: 'Costco',
    items: [
      'Old-fashioned oats',
      'Nonfat Greek yogurt',
      'Rotisserie chicken breast or grilled chicken strips',
      'Salmon, cod, trout, or shrimp',
      'Egg whites',
      'Hummus cups',
      'Quinoa and brown rice packs',
      'High-fiber cereal',
      'Frozen broccoli and green beans',
      'Lean turkey breast or extra lean ground turkey'
    ]
  },
  {
    store: 'Pantry and Easy Grocery',
    items: [
      'Beans: black, pinto, white, chickpeas',
      'Lentil or chickpea pasta',
      'Whole grain bread, tortillas, bagel thins, crackers',
      'Chia, flax, hemp hearts, pumpkin seeds',
      'Almonds, walnuts, pistachios',
      'Low-sodium marinara, taco sauce, balsamic, mustard',
      'Soy milk, skim milk, or unsweetened almond milk',
      'Sweet potatoes, potatoes, cabbage, spinach, romaine',
      'Frozen berries and smoothie greens',
      'Sparkling water, herbal tea, electrolyte packets without sugar'
    ]
  }
];

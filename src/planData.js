const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const mealTemplates = [
  day('Oats, beans, and salmon', [
    meal('Breakfast', 'Blueberry chia oats', 'Rolled oats cooked with milk, blueberries, chia, cinnamon, and a spoon of nonfat Greek yogurt.', 'Cook oats 5 minutes, stir in chia, top with berries and yogurt.', ['Costco oats', 'Costco berries', 'Pantry chia'], 430, 27, 13, 1.2, 8),
    meal('Lunch', 'Lentil cucumber bowl', 'Cooked lentils, brown rice, cucumber, tomatoes, herbs, lemon, and a small avocado portion.', 'Warm rice and lentils, chop vegetables, dress with lemon and pepper.', ['Trader Joe\'s lentils', 'Frozen brown rice', 'Home vegetables'], 535, 25, 18, 1.5, 0),
    meal('Dinner', 'Lemon salmon plate', 'Salmon fillet, roasted sweet potato, broccoli, lemon, garlic, and olive oil spray.', 'Roast sweet potato and broccoli, bake salmon for the last 12 minutes.', ['Costco salmon', 'Costco broccoli', 'Pantry spices'], 610, 43, 10, 3.1, 82),
    meal('Snack', 'Apple peanut yogurt dip', 'Apple slices with nonfat Greek yogurt mixed with powdered peanut butter.', 'Stir yogurt and peanut powder, slice apple.', ['Costco yogurt', 'Home fruit'], 215, 18, 6, 0.5, 7),
  ]),
  day('Mediterranean prep', [
    meal('Breakfast', 'Egg-white spinach wrap', 'Egg whites, spinach, tomato, salsa, and whole wheat tortilla with fruit.', 'Scramble egg whites and spinach, wrap with salsa, serve fruit.', ['Costco egg whites', "Trader Joe\'s tortillas", 'Home fruit'], 390, 31, 8, 1.1, 0),
    meal('Lunch', 'Chicken hummus salad', 'Cooked chicken breast, hummus, romaine, cucumber, tomato, chickpeas, and pita wedges.', 'Slice chicken and vegetables, plate with hummus and chickpeas.', ['Costco chicken breast', 'Costco hummus', 'Home vegetables'], 555, 48, 12, 2.0, 78),
    meal('Dinner', 'Turkey bean skillet', 'Extra lean turkey, black beans, bell pepper, onion, tomatoes, brown rice, and spices.', 'Brown turkey, add vegetables and beans, serve over rice.', ['Costco turkey', "Trader Joe\'s rice", 'Pantry beans'], 600, 50, 16, 3.4, 88),
    meal('Snack', 'Raspberry flax yogurt', 'Nonfat Greek yogurt, raspberries, and ground flax.', 'Layer ingredients in a bowl.', ['Costco yogurt', 'Costco berries', 'Pantry flax'], 215, 22, 8, 0.4, 8),
  ]),
  day('Plant-forward comfort', [
    meal('Breakfast', 'Overnight oat jar', 'Oats, soy milk, chia, strawberries, and a small walnut topping.', 'Mix the night before, refrigerate, top with walnuts.', ['Costco oats', "Trader Joe\'s soy milk", 'Pantry walnuts'], 455, 22, 14, 1.8, 0),
    meal('Lunch', 'Black bean quinoa bowl', 'Quinoa, black beans, corn, cabbage, salsa, cilantro, and lime.', 'Batch-cook quinoa, warm beans and corn, add crunchy cabbage.', ['Costco quinoa', 'Pantry beans', 'Home cabbage'], 570, 25, 19, 1.4, 0),
    meal('Dinner', 'Cod taco salad', 'Baked cod, romaine, pinto beans, corn tortillas, pico, and avocado lime sauce.', 'Bake cod with chili powder, crisp tortilla strips, assemble salad.', ['Costco cod', 'Pantry beans', "Trader Joe\'s pico"], 560, 44, 13, 2.4, 70),
    meal('Snack', 'Edamame carrots', 'Shelled edamame, carrots, and everything seasoning.', 'Steam edamame and portion with carrots.', ["Trader Joe\'s edamame", 'Home carrots'], 230, 17, 9, 0.5, 0),
  ]),
  day('Fast home bowls', [
    meal('Breakfast', 'High-fiber cereal bowl', 'High-fiber cereal, skim milk, banana, and hemp hearts.', 'Pour and top. Keep hemp portion small for saturated fat control.', ['Costco cereal', 'Costco milk', 'Home banana'], 410, 28, 13, 1.5, 7),
    meal('Lunch', 'Turkey avocado sandwich', 'Whole grain bread, turkey breast, avocado, tomato, greens, and mustard.', 'Toast bread, layer turkey and vegetables, add mustard.', ['Costco turkey breast', 'Pantry bread', 'Home vegetables'], 540, 42, 12, 2.2, 55),
    meal('Dinner', 'Tofu vegetable soba', 'High-protein tofu, frozen stir-fry vegetables, soba noodles, ginger, garlic, and low-sodium sauce.', 'Sear tofu, add vegetables, toss with cooked soba and sauce.', ["Trader Joe\'s tofu", "Trader Joe\'s vegetables", 'Pantry soba'], 610, 36, 11, 2.0, 0),
    meal('Snack', 'Pear cottage bowl', 'Pear with low-fat cottage cheese and cinnamon.', 'Slice pear and spoon cottage cheese on top.', ['Costco cottage cheese', 'Home pear'], 230, 20, 5, 1.4, 18),
  ]),
  day('Freezer assist, still homemade', [
    meal('Breakfast', 'Berry spinach smoothie', 'Frozen berries, spinach, soy milk, protein powder, and oats.', 'Blend until smooth, add water for texture.', ['Costco berries', "Trader Joe\'s spinach", 'Pantry oats'], 450, 34, 12, 1.0, 0),
    meal('Lunch', 'Chickpea veggie pita', 'Chickpeas, chopped cucumber, tomato, greens, tahini lemon drizzle, and whole wheat pita.', 'Mash half the chickpeas, mix with vegetables, fill pita.', ['Pantry chickpeas', "Trader Joe\'s pita", 'Home vegetables'], 540, 24, 14, 1.6, 0),
    meal('Dinner', 'Chicken shawarma rice bowl', 'Home-seasoned chicken breast, brown rice, cucumber salad, and light yogurt sauce.', 'Season chicken with cumin, garlic, lemon, and paprika, cook in skillet.', ['Costco chicken breast', "Trader Joe\'s rice", 'Costco yogurt'], 620, 52, 9, 3.2, 92),
    meal('Snack', 'Orange pistachios', 'Orange with a small pistachio portion.', 'Peel orange and portion nuts.', ['Home citrus', 'Costco pistachios'], 210, 7, 6, 0.9, 0),
  ]),
  day('Saturday strength fuel', [
    meal('Breakfast', 'Avocado white bean toast', 'Sprouted toast topped with mashed white beans, avocado, tomato, and lemon.', 'Mash beans and avocado together, spread on toast.', ["Trader Joe\'s bread", 'Pantry beans', 'Home tomato'], 440, 19, 15, 1.7, 0),
    meal('Lunch', 'Vegetable minestrone', 'Beans, vegetables, tomatoes, broth, whole grain pasta, and side greens.', 'Simmer vegetables and beans, add small pasta portion near the end.', ['Pantry beans', 'Costco vegetables', 'Home greens'], 520, 22, 18, 1.3, 0),
    meal('Dinner', 'Shrimp fajita bowl', 'Shrimp, peppers, onions, brown rice, black beans, salsa, and lime.', 'Saute peppers and shrimp, serve over rice and beans.', ['Costco shrimp', "Trader Joe\'s peppers", 'Pantry beans'], 600, 47, 14, 2.1, 170),
    meal('Snack', 'Mango chia pudding', 'Chia, unsweetened almond milk, mango, and pumpkin seeds.', 'Mix chia and milk ahead, top with mango.', ['Pantry chia', "Trader Joe\'s mango", 'Pantry seeds'], 260, 10, 11, 1.4, 0),
  ]),
  day('Sunday batch cook', [
    meal('Breakfast', 'Greek yogurt muesli', 'Nonfat yogurt, muesli, blueberries, flax, and sliced almonds.', 'Stir together and let sit 5 minutes.', ['Costco yogurt', 'Costco berries', 'Pantry muesli'], 430, 31, 11, 1.2, 9),
    meal('Lunch', 'Tuna white bean salad', 'Water-packed tuna, white beans, greens, celery, olive oil, and lemon.', 'Flake tuna, toss with beans and greens.', ['Costco tuna', 'Pantry beans', 'Home greens'], 540, 46, 13, 2.0, 45),
    meal('Dinner', 'Turkey lentil pasta', 'Extra lean turkey, lentil pasta, marinara, zucchini, and herbs.', 'Cook turkey and zucchini, add marinara, serve with lentil pasta.', ['Costco turkey', 'Pantry pasta', 'Home zucchini'], 650, 54, 15, 3.6, 96),
    meal('Snack', 'Popcorn kiwi', 'Air-popped popcorn and kiwi.', 'Pop kernels or use plain low-fat popcorn.', ['Pantry popcorn', 'Home kiwi'], 190, 5, 7, 0.3, 0),
  ]),
  day('Lean basics', [
    meal('Breakfast', 'Apple cinnamon oats', 'Oats, diced apple, skim milk, chia, and cinnamon.', 'Cook together until creamy.', ['Costco oats', 'Home apple', 'Pantry chia'], 420, 24, 13, 1.1, 5),
    meal('Lunch', 'Chicken quinoa berry salad', 'Grilled chicken breast, quinoa, greens, berries, cucumber, and balsamic.', 'Use batch-cooked chicken and quinoa, toss cold.', ['Costco chicken', 'Costco quinoa', 'Costco berries'], 560, 49, 10, 2.0, 82),
    meal('Dinner', 'Bean vegetable enchiladas', 'Corn tortillas, pinto beans, zucchini, peppers, red sauce, and light cheese.', 'Fill tortillas with beans and vegetables, bake with sauce.', ['Pantry beans', "Trader Joe\'s tortillas", 'Home vegetables'], 610, 28, 18, 3.4, 18),
    meal('Snack', 'Protein banana latte', 'Skim latte, banana, and powdered peanut butter.', 'Blend or stir peanut powder into latte, eat banana.', ['Costco milk', 'Home banana', 'Pantry peanut powder'], 230, 20, 5, 0.6, 6),
  ]),
  day('Fish and fiber', [
    meal('Breakfast', 'Tofu scramble toast', 'Tofu, peppers, spinach, nutritional yeast, and sprouted toast.', 'Crumble tofu, saute with vegetables, serve on toast.', ["Trader Joe\'s tofu", 'Home spinach', 'Pantry toast'], 440, 30, 10, 1.5, 0),
    meal('Lunch', 'Farro chickpea bowl', 'Farro, chickpeas, cucumber, roasted peppers, herbs, and lemon.', 'Cook farro, toss with chickpeas and chopped vegetables.', ['Pantry farro', 'Pantry chickpeas', "Trader Joe\'s peppers"], 570, 24, 17, 1.5, 0),
    meal('Dinner', 'Trout potato dinner', 'Trout, roasted potatoes, green beans, dill yogurt sauce.', 'Roast potatoes, bake trout, steam beans.', ['Costco trout', 'Costco green beans', 'Costco yogurt'], 620, 45, 9, 3.0, 82),
    meal('Snack', 'Berries walnuts', 'Mixed berries and a small walnut portion.', 'Portion nuts carefully, add berries.', ['Costco berries', 'Pantry walnuts'], 230, 5, 8, 1.2, 0),
  ]),
  day('No-fuss grocery night', [
    meal('Breakfast', 'Bagel thin egg-white stack', 'Whole grain bagel thin, egg whites, tomato, spinach, and melon.', 'Cook egg whites, stack with vegetables.', ['Pantry bagel thin', 'Costco egg whites', 'Home melon'], 390, 29, 7, 0.9, 0),
    meal('Lunch', 'Lentil soup and greens', 'Homemade lentil soup, greens, whole grain roll, and apple.', 'Simmer lentils with carrots, celery, tomatoes, and broth.', ['Pantry lentils', 'Home vegetables', 'Home apple'], 540, 26, 20, 1.2, 0),
    meal('Dinner', 'Chicken broccoli chickpea pasta', 'Chicken breast, chickpea pasta, broccoli, basil, garlic, and lemon.', 'Cook pasta, saute chicken and broccoli, toss with lemon and basil.', ['Costco chicken', 'Pantry pasta', 'Costco broccoli'], 650, 55, 12, 3.7, 88),
    meal('Snack', 'Hummus snap peas', 'Snap peas, hummus, and grapes.', 'Rinse produce and portion hummus.', ['Costco hummus', "Trader Joe\'s snap peas", 'Home grapes'], 230, 8, 7, 0.6, 0),
  ]),
];

const workoutTemplates = [
  workout(
    [move('Warm-up walk', '5 min', 'Easy pace, loosen shoulders', 'walk'), move('Chair squat', '3 x 12', 'Sit back, stand tall', 'squat'), move('Incline pushup', '3 x 10', 'Hands on counter, body straight', 'push'), move('Band row', '3 x 12', 'Pull elbows to ribs', 'pull'), move('Plank', '3 x 30 sec', 'Brace gently, breathe', 'core')],
    [move('Treadmill warm-up', '5 min', 'Comfortable incline walk', 'walk'), move('Leg press', '3 x 10', 'Slow lower, smooth press', 'squat'), move('Chest press', '3 x 10', 'Wrists straight', 'push'), move('Seated row', '3 x 12', 'Squeeze shoulder blades', 'pull'), move('Bike intervals', '8 min', '40 sec brisk, 80 sec easy', 'walk')]
  ),
  workout(
    [move('Mobility', '6 min', 'Ankles, hips, upper back', 'core'), move('Split squat', '3 x 10/side', 'Use chair support if needed', 'lunge'), move('Backpack row', '3 x 12', 'Hinge and pull', 'pull'), move('Glute bridge', '3 x 15', 'Squeeze at the top', 'bridge'), move('Brisk walk', '8 min', 'Moderate effort', 'walk')],
    [move('Elliptical', '6 min', 'Smooth warm-up', 'walk'), move('Goblet squat', '3 x 10', 'Knees track toes', 'squat'), move('Lat pulldown', '3 x 10', 'Pull to upper chest', 'pull'), move('Dumbbell bench', '3 x 10', 'Control the lowering', 'push'), move('Farmer carry', '4 x 30 sec', 'Tall posture', 'core')]
  ),
  workout(
    [move('March warm-up', '5 min', 'Build gentle heat', 'walk'), move('Wall sit', '3 x 30 sec', 'Back flat to wall', 'squat'), move('Counter pushup', '3 x 12', 'Smooth reps', 'push'), move('Dead bug', '3 x 8/side', 'Low back stays quiet', 'core'), move('Stretch', '5 min', 'Hips, calves, chest', 'bridge')],
    [move('Rower', '5 min', 'Easy strokes', 'pull'), move('Hack squat', '3 x 10', 'Controlled depth', 'squat'), move('Cable row', '3 x 12', 'Chest proud', 'pull'), move('Shoulder press', '3 x 10', 'Ribs down', 'push'), move('Zone 2 cardio', '10 min', 'Can speak in phrases', 'walk')]
  ),
  workout(
    [move('Dynamic warm-up', '5 min', 'Arm circles, hip hinges', 'core'), move('Squat to chair', '4 x 10', 'Light touch to chair', 'squat'), move('Reverse lunge', '3 x 10/side', 'Short range is fine', 'lunge'), move('Side plank', '3 x 20 sec/side', 'Long line head to heel', 'core'), move('Walk intervals', '7 min', '1 min brisk, 1 min easy', 'walk')],
    [move('Bike', '5 min', 'Easy spin', 'walk'), move('Romanian deadlift', '3 x 10', 'Hips back, neutral spine', 'bridge'), move('Incline press', '3 x 10', 'Shoulders relaxed', 'push'), move('Cable chop', '3 x 10/side', 'Rotate through trunk', 'core'), move('Incline walk', '10 min', 'Steady effort', 'walk')]
  ),
];

const groceryWeeks = [
  groceries(['Rolled oats', 'Blueberries', 'Salmon fillets', 'Broccoli', 'Greek yogurt', 'Chicken breast'], ['Steamed lentils', 'Brown rice', 'Cucumbers', 'Tomatoes', 'Whole wheat tortillas'], ['Chia', 'Beans', 'Sweet potatoes', 'Apples', 'Lemons', 'Avocado']),
  groceries(['Egg whites', 'Turkey breast', 'Quinoa', 'Hummus', 'Frozen berries'], ['Tofu', 'Frozen stir-fry vegetables', 'Soba noodles', 'Pita', 'Mango'], ['Black beans', 'Chickpeas', 'Cabbage', 'Corn tortillas', 'Walnuts', 'Flax']),
  groceries(['Cod or trout', 'Shrimp', 'Green beans', 'Cottage cheese', 'Pistachios'], ['Edamame', 'Snap peas', 'Peppers', 'Pico de gallo', 'Sprouted bread'], ['Farro', 'Lentils', 'Popcorn', 'Pumpkin seeds', 'Brown rice', 'Kiwi']),
  groceries(['Chicken breast', 'Greek yogurt', 'High-fiber cereal', 'Skim milk', 'Broccoli'], ['Soy milk', 'Spinach', 'Frozen brown rice', 'Cucumbers', 'Pita'], ['Chickpea pasta', 'Marinara', 'Beans', 'Oats', 'Bananas', 'Balsamic']),
];

function day(theme, meals) { return { theme, meals }; }
function meal(slot, name, description, prep, sources, calories, protein, fiber, saturatedFat, cholesterol) {
  return { slot, name, description, prep, sources, macros: { calories, protein, fiber, saturatedFat, cholesterol } };
}
function move(name, dose, cue, type) { return { name, dose, cue, type }; }
function workout(home, gym) { return { home, gym }; }
function groceries(costco, traderJoes, pantry) {
  return { groups: [{ store: 'Costco', items: costco }, { store: "Trader Joe's", items: traderJoes }, { store: 'Pantry / regular grocery', items: pantry }] };
}

function addTotals(meals) {
  return meals.reduce((totals, item) => {
    Object.entries(item.macros).forEach(([key, value]) => { totals[key] = Number(((totals[key] || 0) + value).toFixed(1)); });
    return totals;
  }, {});
}

function scaleMeal(meal, factor) {
  return {
    ...meal,
    macros: {
      calories: Math.round(meal.macros.calories * factor),
      protein: Math.round(meal.macros.protein * Math.min(1.15, Math.max(0.9, factor))),
      fiber: Math.round(meal.macros.fiber * Math.min(1.1, Math.max(0.95, factor))),
      saturatedFat: Number((meal.macros.saturatedFat * factor).toFixed(1)),
      cholesterol: Math.round(meal.macros.cholesterol * Math.min(1.08, Math.max(0.92, factor))),
    },
  };
}

export function buildPlan({ calorieTarget = 1850 } = {}) {
  const factor = Math.min(1.22, Math.max(0.78, calorieTarget / 1850));
  return Array.from({ length: 60 }, (_, index) => {
    const dayNumber = index + 1;
    const weekday = weekdays[index % weekdays.length];
    const base = mealTemplates[index % mealTemplates.length];
    const meals = base.meals.map((item) => scaleMeal(item, factor));
    const totals = addTotals(meals);
    const workoutBase = workoutTemplates[Math.floor(index / 7) % workoutTemplates.length];
    const isWorkoutDay = weekday === 'Tuesday' || weekday === 'Saturday';
    const saturatedFatGrams = Number(((totals.calories * 0.08) / 9).toFixed(1));
    return {
      day: dayNumber,
      weekday,
      theme: base.theme,
      meals,
      totals,
      limits: { saturatedFatPercent: 8, saturatedFatGrams, cholesterolMg: 200 },
      workout: isWorkoutDay ? { isWorkoutDay, home: workoutBase.home, gym: workoutBase.gym } : { isWorkoutDay, note: 'Recovery day: walk 20-30 minutes, stretch 5 minutes, and keep hydration steady.' },
    };
  });
}

export function getWeeklyGroceryList(weekIndex) {
  return groceryWeeks[weekIndex % groceryWeeks.length];
}

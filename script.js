document.getElementById('fitness-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Capture user inputs
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const sex = document.getElementById('sex').value;
    const exerciseTime = parseInt(document.getElementById('exercise-time').value);
    const intensity = document.getElementById('intensity').value;
    const goal = document.getElementById('goal').value;

    // Calculate BMI
    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
    let category;
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obese";

    // Approximate time calculation
    let weeksRequired;
    if (goal === "burn") {
        weeksRequired = Math.ceil(bmi / (intensity === "high" ? 1.5 : intensity === "medium" ? 1 : 0.5));
    } else if (goal === "muscle") {
        weeksRequired = Math.ceil(16 / (intensity === "high" ? 1.5 : intensity === "medium" ? 1 : 0.5));
    } else {
        weeksRequired = 8; // Default for maintain weight
    }

    // Update UI with BMI and Time
    document.getElementById('bmi-value').textContent = bmi;
    document.getElementById('bmi-cat').textContent = category;
    document.getElementById('time-goal').textContent = `${weeksRequired} weeks`;

    // Recommendations
    const calories = goal === "burn" ? "2000 kcal" : goal === "muscle" ? "2500 kcal" : "2200 kcal";
    const steps = goal === "burn" ? "12,000 steps" : "10,000 steps";
    const water = `${Math.round(weight * 0.033)} L`;
    const exercise = `${exerciseTime} mins of ${intensity} intensity`;

    document.getElementById('calories').textContent = `Calories: ${calories}`;
    document.getElementById('steps').textContent = `Steps: ${steps}`;
    document.getElementById('water').textContent = `Water: ${water}`;
    document.getElementById('exercise').textContent = `Exercise: ${exercise}`;

    // Add to leaderboard
    const points = Math.round((weeksRequired * exerciseTime) / (intensity === "high" ? 1 : intensity === "medium" ? 1.5 : 2));
    const leaderboard = document.getElementById('leaderboard-body');
    const newRow = leaderboard.insertRow();
    newRow.innerHTML = `<td>${leaderboard.rows.length}</td><td>${name}</td><td>${points}</td>`;
});

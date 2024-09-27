document
  .getElementById("healthForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get the user input values
    const age = document.getElementById("age").value;
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const gender = document.getElementById("gender").value;
    const activity_level = document.getElementById("activity_level").value;
    const goal = document.getElementById("goal").value;

    // Validate inputs
    if (!age || !weight || !height || !gender || !activity_level || !goal) {
      alert("Please fill in all fields.");
      return;
    }

    // Show loading modal with spinning effect
    document.getElementById("loadingModal").classList.remove("hidden");

    // Dynamically build the API URL
    const apiUrl = `https://healthmate-habits-api2.p.rapidapi.com/recommend-habits?age=${age}&weight=${weight}&height=${height}&gender=${gender}&activity_level=${activity_level}&goal=${goal}`;

    // Fetch API data
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "8af7d824b3msh8950f09c4c86ecap1d9b12jsn47e8fd87911a",
          "x-rapidapi-host": "healthmate-habits-api2.p.rapidapi.com",
        },
      });

      const data = await response.json();

      // Display recommendations
      document.getElementById("exercise-recommendation").innerHTML = `
      <i class="fas fa-running text-teal-500"></i> Exercise: ${
        data.recommendations.exercise.routine
      }<br>
      Types: ${data.recommendations.exercise.types.join(", ")}<br>
      Message: ${data.recommendations.exercise.message}`;

      document.getElementById("nutrition-recommendation").innerHTML = `
      <i class="fas fa-utensils text-teal-500"></i> Nutrition: ${
        data.recommendations.nutrition.calories_per_day
      } calories/day<br>
      Proteins: ${
        data.recommendations.nutrition.macronutrients.proteins
      }, Carbs: ${data.recommendations.nutrition.macronutrients.carbs}, Fats: ${
        data.recommendations.nutrition.macronutrients.fats
      }<br>
      Meals: ${data.recommendations.nutrition.meal_suggestions.join("<br>")}<br>
      Message: ${data.recommendations.nutrition.message}`;

      document.getElementById("hydration-recommendation").innerHTML = `
      <i class="fas fa-glass-water text-teal-500"></i> Hydration: ${data.recommendations.hydration.liters_per_day} liters/day<br>
      Message: ${data.recommendations.hydration.message}`;

      document.getElementById("sleep-recommendation").innerHTML = `
      <i class="fas fa-bed text-teal-500"></i> Sleep: ${data.recommendations.sleep.hours_per_night} hours/night<br>
      Message: ${data.recommendations.sleep.message}`;

      document.getElementById("stress-recommendation").innerHTML = `
      <i class="fas fa-brain text-teal-500"></i> Stress Management Tips: ${data.recommendations.stress_management.tips.join(
        ", "
      )}`;

      document.getElementById("bmi-recommendation").innerHTML = `
      <i class="fas fa-weight text-teal-500"></i> BMI: ${data.recommendations.bmi.value} (${data.recommendations.bmi.category})<br>
      Message: ${data.recommendations.bmi.message}<br>
      Suggestion: ${data.recommendations.bmi.suggestion}`;

      // Hide the loading modal after data is fetched
      document.getElementById("loadingModal").classList.add("hidden");

      // Show the recommendations section
      document
        .getElementById("recommendations-section")
        .classList.remove("hidden");
    } catch (error) {
      console.error("Error fetching data:", error);
      document.getElementById("loadingModal").classList.add("hidden");
      alert("There was an error fetching the recommendations.");
    }
  });

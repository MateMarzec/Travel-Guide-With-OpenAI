//Meals Included Listener
const mealSelect = document.getElementById("meals");

mealSelect.addEventListener('change', (event) => {
    let mealValueContainer = mealSelect.value;
    if (mealValueContainer === "yes") {
        document.getElementById("dinnerType").style.display = "flex";
    } else {
        document.getElementById("dinnerType").style.display = "none";
    }
});

//Specific Budget Listener
const budgetSelect = document.getElementById("specificBudget");

budgetSelect.addEventListener('change', (event) => {
    let budgetValueContainer = budgetSelect.value;
    if (budgetValueContainer === "yes") {
        document.getElementById("dinnerBudget").style.display = "flex";
    } else {
        document.getElementById("dinnerBudget").style.display = "none";
    }
});

//Specific Activities Listener Listener
const activitiesSelect = document.getElementById("activities");

activitiesSelect.addEventListener('change', (event) => {
    let activitiesValueContainer = activitiesSelect.value;
    if (activitiesValueContainer === "yes") {
        document.getElementById("activitiesTypes").style.display = "flex";
    } else {
        document.getElementById("activitiesTypes").style.display = "none";
    }
});
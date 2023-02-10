//Meals Included Listener
document.getElementById("generate").addEventListener('click', (event) => {
    let city = document.getElementById("city").value;
    let days = document.getElementById("days").value;

    let meals;
    if(document.getElementById("meals").value === "yes"){
        let mealsNodeList = document.getElementById("dinnerType").querySelectorAll('input:checked');
        let mealsList = Array.prototype.slice.call(mealsNodeList).map(function(element) {
            return element.value;
        });

        const specificMeals = mealsList.toString();

        meals = `please include ${specificMeals} for each day,`
    } else {
        meals = ""
    }

    let budget;
    if(document.getElementById("specificBudget").value === "yes"){
        budget = "please consider the travel budget which is " + document.querySelector('input[name="budget"]:checked').value + ",";
    } else {
        budget = "";
    }

    if(document.getElementById("activities").value === "yes"){
        let activitiesNodeList = document.getElementById("activitiesTypes").querySelectorAll('input:checked');
        let activitiesList = Array.prototype.slice.call(activitiesNodeList).map(function(element) {
            return element.value;
        });

        let specificActivities = activitiesList.toString();

        activities = `please include following activities: ${specificActivities}`
    } else {
        activities = ""
    }

    let additional = "";
    if(meals !== "" || budget !== "" || activities !== ""){
        additional = `Additionally, ${meals} ${budget} ${activities}`
    }

    let prompt = `Could you please write a travel guide for ${city} for ${days}. ${additional}`;
    callApi(prompt);
});


function callApi(prompt){
    fetch('https://api.openai.com/v1/engines/text-curie-001/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
            prompt: `${prompt}`,
            max_tokens: 500,
        })
    })
    .then(res => res.json())
    .then(data => console.log(data.choices[0].text))
}
document.getElementById("plusDay").addEventListener('click', (event) => {
    dayCounter(true);
});
document.getElementById("minusDay").addEventListener('click', (event) => {
    dayCounter(false);
});

document.getElementById("generate").addEventListener('click', (event) => {
    validation();
});

function dayCounter(buttonValue) {
    if(buttonValue){
        let daysValue = document.getElementById("days").value;
        if(daysValue < 7){
            daysValue++;
            document.getElementById("days").value = daysValue;
        } else {
            daysError();
        }
    } else {
        let daysValue = document.getElementById("days").value;
        if(daysValue > 1){
            daysValue--;
            document.getElementById("days").value = daysValue;
        } else {
            daysError();
        }
    }
}

function daysError() {

}

function validation() {
    let city = document.getElementById("city").value;
    let days = document.getElementById("days").value;
    let meals;

    if (document.getElementById("meals").value === "yes") {
        let mealsNodeList = document.getElementById("dinnerType").querySelectorAll('input:checked');

        let mealsList = Array.prototype.slice.call(mealsNodeList).map(function (element) {
            return element.value;
        });

        const specificMeals = mealsList.toString();

        meals = `please include ${specificMeals} for each day,`
    } else {
        meals = ""
    }

    let budget;
    if (document.getElementById("specificBudget").value === "yes") {
        budget = "please consider the travel budget which is " + document.querySelector('input[name="budget"]:checked').value + ",";
    } else {
        budget = "";
    }

    if (document.getElementById("activities").value === "yes") {
        let activitiesNodeList = document.getElementById("activitiesTypes").querySelectorAll('input:checked');

        let activitiesList = Array.prototype.slice.call(activitiesNodeList).map(function (element) {
            return element.value;
        });

        let specificActivities = activitiesList.toString();

        activities = `please include following activities: ${specificActivities}`
    } else {
        activities = ""
    }

    let additional = "";
    if (meals !== "" || budget !== "" || activities !== "") {
        additional = `Additionally, ${meals} ${budget} ${activities}`
    }

    let prompt = `Could you please write a travel guide for ${city} for ${days}. ${additional}`;

    //callApi(prompt);
}

const target = document.getElementById("result");
function callApi(prompt) {
    try {
        fetch('https://api.openai.com/v1/engines/text-curie-001/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey + ''
            },
            body: JSON.stringify({
                prompt: `${prompt}`,
                max_tokens: 700,
            })
        })
        .then(res => res.json())
        .then(data => target.innerText = data.choices[0].text)
    } catch (error){
        console.log("Fetch Error");
    }
}
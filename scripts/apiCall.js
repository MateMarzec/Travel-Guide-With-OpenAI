document.getElementById("city").addEventListener('change', (event) => {
    if(!document.getElementById("city").value){
        document.getElementById("city").style.border= "1px solid #F42C04"
        document.getElementById("cityNote").style.color = "#F42C04"
    } else {
        document.getElementById("city").style.border = "1px solid #F2F2F1"
        document.getElementById("cityNote").style.color = "#333333"
    }
});
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
        document.getElementById("minusDay").classList.remove("disabled");
        let daysValue = document.getElementById("days").value;
        if(daysValue < 7){
            document.getElementById("daysNote").style.color = "#333333"
            daysValue++;
            document.getElementById("days").value = daysValue;
            if(daysValue === 7){
                document.getElementById("plusDay").classList.add("disabled");
            }
        } else {
            document.getElementById("daysNote").style.color = "#F42C04"
        }
    } else {
        document.getElementById("plusDay").classList.remove("disabled");
        let daysValue = document.getElementById("days").value;
        if(daysValue > 1){
            document.getElementById("daysNote").style.color = "#333333"
            daysValue--;
            document.getElementById("days").value = daysValue;
            if(daysValue === 1){
                document.getElementById("minusDay").classList.add("disabled");
            }
        } else {
            document.getElementById("daysNote").style.color = "#F42C04"
        }
    }
}


function validation() {
    if(!document.getElementById("city").value){
        document.getElementById("city").style.border= "1px solid #F42C04"
        document.getElementById("cityNote").style.color = "#F42C04"
    } else {
        promptBuild();
    }
}

function promptBuild() {
    let city = document.getElementById("city").value;
    let days = document.getElementById("days").value;

    let meals;
    if (document.getElementById("meals").value === "yes") {
        let mealsNodeList = document.getElementById("dinnerType").querySelectorAll('input:checked');

        let mealsList = Array.prototype.slice.call(mealsNodeList).map(function (element) {
            return element.value;
        });

        const specificMeals = mealsList.toString();

        meals = `could you consider ${specificMeals} for each day,`
    } else {
        meals = ""
    }

    let budget;
    if (document.getElementById("specificBudget").value === "yes") {
        budget = "consider travel budget which is " + document.querySelector('input[name="budget"]:checked').value + ",";
    } else {
        budget = "";
    }

    if (document.getElementById("activities").value === "yes") {
        let activitiesNodeList = document.getElementById("activitiesTypes").querySelectorAll('input:checked');

        let activitiesList = Array.prototype.slice.call(activitiesNodeList).map(function (element) {
            return element.value;
        });

        let specificActivities = activitiesList.toString();

        activities = `if possible include following activities: ${specificActivities}`
    } else {
        activities = ""
    }

    let additionally = "";
    if (meals !== "" || budget !== "" || activities !== "") {
        additionally = `Additionally, ${meals} ${budget} ${activities}`
    }

    let prompt = `Could you please write a travel guide in format where each day will be summarized within <p> tag and each location mentioned will be wrapped within <a> tag, with link provided and _blank attribute added. The Travel Guide should be for ${city}, for ${days} days. ${additionally}`;

    callApi(prompt);
}

const target = document.getElementById("result");
function callApi(prompt) {
    try {
        fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey + ''
            },
            body: JSON.stringify({
                prompt: `${prompt}`,
                max_tokens: 2000,
            })
        })
        .then(res => res.json())
        .then(data => target.innerHTML = data.choices[0].text)
    } catch (err){
        console.log("Fetch Error");
        prompt("Sorry, we're experiencing some technical difficulties. Our system is unable to go through your request, please try again later");
    }
}
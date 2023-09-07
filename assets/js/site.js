// serch mode to determine serch button clicked
let serchMode = "none";

// dom elements for function --------------------------------------------------------

const myResultElement = document.getElementById("myResult");

const myfirstLetterInput = document.getElementById("firstLetterInput");
const myfirstLetterSearchButton = document.getElementById("firstLetterSearch");

myfirstLetterSearchButton.addEventListener("click", () => {
  serchMode = "firstLetterSearch";
  console.info(myfirstLetterInput.value);
});

const myNameInput = document.getElementById("nameInput");
const myNameSearchButton = document.getElementById("nameSearch");

myNameSearchButton.addEventListener("click", () => {
  serchMode = "nameSearch";
  console.info(myNameInput.value);
  getRecipiesByName(myNameInput.value);
});

const myIdInput = document.getElementById("idInput");
const myIdSearchButton = document.getElementById("idSearch");

myIdSearchButton.addEventListener("click", () => {
  serchMode = "idSearch";
  console.info(myIdInput.value);
});

//-------------------------------------------------------------------------------------

// fetch functions --------------------------------------------------------------------
// your code goes here
async function fetchMealsByFirstLetter(letter) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);

    if (!response.ok) {
      throw new Error(`Network response was not ok (status: ${response.status})`);
    }

    const data = await response.json();

    if (data && data.meals) {
      return data;
    } else {
      throw new Error('No meals found for the provided letter');
    }
  } catch (error) {
    console.error('Fejl ved at hente data:', error);
    return { error: 'Der opstod en fejl ved hentning af data.' };
  }
}


async function getRecipiesByName(name) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fejl ved at hente data:', error);
    return { error: 'Der opstod en fejl ved hentning af data.' };
  }
}

async function fetchMealById(id) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fejl ved at hente data:', error);
    return { error: 'Der opstod en fejl ved hentning af data.' };
  }
}

// Opdater resultaterne, når søgeknappen klikkes
myfirstLetterSearchButton.addEventListener("click", async () => {
  serchMode = "firstLetterSearch";
  const letter = myfirstLetterInput.value;
  console.info(letter);

  const result = await fetchMealsByFirstLetter(letter);
  setupResultView(result);
});

myNameSearchButton.addEventListener("click", async () => {
  serchMode = "nameSearch";
  const name = myNameInput.value;
  console.info(name);

  const result = await getRecipiesByName(name);
  setupResultView(result);
});

myIdSearchButton.addEventListener("click", async () => {
  serchMode = "idSearch";
  const id = myIdInput.value;
  console.info(id);

  const result = await fetchMealById(id);
  setupResultView(result);
});







// view code --------------------------------------------------------------------------

function setupResultView(myData) {
  switch (serchMode) {
    case "firstLetterSearch":
      console.log(myData);

      // Clear previous results
      myResultElement.innerHTML = '';

      // Check if there are meals to display
      if (myData.meals && myData.meals.length > 0) {
        const mealList = document.createElement('ul');

        myData.meals.forEach((meal) => {
          const listItem = document.createElement('li');
          listItem.textContent = meal.strMeal;
          mealList.appendChild(listItem);
        });

        myResultElement.appendChild(mealList);
      } else {
        // Handle case when no meals are found
        myResultElement.textContent = 'No meals found for the first letter.';
      }
      break;
      break;

    case "nameSearch":
      console.log(myData.meals);

      // Clear previous results
      myResultElement.innerHTML = '';

      // Check if there are meals to display
      if (myData.meals && myData.meals.length > 0) {
        const mealList = document.createElement('ul');

        myData.meals.forEach((myMeal) => {
          const listItem = document.createElement('li');
          listItem.textContent = myMeal.strMeal;
          mealList.appendChild(listItem);
        });

        myResultElement.appendChild(mealList);
      } else {
        // Handle case when no meals are found
        myResultElement.textContent = 'No meals found with the provided name.';
      }
      break;

    case "idSearch":
      console.log(myData);

      // Clear previous results
      myResultElement.innerHTML = '';

      // Check if a meal is found
      if (myData.meals && myData.meals.length > 0) {
        const meal = myData.meals[0]; // Assuming only one meal is returned

        // Create a div to display the meal details
        const mealDetailsDiv = document.createElement('div');
        mealDetailsDiv.innerHTML = `
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p>Category: ${meal.strCategory}</p>
            <p>Area: ${meal.strArea}</p>
          `;

        myResultElement.appendChild(mealDetailsDiv);
      } else {
        // Handle case when no meal is found
        myResultElement.textContent = 'No meal found with the provided ID.';
      }
      break;

    case "errorMessage":
      console.log(myData);
      // do view stuff with the error msg here
      break;

    default:
      console.warn("ooops no data to show from setupResultView");
      break;
  }
}

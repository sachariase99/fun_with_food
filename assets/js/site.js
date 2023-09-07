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








// view code --------------------------------------------------------------------------

function setupResultView(myData) {
  switch (serchMode) {
    case "firstLetterSearch":
      console.log(myData);
      // do view stuff with the data here
      break;

    case "nameSearch":
      console.log(myData.meals);
      let myText = "";

      myData.meals.map((myMeal) => {
        myText += myMeal.strMeal + ", ";
      });

      myResultElement.textContent = myText;
      break;

    case "idSearch":
      console.log(myData);
      // do view stuff with the data here
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

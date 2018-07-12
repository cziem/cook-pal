import moment from "moment";
import { getFilters } from "./filters";
import { sortRecipes, getRecipes } from "./recipes";

// Generate DOM structure for the recipe
const generateRecipeDOM = ({ title, updatedAt }) => {
  // create the elements
  const recipeEl = document.createElement("a");
  const titleEl = document.createElement("p");
  const labelEl = document.createElement("label");
  const statusEl = document.createElement("p");
  const timestampEl = document.createElement("span");

  // add classes to them
  titleEl.classList.add("list-item__title");
  labelEl.classList.add("list-item__subtitle");
  timestampEl.classList.add("list-item__spaced");

  // setup the title of the recipe
  title.length > 0
    ? (titleEl.textContent = title)
    : (titleEl.textContent = "Unnamed recipe");

  // setup timestampEl textConten
  timestampEl.textContent = generateLastEdited(updatedAt);
  // statusEl.textContent = generateIngredientSummary(absentIngredients);

  // append elements in order
  labelEl.appendChild(statusEl);
  labelEl.appendChild(timestampEl);
  recipeEl.appendChild(titleEl);
  recipeEl.appendChild(labelEl);

  return recipeEl;
};

// renderRecipe
const renderRecipes = () => {
  const recipesEl = document.querySelector("#recipes");
  const filters = getFilters();
  const recipes = sortRecipes(filters.sortBy);
  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  // clear the div before adding new ones
  recipesEl.innerHTML = "";

  if (filteredRecipes.length > 0) {
    filteredRecipes.forEach(recipe => {
      const recipeEl = generateRecipeDOM(recipe);
      recipesEl.appendChild(recipeEl);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent =
      'You have no recipes yet. Click on "Add Recipes" to get started.';
    emptyMessage.classList.add("empty-message");
    recipesEl.appendChild(emptyMessage);
  }
};

// Generate lastEdited
const generateLastEdited = updatedAt =>
  `Last edited ${moment(updatedAt).fromNow()}`;

// initialize details edit page
const initEditPage = recipeId => {
  const titleEl = document.querySelector("#recipeTitle");
  const bodyEl = document.querySelector("#recipe_body");
  const dateEl = document.querySelector('#last_edited')

  const recipes = getRecipes()
  const recipe = recipes.find(recipe => recipe.id === recipedId)

  if (!recipe) location.assign('/index.html')

  // set the input elements
  titleEl.value = recipe.title
  bodyEl.value = recipe.body
  dateEl.textContent = generateLastEdited(recipe.updatedAt)
}

// Generate DOM structure for ingredients
const generateIngredientDOM = ingredient => {
  // do something
};


// Generate ingredient summary
// const generateIngredientSummary = absentIngredients => {
//   const ingredientLength = absentIngredients.length;
//   // if (ingredientLength > )
// };

export { generateRecipeDOM, generateLastEdited, renderRecipes, initEditPage };

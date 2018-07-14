import { removeRecipe, updateRecipe } from "./recipes";
import { initEditPage, generateLastEdited } from "./views";
import { renderIngredients } from "./ingredients";

const recipeId = location.hash.substring(1);
const titleEl = document.querySelector("#recipeTitle");
const bodyEl = document.querySelector("#recipe_body");
const removeEl = document.querySelector("#deleteRecipe");
const dateEl = document.querySelector("#last_edited");

renderIngredients();
initEditPage(recipeId);

titleEl.addEventListener("input", e => {
  const recipe = updateRecipe(recipeId, {
    title: e.target.value
  });
  dateEl.textContent = generateLastEdited(recipe.updatedAt);
});

bodyEl.addEventListener("input", e => {
  const recipe = updateRecipe(recipeId, {
    body: e.target.value
  });
  dateEl.textContent = generateLastEdited(recipe.updatedAt);
});

removeEl.addEventListener("click", () => {
  removeRecipe(recipeId);
  location.assign("/index.html");
});

// setup handler for adding ingredients
document.querySelector("#add_ingredient").addEventListener("submit", e => {
  e.preventDefault();
  const ingredient = e.target.elements.addIngredient.value.trim();

  if (ingredient.length > 0) {
    updateRecipe(recipeId, {
      ingredients : ingredient
    });
    dateEl.textContent = generateLastEdited(ingredient.updatedAt);
    renderIngredients();
    e.target.elements.addIngredient.value = "";
  }
});

window.addEventListener("storage", e => {
  if (e.key === "recipes") {
    initEditPage(recipeId);
    renderIngredients()
  }
});

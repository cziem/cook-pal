import { setFilters } from "./filters";
import { createRecipe } from "./recipes";
import { renderRecipes } from "./views";

renderRecipes();

// setup listener for the search input
document.querySelector("#search").addEventListener("input", e => {
  setFilters({ searchText: e.target.value });
  renderRecipes();
});

// setup listener for the sort input
document.querySelector("#filter_by").addEventListener("change", e => {
  setFilters({ sortBy: e.target.value });
  renderRecipes();
});

// setup listener for addRecipe
document.querySelector("#addRecipe").addEventListener("click", () => {
  const id = createRecipe();
  location.assign(`/details.html#${id}`);
});

// setup storage listener
window.addEventListener("storage", e => {
  if (e.key === "recipes") renderRecipes();
});

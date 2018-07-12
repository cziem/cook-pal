import { removeRecipe,  updateRecipe } from "./recipes";
import { initEditPage, generateIngredientSummary, generateLastEdited } from './views'

const recipeId = location.hash.substring(1);
const titleEl = document.querySelector("#recipeTitle");
const bodyEl = document.querySelector("#recipe_body");
const removeEl = document.querySelector("#deleteRecipe");
const dateEl = document.querySelector('#last_edited')

initEditPage(recipeId)

titleEl.addEventListener('input', e => {
  const recipe = updateRecipe(recipeId, {
    title: e.target.value
  })
  dateEl.textContent = generateLastEdited(recipe.updatedAt)
})

bodyEl.addEventListener('input', e => {
  const recipe = updateRecipe(recipeId, {
    body: e.target.value
  })
  dateEl.textContent = generateLastEdited(recipe.updatedAt)
})

removeEl.addEventListener('click', () => {
  removeRecipe(recipeId)
  location.assign('/index.html')
})

window.addEventListener('storage', e => {
  if (e.key === 'recipes') initEditPage(recipeId)
})
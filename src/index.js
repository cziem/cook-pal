import { setFilters, getFilters } from './filters'

console.log('COMING FROM INDEX.JS')

// setup listener for the search input
document.querySelector('#search').addEventListener('input', e => {
  setFilters({ searchText: e.target.value })
  // call renderRecipes
})

// setup listener for the sort input
document.querySelector('#filter_by').addEventListener('change', e => {
  setFilters({ sortBy: e.target.value })
  // call renderRecipes
})

// setup listener for addRecipe
document.querySelector('#addRecipe').addEventListener('click', () => {
  const id = createRecipe()
  location.assign(`/details.html#${id}`)
})
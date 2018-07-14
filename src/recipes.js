import uuidv4 from "uuid/v4"
import moment from "moment"

let recipes = []

// Read existing notes from localStorage
const loadRecipes = () => {
  const recipeJSON = localStorage.getItem("recipes")

  try {
    return recipeJSON ? JSON.parse(recipeJSON) : []
  } catch (e) {
    return []
  }
}

// Save recipes to localStorage
const saveRecipe = () => {
  localStorage.setItem("recipes", JSON.stringify(recipes))
}

// Expose recipes from module
const getRecipes = () => recipes

// create a new recipe
const createRecipe = () => {
  const id = uuidv4()
  const timestamp = moment().valueOf()

  recipes.push({
    id,
    title: "",
    body: "",
    createdAt: timestamp,
    updatedAt: timestamp,
    ingredients: [],
    hasIngredients: false
  })

  saveRecipe()
  return id
}

// Sort recipes
const sortRecipes = sortBy => {
  if (sortBy === "byEdited") {
    return recipes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1
      } else if (a.updatedAt < b.updatedAt) {
        return 1
      } else {
        return 0
      }
    })
  }
  if (sortBy === "byCreated") {
    return recipes.sort((a, b) => {
      if (a.byCreated > b.byCreated) {
        return -1
      } else if (a.byCreated < b.byCreated) {
        return 1
      } else {
        return 0
      }
    })
  }
  if (sortBy === "byAlphabet") {
    return recipes.sort((a, b) => {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return -1
      } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return 1
      } else {
        return 0
      }
    })
  } else {
    return recipes
  }
}

// update recipes
const updateRecipe = (id, { title, body, ingredients, hasIngredients }) => {
  const recipe = recipes.find(recipe => recipe.id === id)

  if (!recipe) return

  if (typeof title === "string") {
    recipe.title = title
    recipe.updatedAt = moment().valueOf()
  }

  if (typeof body === "string") {
    recipe.body = body
    recipe.updatedAt = moment().valueOf()
  }

  if (typeof ingredients === 'string') {
    recipe.ingredients.push(ingredients)
    recipe.updatedAt = moment().valueOf()
    console.log(recipes)
  }

  if (typeof hasIngredients === 'boolean') {
    // do something
  }

  saveRecipe()

  return recipe
}

// Remove a recipe
const removeRecipe = id => {
  const recipeIndex = recipes.findIndex(recipe => recipe.id === id)

  if (recipeIndex > -1) {
    recipes.splice(recipeIndex, 1)
    saveRecipe()
  }
}

recipes = loadRecipes()

export { getRecipes, createRecipe, sortRecipes, updateRecipe, removeRecipe, saveRecipe }

import uuidv4 from 'uuid/v4'

let ingredients = [];

// get saved ingredients
const loadIngredients = () => {
  const ingredientJSON = localStorage.getItem('ingredients')

  try {
    ingredients = ingredientJSON ? JSON.parse(ingredientJSON) : []
  } catch (e) {
    ingredients = []
  }
}

// save ingredient
const saveIngredient = () => {
  localStorage.setItem("ingredients", JSON.stringify(ingredients))
}

// expose the ingredient from the module
const getIngredient = () => ingredients

// create ingredient
const createIngredient = ingredient => {
  if (ingredient.length > 0) {
    ingredients.push({
      text: ingredient,
      hasIngredient: false,
      id: uuidv4()
    })

    saveIngredient()
  }
}

// renderIngredients
const renderIngredients = () => {
  const ingredientEl = document.querySelector('#ingredients')
  const ingredientItems = getIngredient()

  ingredientEl.innerHTML = ''

  // check for content in the ingredients array
  if (ingredients.length > 0) {
    ingredientItems.forEach(ingredientItem => {
      ingredientEl.appendChild(generateIngredientDOM(ingredientItem))
    })
  } else {
    const noIngredient = document.createElement('p')
    noIngredient.classList.add('empty-message')
    noIngredient.textContent = 'You have no ingredients'
    ingredientEl.appendChild(noIngredient)
  }
}

// Generate DOM structure for ingredients
const generateIngredientDOM = ingredient => {
  const labelEl = document.createElement('label')
  const containerEl = document.createElement('div')
  const checkbox = document.createElement('input')
  const textEl = document.createElement('span')
  const removeButton = document.createElement('button')

  // set class and attributes
  checkbox.setAttribute('type', 'checkbox')
  labelEl.classList.add('list-item')
  containerEl.classList.add('list-item__container')
  removeButton.classList.add('button', 'button--text')

  // setup contents and state
  textEl.textContent = ingredient.text
  removeButton.textContent = 'remove'
  checkbox.checked = ingredient.hasIngredient

  // couple the ingredient DOM
  containerEl.appendChild(checkbox)
  containerEl.appendChild(textEl)
  labelEl.appendChild(containerEl)
  labelEl.appendChild(removeButton)

  // setup listener & handlers
  checkbox.addEventListener('change', () => {
    toggleIngredient(ingredient.id)
    renderIngredients()
  })

  removeButton.addEventListener('click', () => {
    removeIngredient(ingredient.id)
    renderIngredients()
  })

  return labelEl
};



// Generate ingredient summary
// const generateIngredientSummary = absentIngredients => {
//   const ingredientLength = absentIngredients.length;
//   // if (ingredientLength > )
// };


export { createIngredient, loadIngredients, renderIngredients }
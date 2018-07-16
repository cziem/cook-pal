import { getRecipes, saveRecipe, updateRecipe } from "./recipes";

const recipeId = location.hash.substring(1);

// renderIngredients
const renderIngredients = () => {
  const ingredientEl = document.querySelector("#ingredients");
  const [ingredientObject] = getRecipes();
  const ingredientItems = ingredientObject.ingredients;

  ingredientEl.innerHTML = "";

  // check for content in the ingredients array
  if (ingredientItems.length === 0) {
    const noIngredient = document.createElement("p");
    noIngredient.classList.add("empty-message");
    noIngredient.textContent = "You have no ingredients";
    ingredientEl.appendChild(noIngredient);
  } else {
    ingredientItems.forEach(ingredientItem => {
      ingredientEl.appendChild(generateIngredientDOM(ingredientItem));
    });
  }
};

// // Generate DOM structure for ingredients
const generateIngredientDOM = ingredient => {
  const labelEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const checkbox = document.createElement("input");
  const textEl = document.createElement("span");
  const removeButton = document.createElement("button");

  // set class and attributes
  checkbox.setAttribute("type", "checkbox");
  labelEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  removeButton.classList.add("button", "button--text");

  // setup contents and state
  textEl.textContent = ingredient.ingredients;
  removeButton.textContent = "remove";
  checkbox.checked = ingredient.hasIngredients;

  // couple the ingredient DOM
  containerEl.appendChild(checkbox);
  containerEl.appendChild(textEl);
  labelEl.appendChild(containerEl);
  labelEl.appendChild(removeButton);

  // setup listener & handlers
  checkbox.addEventListener("change", () => {
    toggleIngredient(ingredient.ingredientId);
    // saveRecipe()
    renderIngredients();
  });

  removeButton.addEventListener("click", e => {
    const item = e.target.parentElement.children[0].textContent;
    removeIngredient(item);
    renderIngredients();
  });

  return labelEl;
};

// // setup removeIngredient
const removeIngredient = item => {
  const [ingredientObject] = getRecipes();
  const ingredientRecipe = ingredientObject.ingredients;

  const ingredientIndex = ingredientRecipe.findIndex(ingredient =>
    ingredient.ingredients.includes(item)
  );

  if (ingredientIndex > -1) {
    ingredientRecipe.splice(ingredientIndex, 1);
    saveRecipe();
  }
};

// // toggleIngredient
const toggleIngredient = id => {
  const [ingredientObject] = getRecipes();
  const ingredientRecipe = ingredientObject.ingredients;
  const ingredient = ingredientRecipe.find(
    ingredient => ingredient.ingredientId === id
  );

  if (ingredient) {
    ingredient.hasIngredients = !ingredient.hasIngredients;
    updateRecipe(recipeId, {
      hasIngredients: !ingredient.hasIngredients
    });
    saveRecipe();
  }
};

// // Generate ingredient summary
const generateIngredientSummary = () => {
  const [ingredientObject] = getRecipes();
  const ingredientRecipe = ingredientObject.ingredients;
  const totalLength = ingredientRecipe.length;
  const absentIngredients = ingredientRecipe.filter(
    ingredient => ingredient.hasIngredients
  );
  const absentIngredientsLength = absentIngredients.length;

  if (totalLength === absentIngredientsLength) {
    return "You have all the ingredients";
  } else if (absentIngredientsLength > 0) {
    return "You have some of the ingredients";
  } else if (absentIngredientsLength === 0) {
    return "You have none of the ingredients";
  }
};

export { renderIngredients, generateIngredientSummary };

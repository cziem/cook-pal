import uuidv4 from "uuid/v4";

let ingredients = [];

// get saved ingredients
const loadIngredients = () => {
  const ingredientJSON = localStorage.getItem("ingredients");

  try {
    return ingredientJSON ? JSON.parse(ingredientJSON) : [];
  } catch (e) {
    return [];
  }
};

// save ingredient
const saveIngredients = () => {
  localStorage.setItem("ingredients", JSON.stringify(ingredients));
};

// expose the ingredient from the module
const getIngredient = () => ingredients;

// create ingredient
const createIngredient = ingredient => {
  if (ingredient.length > 0) {
    ingredients.push({
      text: ingredient,
      hasIngredient: false,
      id: uuidv4()
    });

    saveIngredients();
  }
};

// renderIngredients
const renderIngredients = () => {
  const ingredientEl = document.querySelector("#ingredients");
  const ingredientItems = getIngredient();

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

// Generate DOM structure for ingredients
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
  textEl.textContent = ingredient.text;
  removeButton.textContent = "remove";
  checkbox.checked = ingredient.hasIngredient;

  // couple the ingredient DOM
  containerEl.appendChild(checkbox);
  containerEl.appendChild(textEl);
  labelEl.appendChild(containerEl);
  labelEl.appendChild(removeButton);

  // setup listener & handlers
  checkbox.addEventListener("change", () => {
    toggleIngredient(ingredient.id);
    renderIngredients();
  });

  removeButton.addEventListener("click", () => {
    removeIngredient(ingredient.id);
    renderIngredients();
  });

  return labelEl;
};

// setup removeIngredient
const removeIngredient = id => {
  const ingredientIndex = ingredients.findIndex(
    ingredient => ingredient.id === id
  );

  if (ingredientIndex > -1) {
    ingredients.splice(ingredientIndex, 1);
    saveIngredients();
  }
};

// toggleIngredient
const toggleIngredient = id => {
  const ingredient = ingredients.find(ingredient => ingredient.id === id);

  if (ingredient) {
    ingredient.hasIngredient = !ingredient.hasIngredient;
    saveIngredients();
  }
};

// Generate ingredient summary
const generateIngredientSummary = () => {
  const absentIngredients = ingredients.filter(
    ingredient => !ingredient.hasIngredient
  );
  const totalLength = ingredients.length;

  if (totalLength === absentIngredients) {
    return "You have all the ingredients";
  } else if (absentIngredients > 0) {
    return "You have some of the ingredients";
  } else if (absentIngredients === 0) {
    return "You have none of the ingredients";
  }
};

ingredients = loadIngredients();

export {
  createIngredient,
  loadIngredients,
  renderIngredients,
  generateIngredientSummary
};

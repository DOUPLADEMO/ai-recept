
let ingredients = [];

document.getElementById('add-ingredient-btn').addEventListener('click', () => {
  const input = document.getElementById('ingredient-input').value;
  if (input) {
    ingredients.push(input);
    updateIngredientList();
    document.getElementById('ingredient-input').value = '';
  }
});

function updateIngredientList() {
  const ingredientListDiv = document.getElementById('ingredient-list');
  ingredientListDiv.innerHTML = '';
  ingredients.forEach((ingredient, index) => {
    ingredientListDiv.innerHTML += `<span>${ingredient} <button onclick="removeIngredient(${index})">x</button></span><br>`;
  });
}

function removeIngredient(index) {
  ingredients.splice(index, 1);
  updateIngredientList();
}

document.getElementById('search-btn').addEventListener('click', () => {
  fetchRecipes(ingredients);
});

function fetchRecipes(ingredients) {
  fetch(`/recipes?ingredients=${ingredients.join(',')}`)
    .then(response => response.json())
    .then(data => {
      displayRecipes(data);
    })
    .catch(error => {
      console.error('Error fetching recipes:', error);
    });
}

function displayRecipes(recipes) {
  const resultsDiv = document.getElementById('recipe-results');
  resultsDiv.innerHTML = '';

  recipes.forEach(recipe => {
    resultsDiv.innerHTML += `
      <div>
        <h3>${recipe.title}</h3>
        <p>${recipe.description}</p>
        <a href="${recipe.url}" target="_blank">View Full Recipe</a>
      </div>
    `;
  });
}

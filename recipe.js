function renderRecipe(item) {
  console.log(item);
}

function fetchRecipeById(recipeId) {
  fetch('data.json')
    .then(response => response.json())
    .then(json => {
      // using the find array method, grab the right item
      // by using the item id
      const item = json.items.find(({ id }) => recipeId === id);
      renderRecipe(item);
    });
}
// using window.location, get the recipe id
const search = document.location.search.substring(1);
// https://www.w3schools.com/js/js_string_methods.asp
// substring cuts of the question mark and returns
// Ex substring 0  will return the ?
console.log(search);
const params = new URLSearchParams(search);
const recipeId = params.get('recipe');
console.log(recipeId);
fetchRecipeById(recipeId);

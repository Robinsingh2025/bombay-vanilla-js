const container = document.getElementById('container');
const step_Container = document.getElementById('steps-Container');
function renderRecipe(item) {
  //TODO Step number

  container.innerHTML = `<div class="wrapper card">
  <header>
    <h1 id="${item.id}" >${item.name}</h1>
  </header>
    ${(step_Container.innerHTML = item.steps.map(step => {
      const recipes = `<div class="step">
      <h2>Step Number ${step.number} </h2>
      <h4>${step.name}</h4>
    </div>
    <div class="ingredient">
      <h4>Ingredient</h4>
    </div>
    <div class="ingredient-list">
      <div>
        <ul>
          ${step.ingredients.map(ingredient => {
            return `<li><span>${ingredient.measurement} </span>${ingredient.ingredient}</li>`;
          })}
        </ul>
      </div>
    </div>
    <div class="instructions">
      <div class=""><h4>Instructions</h4></div>
      <p>
        ${step.instruction}
      </p>
    </div>
    <div>
      <div class="gallery">
        <h4>Image</h4>
        <img src="" alt="" />
      </div>
      <div class="video">
        <h4>Video</h4>
        <video width="320" height="240" controls>
          <source src="/video/" type="video/mp4" />
        </video>
      </div>
      <div class="tool">
        <h4>Tools</h4>
        <ul>
        <li>${step.tools}</li>
        </ul>
        <img src="" alt="" />
      </div>
    </div>
   `;
      return recipes;
    }))}
`;
  // destructure the item object
  // FIXME
  // Use each property of the item to fill in the recipe template
  // Use the name property to fill in the text of the <h1>
  // TODO: get the h1 element by its id and set the inner text to name
  // Hint: you decide what the id is going to be. Set that in recipe.html
  // FIXME
  // Render the steps into the steps container <div>
  // TODO: (in HTML) create a <div> in recipe.html to put the steps in
  // Hint: Create a div in recipe.html with a specific id for you to reference
  // You decide where the div will go and what id it will have
  // TODO: Use the steps property to fill out the rest of instructions
  // Hint: map over the steps array
  // for each step, destructure the steps
  // return a template literal string with allll the HTML of a step
  // this big string will represent your reusable step template
  // For arrays like ingredients and tools, use map again inside the template
  // Join the array returned from the map into one string using .join("")
  // For bonus points, chain the array methods of steps.map().join('');
  // FIXME
  // Get the containing div you made by the id you gave it
  // Set the inner HTML of that container div to your steps HTML template string
  // FIXME
}

// Fetch just one recipe item by its id
function fetchItem(id) {
  // TODO: Set the main header to say that it's "Loading..."
  // Get the h1 element by its id and set the inner text to something like "Loading..."
  // Hint: you decide what the id is going to be. Set that in recipe.html
  // FIXME
  // Get the specific item's json data by using the id in the fetch url
  // TODO: use the id variable instead of just this hardcoded butter_chicken id
  const url = 'data/butter_chicken.json'; // FIXME
  fetch(url)
    .then(response => response.json())
    .then(json => {
      // Once we have the data, grab just the item object by destructuring json
      // FIXME
      // Pass
      // the item object to the render function
      renderRecipe(item);
    });
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
if (recipeId) {
  fetchRecipeById(recipeId);
  fetchItem(recipeId);
} else {
  const error = `ERROR: No recipe id. id = ${recipeId}`;
  // TODO: Leave a message for the user on the page

  // FIXME: document.getElementById("heading").innerText = error;
  console.log(error);
}

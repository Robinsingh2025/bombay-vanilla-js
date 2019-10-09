const step_Container = document.getElementById('steps-Container');
const alert = document.getElementById('error-Alert');
const heading = document.getElementById('heading');

function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}

function renderRecipe(item) {
  // destructure the item object
  const { id, name, steps } = item;

  // Use each property of the item to fill in the recipe template
  // Use the name property to fill in the text of the <h1>
  // TODO: get the h1 element by its id and set the inner text to name
  // Hint: you decide what the id is going to be. Set that in recipe.html
  heading.innerText = name;

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
  const stepsHTML = steps
    .map(
      step => `
    <div class="step">
      <h2>Step Number ${step.number}</h2>
      <h3>${step.name}</h3>
      <h4>Ingredients</h4>
      <ul>
        ${step.ingredients
          .map(ingredient => {
            if (ingredient.id) {
              return `
                <li>
                  <a href="/recipe.html?recipe=${ingredient.id}">${ingredient.measurement} of ${ingredient.name}</a>
                </li>
              `;
            } else {
              return `
                <li>${ingredient.measurement} of ${ingredient.name}</li>
              `;
            }
          })
          .join('')}
      </ul>
      <h4>Instructions</h4>
      <p>
        ${step.instruction}
      </p>
      <div>
        <div class="gallery">
          <h4>Image</h4>
          ${step.images
            .map(
              image => `
            <img src="${image}" alt="" />
          `
            )
            .join('')}
        </div>
        <div class="video">
          <h4>Video</h4>
          ${step.videos
            .map(
              video => `
            <video width="320" height="240" controls>
              <source src="${video}" type="video/mp4" />
            </video>
          `
            )
            .join('')}
        </div>
        <div class="tool">
          <h4>Tools</h4>
          <ul>
            ${step.tools.map(tool => `<li>${tool}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `
    )
    .join('');
  // Get the containing div you made by the id you gave it
  // Set the inner HTML of that container div to your steps HTML template string
  step_Container.innerHTML = stepsHTML;
}

// Fetch just one recipe item by its id
function fetchItem(id) {
  // TODO: Set the main header to say that it's "Loading..."
  // Get the h1 element by its id and set the inner text to something like "Loading..."
  // Hint: you decide what the id is going to be. Set that in recipe.html
  heading.innerText = 'Loading...';
  // Get the specific item's json data by using the id in the fetch url
  const url = `data/${id}.json`;
  // TODO: Catch the 404 if the json isn't found
  fetch(url)
    .then(response => response.json())
    .then(json => {
      // Once we have the data, grab just the item object by destructuring json
      const { item } = json;
      // Pass the item object to the render function
      renderRecipe(item);
    })
    .catch(error => {
      console.log(error);
      heading.innerText = error;
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
  // fetchRecipeById(recipeId);
  fetchItem(recipeId);
} else {
  const error = `ERROR: No recipe id. id = ${recipeId}`;
  // TODO: Leave a message for the user on the page
  const div = createNode('div');
  div.innerHTML = error;
  append(document.body, div);

  console.log(alert);
  heading.innerText = error;
}

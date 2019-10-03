const recipeLinkList = document.getElementById('recipeLinks');

function renderRecipeLinks(items) {
  console.log(typeof items);
  // for each item
  items.forEach(item => {
    // So create li element and then have <a> inside the li
    const li = document.createElement('li');
    li.className = 'recipeListItem';
    //   add attribute of href -> linking to another page
    // inside the <a> will be the name of the item
    // const href = `recipe?recipe=${item.id}`;
    const href = `recipe.html?recipe=${item.id}`;
    li.innerHTML = `
      <a class="recipeLink" href="${href}">${item.name}</a>
    `;
    // append the <li> to the <ul> recipeLinkList
    recipeLinkList.appendChild(li);
  });
}

function fetchAllRecipes() {
  // fetch the JSON data from our "server" (mocked)
  fetch('/data/items.json')
    .then(response => response.json())
    .then(json => renderRecipeLinks(json.items)); // send the items array to renderRecipeLinks()
}
fetchAllRecipes();

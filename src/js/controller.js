import * as model from './models/recipeModel.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

async function controlRecipe() {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    bookmarksView.update(model.state.bookmarks);
    // Render loader on the view
    recipeView.renderLoader();
    // Update results
    resultsView.update(model.getSearchResultsPage());
    // Get the recipe
    const recipe = await model.loadRecipe(id);
    // Render recipe
    recipeView.render(recipe);
  } catch (err) {
    // Render error message when recipe does not found
    recipeView.renderError();
  }
}

async function controlSearch() {
  try {
    // 1) Get search param
    const searchKey = searchView.getQuery();

    if (!searchKey) return;

    // 2) Load recipe
    await model.searchRecipe(searchKey);

    // 3) Render
    const results = model.getSearchResultsPage();
    // 3.A) Clear search field only if there is some results
    if (results.length) searchView.clearInput();
    // 3.B) Render results
    resultsView.render(results);
    // 3.C) Render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    // Render error message when recipe does not found
    console.log(err);
  }
}

async function controlPagination(gotoPage) {
  try {
    //  Render
    const results = model.getSearchResultsPage(gotoPage);
    // Render results
    resultsView.render(results);
    // Render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
}

async function controlServings(newServings) {
  try {
    model.updateServings(newServings);
    // recipeView.render(model.state.recipe);
    recipeView.update(model.state.recipe);
  } catch (err) {
    console.log(err);
  }
}

async function controlAddBookmarks(recipe) {
  try {
    if (!recipe.bookmarked) model.addToBookmarks(recipe);
    else model.removeFromBookmarks(recipe.id);

    recipeView.update(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
  } catch (err) {
    console.log(err);
  }
}

async function controlBookmarks() {
  bookmarksView.render(model.state.bookmarks);
}

function init() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmarks);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerClick(controlPagination);
}

init();

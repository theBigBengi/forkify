import { API_URL } from '../config';
import { getJSON } from '../helpers';

export const state = {
  recipe: {},
  search: {
    results: [],
    page: 1,
    resultsPerPage: 10,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const { data } = await getJSON(`${API_URL}${id}`);

    const recipe = {
      cookingTime: data.recipe.cooking_time,
      id: data.recipe.id,
      imageUrl: data.recipe.image_url,
      ingredients: data.recipe.ingredients,
      publisher: data.recipe.publisher,
      servings: data.recipe.servings,
      sourceUrl: data.recipe.source_url,
      title: data.recipe.title,
    };

    if (state.bookmarks.some(bookmark => bookmark.id === recipe.id))
      recipe.bookmarked = true;
    else recipe.bookmarked = false;

    state.recipe = recipe;
    return recipe;
  } catch (err) {
    // Rethrow error to be handled in the view
    throw err;
  }
};

export const searchRecipe = async function (key) {
  try {
    const { data } = await getJSON(`${API_URL}?search=${key}`);

    const results = data.recipes.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      publiser: recipe.publiser,
      image: recipe.image_url,
    }));

    // Update the recipe inside the state
    state.search.results = results;
    return results;
  } catch (err) {
    // Rethrow error to be handled in the view
    throw err;
  }
};

export const getSearchResultsPage = function (gotoPage = state.search.page) {
  state.search.page = gotoPage;
  const start = (gotoPage - 1) * state.search.resultsPerPage;
  const end = gotoPage * state.search.resultsPerPage;

  const results = state.search.results.slice(start, end);

  return results;
};

export const updateServings = function (newServings) {
  if (newServings < 1) return;

  state.recipe.ingredients.forEach(
    ing => (ing.quantity = (newServings * ing.quantity) / state.recipe.servings)
  );
  state.recipe.servings = newServings;
};

const presistBookmarkes = function () {
  localStorage.setItem('bookmarkes', JSON.stringify(state.bookmarks));
};

export const addToBookmarks = function (recipe) {
  state.bookmarks.push(recipe);
  presistBookmarkes();
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const removeFromBookmarks = function (id) {
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};

const init = function () {
  const storage = localStorage.getItem('bookmarkes');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

const clearBookmarkes = function () {
  localStorage.clear('bookmarkes');
};
// clearBookmarkes();

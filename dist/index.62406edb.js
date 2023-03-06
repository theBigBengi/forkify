const recipeContainer = document.querySelector(".recipe");
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
async function getRecipe() {
    try {
        const response = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604691c37cdc054bd0c0");
        const { data  } = await response.json();
        const recipe = {
            cookingTime: data.recipe.cooking_time,
            id: data.recipe.id,
            imageUrl: data.recipe.image_url,
            ingredients: data.recipe.ingredients,
            publisher: data.recipe.publisher,
            servings: data.recipe.servings,
            sourceUrl: data.recipe.source_url,
            title: data.recipe.title
        };
        console.log(recipe);
    } catch (err) {
        alert(err.message);
    }
}
getRecipe();

//# sourceMappingURL=index.62406edb.js.map

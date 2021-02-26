import{
    SEARCH_RECIPES,
    SEARCH_RECIPES_BY_INGREDIENTS,
    SAVE_RECIPES,
    GET_RECIPES_DETAILS,
    SAVE_RECIPES_DETAILS
} from './constants';

export function searchRecipes(payload) {
    console.log('actions > searchRecipes');
    return { type: SEARCH_RECIPES, payload }
}

export function searchRecipesByIngredients(payload) {
    console.log('actions > searchRecipesByIngredients');
    return { type: SEARCH_RECIPES_BY_INGREDIENTS, payload }
}

export function saveRecipes(payload) {
    console.log('actions > saveRecipes');
    return { type: SAVE_RECIPES, payload }
}

export function getRecipeDetails(payload) {
    return { type: GET_RECIPES_DETAILS, payload }
}

export function setRecipeDetails(payload) {
    return { type: SAVE_RECIPES_DETAILS, payload }
}
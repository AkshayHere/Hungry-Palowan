import{
    SEARCH_RECIPES,
    SAVE_RECIPES,
    GET_RECIPES_DETAILS,
    SAVE_RECIPES_DETAILS,
    SET_SEARCH_TEXT,
    SET_SEARCH_OPTION,
    SET_INGREDIENTS,
    DELETE_INGREDIENTS
} from './constants';

export function setSearchText(payload) {
    console.log('actions > setSearchText');
    return { type: SET_SEARCH_TEXT, payload }
}

export function setSearchOption(payload) {
    console.log('actions > setSearchOption');
    return { type: SET_SEARCH_OPTION, payload }
}

export function setIngredients(payload) {
    console.log('actions > setIngredients');
    return { type: SET_INGREDIENTS, payload }
}

export function deleteIngredients(payload) {
    console.log('actions > deleteIngredients');
    return { type: DELETE_INGREDIENTS, payload }
}

export function searchRecipes(payload) {
    console.log('actions > searchRecipes');
    return { type: SEARCH_RECIPES, payload }
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
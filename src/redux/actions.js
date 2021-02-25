import{
    GET_RECIPES,
    GET_RECIPES_DETAILS,
    SAVE_RECIPES_DETAILS
} from './constants';

export function getRecipes(payload) {
    console.log('actions > getPosts');
    return { type: GET_RECIPES, payload }
}

export function getRecipeDetails(payload) {
    return { type: GET_RECIPES_DETAILS, payload }
}

export function setRecipeDetails(payload) {
    return { type: SAVE_RECIPES_DETAILS, payload }
}
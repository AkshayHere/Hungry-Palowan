import{
    SEARCH_RECIPES,
    SAVE_RECIPES,
    GET_RECIPES_DETAILS,
    SET_SEARCH_TEXT,
    SET_SEARCH_OPTION,
    SET_INGREDIENTS,
    DELETE_INGREDIENTS,
    RESET_RECIPES_DETAILS,
    SET_PAGE_NO,
    SET_TOTAL_PAGES,
    RESET_INGREDIENTS
} from './constants';

export function setSearchText(payload) {
    // console.log('actions > setSearchText');
    return { type: SET_SEARCH_TEXT, payload }
}

export function setSearchOption(payload) {
    // console.log('actions > setSearchOption');
    return { type: SET_SEARCH_OPTION, payload }
}

export function setIngredients(payload) {
    // console.log('actions > setIngredients');
    return { type: SET_INGREDIENTS, payload }
}

export function deleteIngredients(payload) {
    // console.log('actions > deleteIngredients');
    return { type: DELETE_INGREDIENTS, payload }
}

export function resetIngredients() {
    // console.log('actions > resetIngredients');
    return { type: RESET_INGREDIENTS }
}

export function searchRecipes(payload) {
    // console.log('actions > searchRecipes');
    return { type: SEARCH_RECIPES, payload }
}

export function saveRecipes(payload) {
    // console.log('actions > saveRecipes');
    return { type: SAVE_RECIPES, payload }
}

export function getRecipeDetails(payload) {
    return { type: GET_RECIPES_DETAILS, payload }
}

export function resetRecipeDetails() {
    return { type: RESET_RECIPES_DETAILS }
}

export function setPageNo(payload) {
    // console.log('actions > setPageNo');
    return { type: SET_PAGE_NO, payload }
}

export function setTotalPages(payload) {
    // console.log('actions > setTotalPages');
    return { type: SET_TOTAL_PAGES, payload }
}
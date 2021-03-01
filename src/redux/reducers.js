import * as ACTIONS from "./constants";
import { cloneDeep, mergeWith, assign, merge, sortBy, without } from 'lodash';

const initialState = {
    // UI Control Values
    searchText: '',
    searchOption: "",
    ingredients: [],

    recipes: [],
    pageNo: '',

    currentRecipe: {},

    // ui effects
    pageLoader: false,

    // for api errors
    errors: [],
};


export function reducer(state = initialState, action) {
    var newState = cloneDeep(state);

    switch (action.type) {
        // save api data
        case ACTIONS.API_SAVE_RESPONSE:
            newState.api = assign({}, newState.api, action.payload);
            return newState;

        // Save Current Recipe Details
        case ACTIONS.SAVE_RECIPES_DETAILS:
            newState.currentRecipe = assign({}, newState.currentRecipe, action.payload);
            return newState;

        // save api data
        case ACTIONS.SAVE_RECIPES:
            newState.recipes = action.payload;
            console.log('newState.recipes', newState.recipes);
            return newState;

        // Loader
        case ACTIONS.SHOW_LOADER:
            newState.pageLoader = true;
            return newState;

        case ACTIONS.HIDE_LOADER:
            newState.pageLoader = false;
            return newState;

        // save page no
        case ACTIONS.SET_PAGE_NO:
            newState.pageNo = action.payload;
            return newState;

        // save error response
        case ACTIONS.API_ERROR_RESPONSE:
            newState.errors = action.payload;
            return newState;

        // UI Controls
        case ACTIONS.SET_SEARCH_TEXT:
            newState.searchText = action.payload;
            return newState;
        
        case ACTIONS.SET_SEARCH_OPTION:
            newState.searchOption = action.payload;
            return newState;

        // Set Ingredients 
        case ACTIONS.SET_INGREDIENTS:
            newState.ingredients = [...newState.ingredients, action.payload];
            return newState;

        case ACTIONS.DELETE_INGREDIENTS:
            newState.ingredients = without(newState.ingredients, action.payload);
            return newState;

        case ACTIONS.SEARCH_RECIPES:
            return newState;

        default:
            return state;
    }

}


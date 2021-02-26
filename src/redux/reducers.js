import * as ACTIONS from "./constants";
import { cloneDeep, mergeWith, assign, merge, sortBy } from 'lodash';

const initialState = {
    //api effects result / response
    //all request=>responses will be dump into this area
    recipes: [],
    pageNo: '',

    currentRecipe: {},

    //common ui effects
    uiEffects: {
        pageLoader: false
    },

    // for api errors
    errors: {},
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
            var slugs = new Set(newState.recipes.map(d => d.slug));
            var merged = [...newState.recipes, ...action.payload.filter(d => !slugs.has(d.slug))];
            newState.recipes = merged;
            console.log('newState.posts', newState.posts);
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

        default:
            return state;
    }

}


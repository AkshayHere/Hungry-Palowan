import axios from "axios";
import {
	API_ERROR_RESPONSE
} from 'redux/constants';

const requests = {

  /**
   * Search Recipes by name  (page & limit included)
   * @param {*} name 
   * @param {*} page 
   * @param {*} limit 
   */
  searchRecipes(name, offset = 0, number = 10) {
    let url = process.env.REACT_APP_SPOONACULAR_URL + "recipes/complexSearch?" +
      "query=" + name +
      "&offset=" + offset +
      "&number=" + number +
      "&addRecipeNutrition=true" + // Set to get nutrient values
      "&apiKey=" + process.env.REACT_APP_SPOONACULAR_API_KEY;
    return axios.get(url, {
    })
      .then(response => {
        console.log(response.data);
        return response;
      })
      .catch(error => {
        let errorData = error.response.data;
        console.error('errorData',errorData);
        window.store.dispatch({ type: API_ERROR_RESPONSE, payload: errorData });
        throw error;
      });
  },

  /**
   * Search Recipes by Ingredients
   * @param {*} ingredients 
   * @param {*} number 
   */
  searchRecipesByIngredients(ingredients, number = 10, offset = 0) {
    // number = offset ? number*offset : number;
    let url = process.env.REACT_APP_SPOONACULAR_URL + "recipes/findByIngredients?" +
      "number=" + number+
      "&ingredients=" + ingredients.join(",")+
      "&apiKey=" + process.env.REACT_APP_SPOONACULAR_API_KEY;
    return axios.get(url, {
    })
      .then(response => {
        console.log(response.data);
        return response;
      })
      .catch(error => {
        let errorData = error.response.data;
        console.error('errorData',errorData);
        window.store.dispatch({ type: API_ERROR_RESPONSE, payload: errorData });
        throw error;
      });
  },

  /**
   * Get Recipes Info Bulk
   * @param {*} ids 
   * SAMPLE: https://api.spoonacular.com/recipes/informationBulk?ids=47950,70306&includeNutrition=true&apiKey={YOUR_API_KEY_HERE}
   */
  getRecipesInfo(ids) {
    let url = process.env.REACT_APP_SPOONACULAR_URL + "recipes/informationBulk?" +
      "ids=" + ids.join(",")+
      "&includeNutrition=true"+
      "&apiKey=" + process.env.REACT_APP_SPOONACULAR_API_KEY;
    return axios.get(url, {
    })
      .then(response => {
        console.log(response.data);
        return response;
      })
      .catch(error => {
        let errorData = error.response.data;
        console.error('errorData',errorData);
        window.store.dispatch({ type: API_ERROR_RESPONSE, payload: errorData });
        throw error;
      });
  },

  /**
   * Get Recipe Details by slug 
   * @param {*} slug 
   */
  getRecipeDetails(slug) {
    let url = process.env.REACT_SPOONACULAR_URL + "posts/" +slug;
    return axios.get(url, {
    })
      .then(response => {
        console.log(response.data);
        return response;
      })
      .catch(error => {
        let errorData = error.response.data;
        console.log('errorData',errorData);
        window.store.dispatch({ type: API_ERROR_RESPONSE, payload: errorData });
        throw error;
      });
  }

};

export default requests;
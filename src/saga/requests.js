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
        console.log('errorData',errorData);
        window.store.dispatch({ type: API_ERROR_RESPONSE, payload: errorData });
        throw error;
      });
  },

  /**
   * Search Recipes by Ingredients  (page & limit included)
   * @param {*} page 
   * @param {*} limit 
   */
  searchRecipesByIngredients(number = 10) {
    let url = process.env.REACT_APP_SPOONACULAR_URL + "recipes/findByIngredients?" +
      "&number=" + number+
      "&apiKey=" + process.env.REACT_APP_SPOONACULAR_API_KEY;
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
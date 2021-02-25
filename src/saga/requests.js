import axios from "axios";
import {
	API_ERROR_RESPONSE
} from 'redux/constants';

const requests = {

  /**
   * Get Recipes based on page & limit
   * @param {*} page 
   * @param {*} limit 
   */
  getRecipes(offset = 0, number = 10) {
    let url = process.env.REACT_SPOONACULAR_URL + "recipes/complexSearch?" +
      "offset=" + offset +
      "&number=" + number;
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
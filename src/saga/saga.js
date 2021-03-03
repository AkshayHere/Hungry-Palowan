import { push } from 'connected-react-router';
import { isEmpty } from 'lodash';
import { select, take, takeLatest, takeEvery, call, put, spawn, delay, all } from 'redux-saga/effects';

import {
	SEARCH_RECIPES,
	GET_RECIPES_DETAILS,
	SHOW_LOADER,
	HIDE_LOADER,
	SAVE_RECIPES,
	SET_PAGE_NO,
	SAVE_RECIPES_DETAILS,
	API_ERROR_RESPONSE,
	SET_TOTAL_PAGES
} from 'redux/constants';

import requests from './requests';

export function* searchRecipes() {
	yield takeLatest(SEARCH_RECIPES, function* fetchRecords(payload) {
		console.log('adasdasd', window.store.getState());
		let recipes = [];
		let currentState = window.store.getState().common;

		let searchOption = currentState.searchOption;
		console.log('searchOption', searchOption);

		let number = 5;
		let offset = 0;

		let { name, ingredients, pageNo } = payload.payload;
		console.log('name', name);
		console.log('ingredients', ingredients);
		console.log('pageNo', pageNo);

		offset = pageNo ? parseInt(pageNo*number, 10) : 0;
		console.log('offset', offset);

		try {
			window.store.dispatch({ type: SHOW_LOADER, payload: {} });

			switch (searchOption) {
				case "searchByName": {
					const response = yield call(requests.searchRecipes, name, offset, number);
					if ('data' in response && response.data) {
						recipes = response.data.results;
						// offset = response.data.offset;
						offset = Math.ceil(parseInt(response.data.offset / number, 10));
						let totalResults = Math.ceil(parseInt(response.data.totalResults / number, 10));

						window.store.dispatch({ type: HIDE_LOADER, payload: {} });

						console.log('recipes', recipes);

						// save posts
						yield put({ type: SAVE_RECIPES, payload: recipes });

						// save page no
						yield put({ type: SET_PAGE_NO, payload: offset });
						yield put({ type: SET_TOTAL_PAGES, payload: totalResults });
					}
					else {
						// window.store.dispatch(push('/error'));
						return;
					}

					break;
				}

				case "searchByIngredients": {
					const response = yield call(requests.searchRecipesByIngredients, ingredients, number);
					if ('data' in response && response.data) {
						// console.log("response.data", response.data);
						let items = response.data;
						console.log("items", items);
						let ids = items.map(a => a["id"]);
						console.log("ids", ids);

						const finalResponse = yield call(requests.getRecipesInfo, ids);
						if ('data' in finalResponse && finalResponse.data) {
							// console.log("finalResponse.data", finalResponse.data);
							recipes = finalResponse.data;
							console.log('recipes', recipes);

							window.store.dispatch({ type: HIDE_LOADER, payload: {} });

							// save posts
							yield put({ type: SAVE_RECIPES, payload: recipes });

							// save page no
							// yield put({ type: SET_PAGE_NO, payload: offset });
						}
					}
					else {
						// window.store.dispatch(push('/error'));
						return;
					}
					break;
				}

				default:
					window.store.dispatch(push('/error'));
					break;
			}
		} catch (error) {
			console.warn('error : ', error);
			yield put({ type: API_ERROR_RESPONSE, payload: error });
			// window.store.dispatch(push('/error'));
			return;
		}
	});
}

export function* getRecipeDetails() {
	yield takeLatest(GET_RECIPES_DETAILS, function* fetchRecords(payload) {
		let { id } = payload.payload;
		console.log('id', id);

		try {
			const response = yield call(requests.getRecipeDetails, id);
			if ('data' in response && response.data) {
				let currentRecipe = response.data;
				yield put({ type: SAVE_RECIPES_DETAILS, payload: currentRecipe });
			}
			else {
				window.store.dispatch(push('/error'));
				return;
			}
		} catch (error) {
			let errorData = error.response;
			console.log('errorData', errorData);
			window.store.dispatch({ type: API_ERROR_RESPONSE, payload: errorData });
			// window.store.dispatch(push('/error'));
			return;
		}
	});
}

export default function* rootSaga() {
	const sagas = [
		searchRecipes,
		getRecipeDetails
	];

	yield all(
		sagas.map((saga) =>
			spawn(function* () {
				while (true) {
					try {
						yield call(saga);
						break;
					} catch (e) {
						yield delay(1000);
					}
				}
			})
		)
	);
}
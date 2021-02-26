import { push } from 'connected-react-router';
import { isEmpty } from 'lodash';
import { select, take, takeLatest, takeEvery, call, put, spawn, delay, all } from 'redux-saga/effects';

import {
	SEARCH_RECIPES,
	SEARCH_RECIPES_BY_INGREDIENTS,
	GET_RECIPES_DETAILS,
	SHOW_LOADER,
	HIDE_LOADER,
	SAVE_RECIPES,
	SET_PAGE_NO,
	SAVE_RECIPES_DETAILS,
	API_ERROR_RESPONSE
} from 'redux/constants';

import requests from './requests';

export function* searchRecipes() {
	yield takeLatest(SEARCH_RECIPES, function* fetchRecords(payload) {
		let recipes = [];

		let { offset, number, name } = payload.payload;
		console.log('offset', offset);
		console.log('number', number);
		console.log('name', name);

		try {
			window.store.dispatch({ type: SHOW_LOADER, payload: {} });
			const response = yield call(requests.searchRecipes, name, offset, number);
			if ('data' in response && response.data) {
				recipes = response.data.results;
				offset = response.data.offset;

				window.store.dispatch({ type: HIDE_LOADER, payload: {} });

				console.log('recipes', recipes);

				// save posts
				yield put({ type: SAVE_RECIPES, payload: recipes });

				// save page no
				yield put({ type: SET_PAGE_NO, payload: offset });
			}
			else {
				window.store.dispatch(push('/error'));
				return;
			}
		} catch (error) {
			console.warn('error : ', error);
			yield put({ type: API_ERROR_RESPONSE, payload: error });
			// window.location.href = '/error';
			window.store.dispatch(push('/error'));
			return;
		}
	});
}

export function* searchRecipesByIngredients() {
	yield takeLatest(SEARCH_RECIPES_BY_INGREDIENTS, function* fetchRecords(payload) {
		let recipes = [];

		let { offset, number } = payload.payload;
		console.log('offset', offset);
		console.log('number', number);

		try {
			window.store.dispatch({ type: SHOW_LOADER, payload: {} });
			const response = yield call(requests.searchRecipesByIngredients, offset, number);
			if ('data' in response && response.data) {
				recipes = response.data.results;
				offset = response.data.offset;

				window.store.dispatch({ type: HIDE_LOADER, payload: {} });

				console.log('recipes', recipes);

				// save posts
				yield put({ type: SAVE_RECIPES, payload: recipes });

				// save page no
				yield put({ type: SET_PAGE_NO, payload: offset });
			}
			else {
				window.store.dispatch(push('/error'));
				return;
			}
		} catch (error) {
			console.warn('error : ', error);
			yield put({ type: API_ERROR_RESPONSE, payload: error });
			// window.location.href = '/error';
			window.store.dispatch(push('/error'));
			return;
		}
	});
}

export function* getRecipeDetails() {
	yield takeLatest(GET_RECIPES_DETAILS, function* fetchRecords(payload) {
		let currentPost = {};

		let { slug } = payload.payload;
		console.log('slug', slug);

		try {
			window.store.dispatch({ type: SHOW_LOADER, payload: {} });

			const response = yield call(requests.getPostDetails, slug);
			if ('data' in response && response.data) {
				window.store.dispatch({ type: HIDE_LOADER, payload: {} });
				currentPost = response.data.posts.shift();
				// save posts
				yield put({ type: SAVE_RECIPES_DETAILS, payload: currentPost });
			}
			else {
				// window.location.href = '/error';
				window.store.dispatch(push('/error'));
				return;
			}
		} catch (error) {
			let errorData = error.response;
			console.log('errorData', errorData);
			window.store.dispatch({ type: API_ERROR_RESPONSE, payload: errorData });
			// window.location.href = '/error';
			window.store.dispatch(push('/error'));
			return;
		}
	});
}

export default function* rootSaga() {
	const sagas = [
		searchRecipes,
		searchRecipesByIngredients,
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
						yield delay(1000); // Avoid infinite failures blocking app TODO use backoff retry policy...
					}
				}
			})
		)
	);
}
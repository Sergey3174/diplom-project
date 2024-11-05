import { ACTION_TYPE } from '../actions';

export const initialCategoriesState = {
	categories: [],
};

export const categoriesReducer = (state = initialCategoriesState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CATEGORIES_DATA:
			return {
				...state,
				categories: action.payload,
			};
		case ACTION_TYPE.ADD_NEW_CATEGORY:
			return {
				...state,
				categories: [...state.categories, action.payload],
			};
		default:
			return state;
	}
};

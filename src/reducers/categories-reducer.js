import { ACTION_TYPE } from '../actions';

export const initialCategoriesState = {
	categories: [],
};

export const categoriesReducer = (state = initialCategoriesState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CATEGORIES_DATA:
			return {
				...action.payload,
			};
		// case ACTION_TYPE.RESET_POST_DATA:
		// 	return initialPostState;
		default:
			return state;
	}
};

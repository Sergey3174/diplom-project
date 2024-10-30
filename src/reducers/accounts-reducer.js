import { ACTION_TYPE } from '../actions';

export const initialAccountsState = {
	accounts: [],
};

export const accountsReducer = (state = initialAccountsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_ACCOUNTS_DATA:
			return {
				...action.payload,
			};
		// case ACTION_TYPE.RESET_POST_DATA:
		// 	return initialPostState;
		default:
			return state;
	}
};

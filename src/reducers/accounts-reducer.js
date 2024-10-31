import { ACTION_TYPE } from '../actions';

export const initialAccountsState = {
	accounts: [],
	typeAccounts: [],
};

export const accountsReducer = (state = initialAccountsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_ACCOUNTS_DATA:
			return {
				...state,
				accounts: action.payload,
			};
		case ACTION_TYPE.SET_ACCOUNTS_TYPES:
			return {
				...state,
				typeAccounts: action.payload,
			};

		// case ACTION_TYPE.RESET_POST_DATA:
		// 	return initialPostState;
		default:
			return state;
	}
};

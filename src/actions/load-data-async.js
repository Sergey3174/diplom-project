import { setAccountsData } from './set-accounts-data';
import { setCategoriesData } from './set-categories-data';
import { setTypeAccounts } from './set-accounts-types';
import { ACTION_TYPE } from './action-type';

export const loadDataAsync = (requestServer, userId) => (dispatch) => {
	dispatch({ type: ACTION_TYPE.SET_LOADING });
	return requestServer('fetchData', userId)
		.then((data) => {
			if (data.res) {
				dispatch(setCategoriesData(data.res.categories));
				dispatch(setAccountsData(data.res.accounts));
				dispatch(setTypeAccounts(data.res.typeAccounts.typeAccounts));
				return {
					lastIncomeTransactions: data.res.lastIncomeTransactions,
					lastExpenseTransactions: data.res.lastExpenseTransactions,
				};
			}
			return data;
		})
		.finally(() => dispatch({ type: ACTION_TYPE.SET_LOADING }));
};

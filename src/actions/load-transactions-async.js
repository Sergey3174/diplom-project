import { setAccountsData } from './set-accounts-data';
import { setCategoriesData } from './set-categories-data';
import { setTransactionsData } from './set-transactions-data';
import { setTypeAccounts } from './set-accounts-types';

export const loadTransactionsAsync = (requestServer, userId) => (dispatch) =>
	requestServer('fetchTransactions', userId).then((data) => {
		if (data.res) {
			dispatch(setTransactionsData(data.res.transactions));
			dispatch(setCategoriesData(data.res.categories));
			dispatch(setAccountsData(data.res.accounts.accounts));
			dispatch(setTypeAccounts(data.res.typeAccounts.typeAccounts));
		}
		return data;
	});

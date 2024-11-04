import { setAccountsData } from './set-accounts-data';
import { setCategoriesData } from './set-categories-data';
import { setTypeAccounts } from './set-accounts-types';

export const loadDataAsync = (requestServer, userId) => (dispatch) =>
	requestServer('fetchData', userId).then((data) => {
		if (data.res) {
			dispatch(setCategoriesData(data.res.categories));
			dispatch(setAccountsData(data.res.accounts));
			dispatch(setTypeAccounts(data.res.typeAccounts.typeAccounts));
		}
		return data;
	});

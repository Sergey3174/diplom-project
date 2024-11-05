import { addNewAccount } from './add-new-account';

export const saveAccountAsync = (requestServer, newAccountData) => (dispatch) =>
	requestServer('saveAccount', newAccountData).then((data) => {
		if (data.res) {
			dispatch(addNewAccount(data.res));
		}
		return data;
	});

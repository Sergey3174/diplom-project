// import { addNewAccount } from './add-new-account';

import { updateAccount } from './update-account';
import { updateCategory } from './update-category';

export const saveTransactionAsync = (requestServer, newTransactionData) => (dispatch) =>
	requestServer('saveTransaction', newTransactionData).then((data) => {
		if (data.res) {
			dispatch(updateCategory(data.res.newCategory));
			dispatch(updateAccount(data.res.newAccount));
		}
		return data;
	});

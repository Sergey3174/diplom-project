// import { addNewAccount } from './add-new-account';

import { updateAccount } from './update-account';
import { updateCategory } from './update-category';

export const updateTransactionAsync = (requestServer, newTransactionData) => (dispatch) =>
	requestServer('saveTransaction', newTransactionData).then((data) => {
		if (data.res) {
			if (data.res.newCategory) {
				data.res.newCategory.forEach((cat) => dispatch(updateCategory(cat)));
			}
			if (data.res.newAccount) {
				data.res.newAccount.forEach((acc) => dispatch(updateAccount(acc)));
			}
		}
		return data;
	});

import { updateAccount } from './update-account';
import { updateCategory } from './update-category';

export const removeTransactionAsync = (requestServer, params) => (dispatch) => {
	return requestServer('removeTransactionServer', params).then((data) => {
		dispatch(updateCategory(data.res.newCategory));
		dispatch(updateAccount(data.res.newAccount));
	});
};

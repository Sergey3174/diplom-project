import { removeTransaction } from './remove-transaction';

export const removeTransactionAsync = (requestServer, id) => (dispatch) => {
	requestServer('removeTransactionServer', id).then(() => {
		dispatch(removeTransaction(id));
	});
};

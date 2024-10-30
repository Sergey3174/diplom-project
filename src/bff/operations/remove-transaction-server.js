import { deleteTransaction } from '../api';

export const removeTransactionServer = async (id) => {
	await deleteTransaction(id);
	return {
		error: null,
		res: true,
	};
};

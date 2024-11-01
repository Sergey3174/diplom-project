import { addTransaction, updateTransaction } from '../api';

export const saveTransaction = async (newTransactionData) => {
	newTransactionData.id === ''
		? await addTransaction(newTransactionData)
		: await updateTransaction(newTransactionData);
};

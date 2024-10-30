import { addTransaction } from '../api';

export const saveTransaction = async (newTransactionData) => {
	await addTransaction(newTransactionData);
};

import { getTransactions, getCategories, getAccounts } from '../api';

export const fetchTransactions = async (userId, page, limit, parametrs) => {
	// const [{ posts, last }, comments] = await Promise.all([
	// 	getPosts(searchPhrase, page, limit),
	// 	getComments(),
	// ]);

	const [categories, transactions, accounts] = await Promise.all([
		getCategories(userId),
		getTransactions(userId, page, limit, parametrs),
		getAccounts(userId),
	]);
	return {
		error: null,
		res: { transactions, categories, accounts },
	};
};

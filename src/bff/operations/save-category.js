import { addCategory, getTransactions, updateCategory, updateTransaction } from '../api';

export const saveCategory = async (newCategoryData) => {
	if (newCategoryData.id === '') {
		const newCategory = await addCategory(newCategoryData);
		return { res: newCategory };
	} else {
		const { transactions } = await getTransactions(newCategoryData.userId, 1, '', {
			category: newCategoryData.id,
		});

		for (const t of transactions) {
			console.log(t.id, { type: newCategoryData.type });
			await updateTransaction({ id: t.id, type: newCategoryData.type });
		}

		await updateCategory(newCategoryData);
	}
};

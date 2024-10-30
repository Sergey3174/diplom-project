export const transformTransactions = (dbTransactions) => ({
	id: dbTransactions.id,
	userId: dbTransactions.userId,
	accountId: dbTransactions.accountId,
	categoryId: dbTransactions.categoryId,
	amount: dbTransactions.amount,
	type: dbTransactions.type,
	description: dbTransactions.description,
	transactionDate: dbTransactions.transaction_date,
	createdAt: dbTransactions.created_at,
});

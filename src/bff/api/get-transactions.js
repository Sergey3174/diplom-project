import { transformTransactions } from '../transformers';
export const getTransactions = (userId, page, limit, parametrs, sort = 'desc') => {
	if (page) {
		return fetch(
			`http://localhost:3005/transactions?userId=${userId}${
				parametrs.type ? `&type=${parametrs.type}` : ''
			}${parametrs.account ? `&accountId=${parametrs.account}` : ''}${
				parametrs.category ? `&categoryId=${parametrs.category}` : ''
			}&_page=${page}&_limit=${limit}&_sort=transaction_date&_order=${sort}`,
		)
			.then(async (data) => {
				const totalCount = data.headers.get('X-Total-Count');

				const lastPage = Math.ceil(parseInt(totalCount) / limit);
				return { data: await data.json(), lastPage };
			})
			.then(({ data, lastPage }) => {
				return {
					transactions: data && data.map(transformTransactions),
					lastPage,
				};
			});
	} else {
		return fetch(`http://localhost:3005/transactions?userId=${userId}`)
			.then((data) => {
				return data.json();
			})
			.then((data) => {
				return {
					transactions: data && data.map(transformTransactions),
				};
			});
	}
};

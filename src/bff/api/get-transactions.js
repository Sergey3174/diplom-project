import { transformTransactions } from '../transformers';
export const getTransactions = (userId, page, limit, parametrs) => {
	if (page) {
		return fetch(
			`http://localhost:3005/transactions?userId=${userId}${
				parametrs.param1 ? `&type=${parametrs.param1}` : ''
			}${
				parametrs.param2 ? `&accountId=${parametrs.param2}` : ''
			}&_page=${page}&_limit=${limit}&_sort=transaction_date&_order=desc`,
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

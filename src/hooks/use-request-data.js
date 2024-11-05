import { useDispatch } from 'react-redux';
import { useServerRequest } from './use-server-request';
import { useEffect, useState } from 'react';
import { loadDataAsync } from '../actions';

export const useRequestData = (userId) => {
	const serverRequest = useServerRequest();
	const dispatch = useDispatch();

	const [lastIncomeTransactions, setLastIncomeTransactions] = useState([]);
	const [lastExpenseTransactions, setLastExpenseTransactions] = useState([]);

	useEffect(() => {
		dispatch(loadDataAsync(serverRequest, userId)).then((data) => {
			setLastIncomeTransactions(data.lastIncomeTransactions);
			setLastExpenseTransactions(data.lastExpenseTransactions);
		});
	}, [dispatch, serverRequest, userId]);

	return { lastIncomeTransactions, lastExpenseTransactions };
};

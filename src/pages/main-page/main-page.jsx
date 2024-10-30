import styled from 'styled-components';
import { Card } from './components';
import { useEffect } from 'react';
import { useServerRequest } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../selectors';
import { loadTransactionsAsync } from '../../actions';
import { Accounts, Categories, Transactions } from './components/card/components';

const MainPageContainer = ({ className }) => {
	const userId = useSelector(selectUserId);
	const serverRequest = useServerRequest();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadTransactionsAsync(serverRequest, userId));
	}, [dispatch, serverRequest, userId]);

	return (
		<div className={className}>
			<Card to="/add-transactions" content={<Transactions type="income" />}>
				Доходы
			</Card>
			<Card to="/add-transactions" content={<Transactions type="expense" />}>
				Расходы
			</Card>
			<Card to="/add-categories" content={<Categories />}>
				Категории
			</Card>
			<Card to="/add-account" content={<Accounts />}>
				Счета
			</Card>
		</div>
	);
};

export const MainPage = styled(MainPageContainer)`
	margin-top: 15px;
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	justify-content: center;
`;

import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectAccounts, selectFilter, selectUserId } from '../../selectors';
import { HistoryItem, Pagination, ControlPanel } from './components';
import { useServerRequest } from '../../hooks';
import { useEffect, useState } from 'react';

const HistoryPageContainer = ({ className }) => {
	const [transactions, setTransactions] = useState([]);
	const { accounts } = useSelector(selectAccounts);
	const { parametrs } = useSelector(selectFilter);

	const [refresh, setRefresh] = useState(false);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const limit = 10;
	const refreshFlag = () => setRefresh((prev) => !prev);

	const serverRequest = useServerRequest();

	const userId = useSelector(selectUserId);

	useEffect(() => {
		serverRequest('fetchTransactions', userId, page, limit, parametrs).then(
			({ res }) => {
				const { transactions, lastPage } = res.transactions;
				setLastPage(lastPage);
				setTransactions(transactions);
			},
		);
	}, [serverRequest, userId, page, refresh, parametrs]);

	return (
		<div className={className}>
			<div className="container-history-item">
				<div className="histoty-header">
					<h3>История</h3>
					<ControlPanel />
				</div>
				{transactions.length ? (
					transactions.map(
						({
							transactionDate,
							amount,
							description,
							accountId,
							id,
							type,
							categoryId,
						}) => (
							<HistoryItem
								key={id}
								amount={amount}
								transactionDate={transactionDate}
								description={description}
								account={accounts.find(
									({ id: accId }) => accId === accountId,
								)}
								accountId={accountId}
								categoryId={categoryId}
								type={type}
								id={id}
								refreshFlag={refreshFlag}
								userId={userId}
							/>
						),
					)
				) : (
					<span>Нет транзакций</span>
				)}
			</div>
			{lastPage > 1 && (
				<Pagination setPage={setPage} page={page} lastPage={lastPage} />
			)}
		</div>
	);
};

export const HistoryPage = styled(HistoryPageContainer)`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100vh;
	border-radius: 5px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

	& .histoty-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	& > h3 {
		margin: 10px;
	}

	& .container-history-item {
		flex-grow: 1;
		width: 70%;
		margin: 20px auto;
		border-radius: 5px;
	}
`;

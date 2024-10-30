import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectTransactions } from '../../../../../../selectors';

const TransactionsContainer = ({ className, type }) => {
	const { transactions } = useSelector(selectTransactions);
	return (
		<div className={className}>
			<div className="card-transactions">
				{transactions.some((obj) => obj.type === type) ? (
					transactions.map(
						({
							id,
							amount,
							description,
							type: transactionType,
							transactionDate,
						}) => {
							return type === transactionType ? (
								<div className="item-transaction" key={id}>
									<span>{transactionDate}</span>
									<span>{description}</span>
									<span>{amount}</span>
								</div>
							) : null;
						},
					)
				) : (
					<span>Нет операций</span>
				)}
			</div>
		</div>
	);
};

export const Transactions = styled(TransactionsContainer)`
	display: flex;
	gap: 10px;

	& .card-transactions {
		width: 100%;
		border: 1px solid #e0e0e0;
		padding: 5px;
		border-radius: 10px;
	}

	& .item-transaction {
		display: flex;
		justify-content: space-between;
	}
`;

import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectAccounts, selectTransactions } from '../../../../../../selectors';
import { calculateAmount } from '../../../../../../utils';

const AccountsContainer = ({ className }) => {
	const { accounts } = useSelector(selectAccounts);
	const { transactions } = useSelector(selectTransactions);

	return (
		<div className={className}>
			<div className="card-account">
				{accounts.map(({ id, name }) => {
					return (
						<div className="item-account" key={id}>
							<span>{name}</span>
							<span>{calculateAmount(transactions, id, 'account')}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export const Accounts = styled(AccountsContainer)`
	display: flex;

	& .card-account {
		width: 100%;
		border: 1px solid #e0e0e0;
		padding: 5px;
		border-radius: 10px;
	}

	& .item-account {
		display: flex;
		justify-content: space-between;
	}
`;

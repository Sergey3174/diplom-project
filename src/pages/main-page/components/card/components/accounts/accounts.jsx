import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectAccounts } from '../../../../../../selectors';
import { useNavigate } from 'react-router-dom';

const AccountsContainer = ({ className }) => {
	const { accounts } = useSelector(selectAccounts);
	const navigate = useNavigate();

	return (
		<div className={className}>
			{accounts.map(({ id, name, amount }) => {
				return (
					<div
						className="item-account"
						key={id}
						onClick={() => navigate(`/account/${id}`)}
					>
						<span>{name}</span>
						<span>{amount}</span>
					</div>
				);
			})}
		</div>
	);
};

export const Accounts = styled(AccountsContainer)`
	width: 100%;
	border: 1px solid #e0e0e0;
	border-radius: 10px;
	box-sizing: border-box;
	padding: 10px;

	& .item-account {
		display: flex;
		justify-content: space-between;
	}
`;

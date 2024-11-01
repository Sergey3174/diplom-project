import styled from 'styled-components';
import TRASH from '../../../../assets/trash.png';
import PENCIL from '../../../../assets/pencil.png';
import { useNavigate } from 'react-router-dom';
import { useServerRequest } from '../../../../hooks';
import { IconButton } from '../../../../components';

const HistoryItemContainer = ({
	className,
	transactionDate,
	amount,
	description,
	account: { name },
	id,
	type,
	refreshFlag,
}) => {
	const serverRequest = useServerRequest();
	const navigate = useNavigate();

	const deleteItem = () => {
		// dispatch(removeTransactionAsync(serverRequest, id));

		serverRequest('removeTransactionServer', id).then(() => refreshFlag());
	};
	return (
		<div className={className}>
			<div className="container">
				<div className="date">{transactionDate}</div>
				<div className="amount">{type === 'income' ? amount : -amount}</div>
				<div className="description">{description}</div>
				<div className="account">{name}</div>
			</div>
			<IconButton
				icon={PENCIL}
				onClick={() => navigate(`/transaction/${id}`)}
				width="30px"
				margin="0 0 0 10px"
			/>
			<IconButton
				onClick={deleteItem}
				icon={TRASH}
				width="30px"
				margin="0 0 0 10px"
			/>
		</div>
	);
};

export const HistoryItem = styled(HistoryItemContainer)`
	display: flex;
	align-items: center;
	margin-top: 10px;

	& .container {
		display: flex;
		align-items: center;
		width: 100%;
		height: 33px;
		border-radius: 5px;
		padding: 10px;
		overflow: hidden;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	& .date {
		width: 25%;
	}
	& .amount {
		width: 25%;
	}
	& .description {
		width: 25%;
	}
	& .account {
		width: 25%;
	}
`;

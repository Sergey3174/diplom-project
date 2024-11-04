import styled from 'styled-components';
import { Card } from './components';

import { useRequestData } from '../../hooks';

import { Accounts, Categories, Transactions } from './components/card/components';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../selectors';

const MainPageContainer = ({ className }) => {
	const userId = useSelector(selectUserId);

	useRequestData(userId);

	return (
		<div className={className}>
			<Card
				to="/transaction"
				content={<Transactions type="income" userId={userId} />}
			>
				Доходы
			</Card>
			<Card
				to="/transaction"
				content={<Transactions type="expense" userId={userId} />}
			>
				Расходы
			</Card>
			<Card to="/category" content={<Categories />}>
				Категории
			</Card>
			<Card to="/account" content={<Accounts />}>
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

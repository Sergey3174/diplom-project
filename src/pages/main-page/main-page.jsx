import styled from 'styled-components';
import { Card } from './components';
import { useRequestData, useRequestTransactions } from '../../hooks';
import { ContentContainer, ItemCard } from './components/card/components';
import { useSelector } from 'react-redux';
import { selectAccounts, selectCategories, selectUserId } from '../../selectors';

const MainPageContainer = ({ className }) => {
	const userId = useSelector(selectUserId);
	const { accounts } = useSelector(selectAccounts);
	const { categories } = useSelector(selectCategories);

	const { lastIncomeTransactions, lastExpenseTransactions } = useRequestData(userId);
	// const lastIncomeTransactions = useRequestTransactions('income');
	// const lastExpenseTransactions = useRequestTransactions('expense');

	return (
		<div className={className}>
			<Card to="/transaction" name="Доходы">
				<ContentContainer>
					{lastIncomeTransactions.map(
						({ id, description, transactionDate, amount, type }) => (
							<ItemCard
								to="/transaction"
								date={transactionDate}
								name={description}
								id={id}
								amount={amount}
								key={id}
								type={type}
							/>
						),
					)}
				</ContentContainer>
			</Card>
			<Card to="/transaction" name="Расходы">
				<ContentContainer>
					{lastExpenseTransactions.map(
						({ id, description, transactionDate, amount, type }) => (
							<ItemCard
								to="/transaction"
								date={transactionDate}
								name={description}
								id={id}
								amount={amount}
								key={id}
								type={type}
							/>
						),
					)}
				</ContentContainer>
			</Card>

			<Card to="/category" name="Категории">
				<ContentContainer name="Доходы">
					{categories
						.filter(({ type }) => type === 'income')
						.map(({ id, name, amount, type }) => (
							<ItemCard
								to="/category"
								name={name}
								id={id}
								amount={amount}
								key={id}
								type={type}
							/>
						))}
				</ContentContainer>
				<ContentContainer name="Расходы">
					{categories
						.filter(({ type }) => type === 'expense')
						.map(({ id, name, amount, type }) => (
							<ItemCard
								to="/category"
								name={name}
								id={id}
								amount={amount}
								key={id}
								type={type}
							/>
						))}
				</ContentContainer>
			</Card>

			<Card to="/account" name="Счета">
				<ContentContainer>
					{accounts.map(({ id, name, amount }) => (
						<ItemCard
							to="/account"
							name={name}
							id={id}
							amount={amount}
							key={id}
							type={amount >= 0 ? 'income' : 'expense'}
						/>
					))}
				</ContentContainer>
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

import { Pie, Bar, Line } from 'react-chartjs-2';
import {
	Chart,
	ArcElement,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	Filler,
	Legend,
} from 'chart.js';
import { useSelector } from 'react-redux';
import { selectAccounts, selectCategories, selectTransactions } from '../../selectors';
import styled from 'styled-components';
import { calculateAmount } from '../../utils';
import { Select } from '../../components';
import { useState } from 'react';

Chart.register(
	ArcElement,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	Filler,
	Legend,
);

export const AnaliticsContainer = ({ className }) => {
	const { transactions } = useSelector(selectTransactions);
	const { categories } = useSelector(selectCategories);
	const { accounts } = useSelector(selectAccounts);

	const [selectValues, setSelectValues] = useState({
		select1: 'income',
		select2: accounts[0].id,
	});

	const handleSelectChange = (name, value) => {
		setSelectValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const categoryData = categories
		.filter(({ type }) => type === selectValues.select1)
		.reduce(
			(acc, { name, id }) => ({
				...acc,
				[name]: calculateAmount(transactions, id, 'category'),
			}),
			{},
		);

	const accountData = accounts.reduce(
		(acc, { name, id }) => ({
			...acc,
			[name]: calculateAmount(transactions, id, 'account'),
		}),
		{},
	);

	const accountTransactionData = transactions
		.filter(({ accountId }) => accountId === selectValues.select2)
		.reduce(
			(acc, { transactionDate, amount, type }) => {
				const currentAmount = acc.currentAmount;
				const newAmount =
					type === 'income' ? currentAmount + amount : currentAmount - amount;

				acc.accTransactions.push({ transactionDate, balance: newAmount });
				acc.currentAmount = newAmount;

				return acc;
			},
			{ currentAmount: 0, accTransactions: [] },
		);

	const pieData = {
		labels: Object.keys(categoryData),
		datasets: [
			{
				data: Object.values(categoryData),
				backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
			},
		],
	};

	const barData = {
		labels: Object.keys(accountData),
		datasets: [
			{
				label: 'Сумма по счетам',
				data: Object.values(accountData),
				backgroundColor: '#36A2EB',
			},
		],
	};

	const lineData = {
		labels: accountTransactionData.accTransactions.map((t) => t.transactionDate),
		datasets: [
			{
				label: 'Сумма транзакций по времени',
				data: accountTransactionData.accTransactions.map((t) => t.balance),
				borderColor: '#36A2EB',
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				fill: true,
				tension: 0.4,
			},
		],
	};

	return (
		<div className={className}>
			<div className="chart">
				<div className="header-card">
					<h4>Счета</h4>
				</div>
				<Bar data={barData} />
			</div>

			<div className="chart">
				<div className="header-card">
					<h4>График изменения баланса счета</h4>
					<Select
						name="select2"
						data={accounts}
						value={selectValues.select2}
						onSelectChange={handleSelectChange}
						width="50%"
					/>
				</div>
				<Line data={lineData} />
			</div>

			<div className="chart">
				<div className="header-card">
					<h4>Категории</h4>
					<Select
						name="select1"
						data={[
							{ id: 'income', name: 'Доход' },
							{ id: 'expense', name: 'Расход' },
						]}
						value={selectValues.select1}
						onSelectChange={handleSelectChange}
						width="50%"
					/>
				</div>

				<Pie data={pieData} />
			</div>
		</div>
	);
};

export const Analitics = styled(AnaliticsContainer)`
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	gap: 10px;
	justify-content: center;
	margin: 10px 0;
	& .chart {
		border: 1px solid #e0e0e0;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		width: 40%;
		padding: 20px;
	}

	& .header-card {
		display: flex;
		justify-content: space-between;
	}
`;

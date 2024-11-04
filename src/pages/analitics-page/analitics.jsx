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
import { selectAccounts, selectCategories, selectUserId } from '../../selectors';
import styled from 'styled-components';
import { Select } from '../../components';
import { useEffect, useState } from 'react';
import { useRequestData, useSelectValues, useServerRequest } from '../../hooks';

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
	const userId = useSelector(selectUserId);
	const serverRequest = useServerRequest();

	useRequestData(userId);

	const { categories } = useSelector(selectCategories);
	const { accounts } = useSelector(selectAccounts);

	const [selectValues, handleSelectChange] = useSelectValues(2, {
		select1: 'income',
		select2: accounts[0]?.id || '',
	});

	const [accountTransactionData, setAccountTransactionData] = useState([]);

	useEffect(() => {
		serverRequest('fecthAccountBalance', userId, selectValues.select2).then((data) =>
			setAccountTransactionData(data.res.accTransactions),
		);
	}, [selectValues.select2, serverRequest, userId]);

	const categoryData = categories.filter(({ type }) => type === selectValues.select1);

	const pieData = {
		labels: categoryData.map((cat) => cat.name),
		datasets: [
			{
				data: categoryData.map((cat) => cat.amount),
				backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
			},
		],
	};

	const barData = {
		labels: accounts.map((acc) => acc.name),
		datasets: [
			{
				label: 'Сумма по счетам',
				data: accounts.map((acc) => acc.amount),
				backgroundColor: '#36A2EB',
			},
		],
	};

	const lineData = {
		labels: accountTransactionData.map((t) => t.transactionDate),
		datasets: [
			{
				label: 'Сумма транзакций по времени',
				data: accountTransactionData.map((t) => t.balance),
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
	height: 100vh;
	flex-wrap: wrap;
	gap: 10px;
	justify-content: center;

	& .chart {
		border: 1px solid #e0e0e0;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		padding: 20px;
		flex-grow: 1;
		flex-basis: 40%;
		height: 50vh;
	}

	& .header-card {
		display: flex;
		justify-content: space-between;
	}
`;

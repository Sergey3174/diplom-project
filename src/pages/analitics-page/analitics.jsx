import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { useSelector } from 'react-redux';
import { selectAccounts, selectCategories, selectTransactions } from '../../selectors';
import styled from 'styled-components';
import { calculateAmount } from '../../utils';

Chart.register(ArcElement, CategoryScale, LinearScale, BarElement);

export const AnaliticsContainer = ({ className }) => {
	const { transactions } = useSelector(selectTransactions);
	const { categories } = useSelector(selectCategories);
	const { accounts } = useSelector(selectAccounts);
	// const transactions = [
	// 	{ id: 1, amount: 100, category: 'Food', account: 'Cash', date: '2024-10-01' },
	// 	{ id: 2, amount: 50, category: 'Transport', account: 'Card', date: '2024-10-02' },

	// ];

	const categoryData = categories
		.filter(({ type }) => type === 'income')
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
	const optionsPie = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Chart.js Pie Chart',
			},
		},
	};
	return (
		<div className={className}>
			<h2>Расходы по категориям</h2>
			<Pie data={pieData} option={optionsPie} />
			<h2>Суммы по счетам</h2>
			<Bar data={barData} />
			{/* <h2>Суммы по счетам</h2>
			<Line data={barData} /> */}
		</div>
	);
};

export const Analitics = styled(AnaliticsContainer)`
	width: 20%;
`;

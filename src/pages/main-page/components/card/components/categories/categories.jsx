import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectCategories, selectTransactions } from '../../../../../../selectors';
import { calculateAmount } from '../../../../../../utils';

const CategoriesContainer = ({ className }) => {
	const { categories } = useSelector(selectCategories);
	const { transactions } = useSelector(selectTransactions);

	return (
		<div className={className}>
			<div className="card-categories">
				Доходы
				<div className="item-categories-conrainer">
					{categories.map(({ type, id, name }) => {
						if (type === 'income') {
							return (
								<div className="item-categories" key={id}>
									<span>{name}</span>
									<span>
										{calculateAmount(transactions, id, 'category')}
									</span>
								</div>
							);
						} else {
							return;
						}
					})}
				</div>
			</div>
			<div className="card-categories">
				Расходы
				<div className="item-categories-conrainer">
					{categories.map(({ type, id, name }) => {
						if (type === 'expense') {
							return (
								<div className="item-categories" key={id}>
									<span>{name}</span>
									<span>
										{calculateAmount(transactions, id, 'category')}
									</span>
								</div>
							);
						} else {
							return;
						}
					})}
				</div>
			</div>
		</div>
	);
};

export const Categories = styled(CategoriesContainer)`
	display: flex;
	gap: 10px;

	& .card-categories {
		width: 50%;
		border: 1px solid #e0e0e0;
		padding: 5px;
		border-radius: 10px;
	}

	& .item-categories {
		display: flex;
		justify-content: space-between;
	}
`;

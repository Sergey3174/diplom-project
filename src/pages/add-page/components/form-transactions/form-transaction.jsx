import styled from 'styled-components';
import { Button, Input, Select } from '../../../../components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	selectAccounts,
	selectCategories,
	selectTransactions,
	selectUserId,
} from '../../../../selectors';
import { useMatch, useParams } from 'react-router-dom';

const FormTransactionContainer = ({ className, onSave }) => {
	const [selectValues, setSelectValues] = useState({
		select1: '',
		select2: '',
		select3: '',
	});
	const [amount, setAmount] = useState('');
	const [description, setDescription] = useState('');

	const isCreating = !!useMatch('/add-transactions');

	const userId = useSelector(selectUserId);
	const { categories } = useSelector(selectCategories);
	const { accounts } = useSelector(selectAccounts);
	const { transactions } = useSelector(selectTransactions);

	const { id: idTransaction } = useParams();

	useEffect(() => {
		if (isCreating) {
			return;
		} else {
			fetch(`http://localhost:3005/transactions/${idTransaction}`)
				.then((data) => data.json())
				.then((transaction) => {
					setSelectValues({
						select1: transaction.type,
						select2: transaction.categoryId,
						select3: transaction.accountId,
					});

					setAmount(transaction.amount);
					setDescription(transaction.description);
				});
		}
	}, [isCreating, idTransaction, transactions]);

	const handleSelectChange = (name, value) => {
		setSelectValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const onAmountChange = ({ target }) => setAmount(target.value);
	const onDescriptionChange = ({ target }) => setDescription(target.value);

	const filterCategories = categories.filter(
		({ type }) => type === selectValues.select1,
	);

	return (
		<form className={className}>
			<h3>Добавить операцию</h3>
			<Select
				label="Тип транзакции"
				name="select1"
				data={[
					{ id: 'income', name: 'Доход' },
					{ id: 'expense', name: 'Расход' },
				]}
				value={selectValues.select1}
				onSelectChange={handleSelectChange}
			/>

			<Select
				label="Категория"
				name="select2"
				data={filterCategories}
				value={selectValues.select2}
				onSelectChange={handleSelectChange}
			/>
			<Select
				label="Cчет"
				name="select3"
				data={accounts}
				value={selectValues.select3}
				onSelectChange={handleSelectChange}
			/>
			<div>Сумма</div>
			<Input width="100%" type="number" onChange={onAmountChange} value={amount} />
			<div>Описание</div>
			<Input width="100%" onChange={onDescriptionChange} value={description} />

			<Button
				width="50%"
				onClick={(event) =>
					onSave(event, 'saveTransaction', {
						userId,
						accountId: selectValues.select3,
						categoryId: selectValues.select2,
						amount: Number(amount),
						type: selectValues.select1,
						description,
						transaction_date: new Date(),
					})
				}
			>
				Отправить
			</Button>
		</form>
	);
};

export const FormTransaction = styled(FormTransactionContainer)`
	width: 80%;
	margin: 0 auto;
`;

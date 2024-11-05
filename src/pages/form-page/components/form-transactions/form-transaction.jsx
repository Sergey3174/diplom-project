import styled from 'styled-components';
import { Button, IconButton, Input, Select } from '../../../../components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAccounts, selectCategories, selectUserId } from '../../../../selectors';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useSelectValues, useServerRequest } from '../../../../hooks';
import TRASH from '../../../../assets/trash.png';
import ADD_ICON from '../../../../assets/add-icon.svg';
import {
	removeTransactionAsync,
	saveTransactionAsync,
	updateTransactionAsync,
} from '../../../../actions';

const FormTransactionContainer = ({ className, onSave }) => {
	const [selectValues, handleSelectChange] = useSelectValues(3);
	const [amount, setAmount] = useState('');
	const [description, setDescription] = useState('');
	const isCreating = !!useMatch('/transaction');
	const navigate = useNavigate();
	const userId = useSelector(selectUserId);
	const { categories } = useSelector(selectCategories);
	const { accounts } = useSelector(selectAccounts);

	const requestServer = useServerRequest();

	const { id: idTransaction } = useParams();

	useEffect(() => {
		if (isCreating) {
			return;
		} else {
			fetch(`http://localhost:3005/transactions/${idTransaction}`)
				.then((data) => data.json())
				.then((transaction) => {
					handleSelectChange('select1', transaction.type);
					handleSelectChange('select2', transaction.categoryId);
					handleSelectChange('select3', transaction.accountId);

					setAmount(transaction.amount);
					setDescription(transaction.description);
				});
		}
	}, [isCreating, idTransaction, handleSelectChange]);

	const onAmountChange = ({ target }) => setAmount(target.value);
	const onDescriptionChange = ({ target }) => setDescription(target.value);

	const filterCategories = categories.filter(
		({ type }) => type === selectValues.select1,
	);
	const handleClick = (event) => {
		const data = {
			id: !isCreating ? idTransaction : '',
			userId,
			accountId: selectValues.select3,
			categoryId: selectValues.select2,
			amount: Number(amount),
			type: selectValues.select1,
			description,
			transaction_date: new Date(),
		};

		if (isCreating) {
			onSave(event, saveTransactionAsync(requestServer, data));
		} else {
			onSave(event, updateTransactionAsync(requestServer, data));
		}
	};

	console.log(selectValues);

	return (
		<form className={className}>
			<h3>Добавить операцию</h3>
			{!isCreating && (
				<IconButton
					icon={TRASH}
					width="30px"
					position="absolute"
					right="0px"
					top="-5px"
					onClick={(event) =>
						onSave(
							event,
							removeTransactionAsync(requestServer, {
								id: idTransaction,
								userId,
								accountId: selectValues.select3,
								categoryId: selectValues.select2,
							}),
						)
					}
				/>
			)}
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
			<IconButton
				onClick={() => navigate('/category')}
				icon={ADD_ICON}
				width="30px"
				position="absolute"
				right="-35px"
				top="102px"
			/>
			<Select
				label="Счет"
				name="select3"
				data={accounts}
				value={selectValues.select3}
				onSelectChange={handleSelectChange}
			/>
			<IconButton
				onClick={() => navigate('/account')}
				icon={ADD_ICON}
				width="30px"
				position="absolute"
				right="-35px"
				top="152px"
			/>
			<div>Сумма</div>
			<Input width="100%" type="number" onChange={onAmountChange} value={amount} />
			<div>Описание</div>
			<Input width="100%" onChange={onDescriptionChange} value={description} />

			<Button width="50%" onClick={handleClick}>
				Отправить
			</Button>
		</form>
	);
};

export const FormTransaction = styled(FormTransactionContainer)`
	width: 80%;
	margin: 0 auto;
	position: relative;
`;

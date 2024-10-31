import styled from 'styled-components';
import { Button, Input, Select } from '../../../../components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAccountsTypes, selectUserId } from '../../../../selectors';
import { useMatch, useParams } from 'react-router-dom';
import ADD_ICON from '../../../../assets/add-icon.svg';

const FormAccountContainer = ({ className, onSave }) => {
	const [select, setSelect] = useState('');
	const [nameAccount, setNameAccount] = useState('');
	const [editing, setEditing] = useState(false);

	const typeAccounts = useSelector(selectAccountsTypes);
	// const isCreating = !!useMatch('/add-transactions');

	const userId = useSelector(selectUserId);

	// const { id: idTransaction } = useParams();

	// useEffect(() => {
	// 	if (isCreating) {
	// 		return;
	// 	} else {
	// 		fetch(`http://localhost:3005/transactions/${idTransaction}`)
	// 			.then((data) => data.json())
	// 			.then((transaction) => {
	// 				setSelectValues({
	// 					select1: transaction.type,
	// 					select2: transaction.categoryId,
	// 					select3: transaction.accountId,
	// 				});

	// 				setAmount(transaction.amount);
	// 				setDescription(transaction.description);
	// 			});
	// 	}
	// }, [isCreating, idTransaction, transactions]);

	const onNameChange = ({ target }) => setNameAccount(target.value);

	const handleSelectChange = (name, value) => setSelect(value);

	return (
		<form className={className}>
			<h3>Добавить счет</h3>

			<div className="category-input">
				{!editing ? (
					<>
						<Select
							label="Тип категории"
							name="select1"
							data={typeAccounts}
							value={select}
							onSelectChange={handleSelectChange}
						/>
						<img
							className="icon"
							src={ADD_ICON}
							onClick={() => setEditing(true)}
						/>
					</>
				) : (
					<>
						<div>Новая категория</div>
						<Input width="70%" onChange={onNameChange} value={nameAccount} />
					</>
				)}
			</div>
			<div>Название счета</div>
			<Input width="100%" onChange={onNameChange} value={nameAccount} />

			<Button
				width="50%"
				onClick={(event) =>
					onSave(event, 'saveAccount', {
						userId,
						name: nameAccount,
						typeAccount: select,
					})
				}
			>
				Отправить
			</Button>
		</form>
	);
};

export const FormAccount = styled(FormAccountContainer)`
	width: 80%;
	margin: 0 auto;

	& .category-input {
		display: flex;
		align-items: center;
		position: relative;
		gap: 5px;
		justify-content: space-between;

		& > img {
			width: 30px;
			position: absolute;
			right: -35px;
			cursor: pointer;
		}
	}
`;

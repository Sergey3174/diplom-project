import styled from 'styled-components';
import { Button, IconButton, Input, Select } from '../../../../components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccounts, selectAccountsTypes, selectUserId } from '../../../../selectors';
import { useMatch, useParams } from 'react-router-dom';
import ADD_ICON from '../../../../assets/add-icon.svg';
import V_ICON from '../../../../assets/V.png';
import X_ICON from '../../../../assets/X.png';
import { addTypeAccountAsync, saveAccountAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks';
import TRASH from '../../../../assets/trash.png';

const FormAccountContainer = ({ className, onSave }) => {
	const [select, setSelect] = useState('');
	const [nameAccount, setNameAccount] = useState('');
	const [editing, setEditing] = useState(false);
	const [errors, setErrors] = useState({});
	const typeAccounts = useSelector(selectAccountsTypes);
	const { accounts } = useSelector(selectAccounts);
	const isCreating = !!useMatch('/account');

	const userId = useSelector(selectUserId);

	const { id: idAccount } = useParams();

	const validateForm = () => {
		const newErrors = {};
		if (!select) {
			newErrors.select = 'Тип категории обязателен';
		}
		if (!nameAccount) {
			newErrors.name = 'Имя категории обязательно';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0; // Возвращаем true, если нет ошибок
	};

	useEffect(() => {
		if (isCreating) {
			return;
		} else {
			const account = accounts.find((acc) => acc.id === idAccount);
			setSelect(account.type_accounts);
			setNameAccount(account.name);
		}
	}, [isCreating, accounts, idAccount]);

	const onNameChange = ({ target }) => setNameAccount(target.value);

	const handleSelectChange = (name, value) => setSelect(value);

	const requestServer = useServerRequest();
	const [newTypeAccount, setNewTypeAccount] = useState('');
	const onTypeChange = ({ target }) => setNewTypeAccount(target.value);
	const dispatch = useDispatch();
	const handleAddTypeAccount = () => {
		dispatch(addTypeAccountAsync(requestServer, newTypeAccount)).then(() =>
			setEditing(false),
		);
	};

	const handleClick = (event) => {
		event.preventDefault();
		if (validateForm()) {
			const data = {
				id: !isCreating ? idAccount : '',
				userId,
				name: nameAccount,
				typeAccount: select,
			};
			if (isCreating) {
				onSave(event, saveAccountAsync(requestServer, data));
			} else {
				onSave(event, 'saveAccount', data);
			}
		}
	};

	return (
		<form className={className}>
			<h3>Добавить счет</h3>
			{!isCreating && (
				<IconButton
					icon={TRASH}
					width="30px"
					position="absolute"
					right="0"
					top="-5px"
					onClick={(event) => onSave(event, 'removeAccount', idAccount)}
				/>
			)}
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

						<IconButton
							onClick={() => setEditing(true)}
							icon={ADD_ICON}
							width="30px"
							position="absolute"
							right="-35px"
						/>
					</>
				) : (
					<>
						<div>Новая категория</div>
						<Input
							width="70%"
							onChange={onTypeChange}
							value={newTypeAccount}
							margin="10px 0"
						/>
						<div className="button-confirm-cancel">
							<IconButton
								icon={V_ICON}
								width="30px"
								onClick={handleAddTypeAccount}
							/>
							<IconButton
								icon={X_ICON}
								width="20px"
								onClick={() => setEditing(false)}
							/>
						</div>
					</>
				)}
			</div>
			{errors.select && <div style={{ color: 'red' }}>{errors.select}</div>}
			<div>Название счета</div>
			<Input
				width="100%"
				disabled={editing}
				onChange={onNameChange}
				value={nameAccount}
			/>
			{errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
			<Button width="50%" onClick={handleClick}>
				Отправить
			</Button>
		</form>
	);
};

export const FormAccount = styled(FormAccountContainer)`
	width: 80%;
	margin: 0 auto;
	position: relative;

	& .category-input {
		display: flex;
		align-items: center;
		position: relative;
		gap: 5px;
		justify-content: space-between;
	}

	& .button-confirm-cancel {
		display: flex;
		align-items: center;
		position: absolute;
		right: -50px;
	}
`;

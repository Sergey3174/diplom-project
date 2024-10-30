import styled from 'styled-components';
import { Button, Input, Select } from '../../../../components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../../selectors';
import { useMatch, useParams } from 'react-router-dom';

const FormCategory = ({ className, onSave }) => {
	const [select, setSelect] = useState('');
	const [nameCategory, setNameCategory] = useState('');

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

	const onNameChange = ({ target }) => setNameCategory(target.value);

	const handleSelectChange = (name, value) => setSelect(value);

	console.log(select);
	return (
		<form className={className}>
			<h3>Добавить категорию</h3>
			<Select
				label="Тип категории"
				name="select1"
				data={[
					{ id: 'income', name: 'Доход' },
					{ id: 'expense', name: 'Расход' },
				]}
				value={select}
				onSelectChange={handleSelectChange}
			/>
			<div>Описание</div>
			<Input width="100%" onChange={onNameChange} value={nameCategory} />

			<Button
				width="50%"
				onClick={(event) =>
					onSave(event, 'saveCategory', {
						userId,
						name: nameCategory,
						type: select,
					})
				}
			>
				Отправить
			</Button>
		</form>
	);
};

export const FormCategoty = styled(FormCategory)`
	width: 80%;
	margin: 0 auto;
`;

import styled from 'styled-components';
import { Button, Input, Select } from '../../../../components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCategories, selectUserId } from '../../../../selectors';
import { useMatch, useParams } from 'react-router-dom';

const FormCategory = ({ className, onSave }) => {
	const [select, setSelect] = useState('');
	const [nameCategory, setNameCategory] = useState('');

	const isCreating = !!useMatch('/category');

	const userId = useSelector(selectUserId);

	const { id: idCategory } = useParams();

	const { categories } = useSelector(selectCategories);

	useEffect(() => {
		if (isCreating) {
			return;
		} else {
			const category = categories.find((cat) => cat.id === idCategory);
			setSelect(category.type);
			setNameCategory(category.name);
		}
	}, [isCreating, categories, idCategory]);

	const onNameChange = ({ target }) => setNameCategory(target.value);

	const handleSelectChange = (name, value) => setSelect(value);

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
						id: !isCreating ? idCategory : '',
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

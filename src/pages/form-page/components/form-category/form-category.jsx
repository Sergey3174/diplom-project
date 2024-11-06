import styled from 'styled-components';
import { Button, IconButton, Input, Select } from '../../../../components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCategories, selectUserId } from '../../../../selectors';
import { useMatch, useParams } from 'react-router-dom';
import TRASH from '../../../../assets/trash.png';
import { useServerRequest } from '../../../../hooks';
import { saveCategoryAsync } from '../../../../actions';

const FormCategoryContainer = ({ className, onSave }) => {
	const [select, setSelect] = useState('');
	const [nameCategory, setNameCategory] = useState('');
	const [errors, setErrors] = useState({});
	const requestServer = useServerRequest();
	const isCreating = !!useMatch('/category');
	const userId = useSelector(selectUserId);
	const { id: idCategory } = useParams();
	const { categories } = useSelector(selectCategories);

	useEffect(() => {
		if (!isCreating) {
			const category = categories.find((cat) => cat.id === idCategory);
			setSelect(category.type);
			setNameCategory(category.name);
		}
	}, [isCreating, categories, idCategory]);

	const onNameChange = ({ target }) => setNameCategory(target.value);

	const handleSelectChange = (name, value) => setSelect(value);

	const validateForm = () => {
		const newErrors = {};
		if (!select) {
			newErrors.select = 'Тип категории обязателен';
		}
		if (!nameCategory) {
			newErrors.name = 'Имя категории обязательно';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0; // Возвращаем true, если нет ошибок
	};

	const handleClick = (event) => {
		event.preventDefault(); // Отменяем стандартное поведение формы
		if (validateForm()) {
			const data = {
				id: !isCreating ? idCategory : '',
				userId,
				name: nameCategory,
				type: select,
			};
			onSave(
				event,
				isCreating ? saveCategoryAsync(requestServer, data) : 'saveCategory',
				data,
			);
		}
	};

	return (
		<form className={className}>
			<h3>Добавить категорию</h3>
			{!isCreating && (
				<IconButton
					icon={TRASH}
					width="30px"
					position="absolute"
					right="0"
					top="-5px"
					onClick={(event) => onSave(event, 'removeCategory', idCategory)}
				/>
			)}

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
			{errors.select && <div style={{ color: 'red' }}>{errors.select}</div>}

			<div>Описание</div>
			<Input width="100%" onChange={onNameChange} value={nameCategory} />
			{errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}

			<Button width="50%" onClick={handleClick}>
				Отправить
			</Button>
		</form>
	);
};

export const FormCategory = styled(FormCategoryContainer)`
	width: 80%;
	margin: 0 auto;
	position: relative;
`;

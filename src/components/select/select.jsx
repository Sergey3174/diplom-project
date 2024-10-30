import styled from 'styled-components';

const SelectContainer = ({
	className,
	data,
	value,
	onSelectChange,
	name,
	label = null,
}) => {
	const handleSelectChange = (target) => {
		const newValue = target.value;
		onSelectChange(name, newValue);
	};

	return (
		<div className={className}>
			{label && (
				<label className="label-style" htmlFor="select1">
					{label}
				</label>
			)}
			<select
				className="select-style"
				value={value}
				onChange={({ target }) => handleSelectChange(target)}
			>
				{!value && <option value="">Выберите</option>}
				{data.map((item) => (
					<option key={item.id} value={item.id}>
						{item.name}
					</option>
				))}
			</select>
		</div>
	);
};

export const Select = styled(SelectContainer)`
	width: 100%;
	margin: 10px 0;
	display: flex;
	justify-content: space-between;
	align-items: center;

	& .select-style {
		display: block;
		margin-left: 8px;
		width: 100%;
		padding: 10px 40px 10px 15px; /* Добавляем отступы для стрелки */
		border: 1px solid #ccc;
		border-radius: 4px;
		background-color: #fff;
		cursor: pointer;
		font-size: 16px;
		transition: border-color 0.3s;
		&:hover {
			border-color: #007bff;
		}

		&:focus {
			outline: none;
			border-color: #007bff;
		}
	}
	& .label-style {
		display: block;
		width: 40%;
	}
`;

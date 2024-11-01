import styled from 'styled-components';
import { IconButton, Select } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccounts, selectFilter } from '../../../../selectors';
import { RESET_FILTER, setFilter } from '../../../../actions';
import UPDATE from '../../../../assets/update.png';
import ADD_ICON from '../../../../assets/add-icon.svg';
import { Link } from 'react-router-dom';
const ControlPanelContainer = ({ className }) => {
	const { accounts } = useSelector(selectAccounts);

	const dispatch = useDispatch();

	const { isFilter, parametrs } = useSelector(selectFilter);

	const handleSelectChange = (name, value) => {
		dispatch(setFilter({ name, value }));
	};

	const handleResetFilter = () => {
		dispatch(RESET_FILTER);
	};

	return (
		<div className={className}>
			<span>Фильтры</span>
			<Select
				name="param1"
				data={[
					{ id: 'income', name: 'Доход' },
					{ id: 'expense', name: 'Расход' },
				]}
				value={parametrs.param1}
				onSelectChange={handleSelectChange}
			/>
			<Select
				name="param2"
				data={accounts}
				value={parametrs.param2}
				onSelectChange={handleSelectChange}
			/>

			<div className="img-button">
				{isFilter && (
					<IconButton icon={UPDATE} onClick={handleResetFilter} width="40px" />
				)}
			</div>
			<Link to="/transaction">
				<IconButton icon={ADD_ICON} width="40px" />
			</Link>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	align-items: center;
`;

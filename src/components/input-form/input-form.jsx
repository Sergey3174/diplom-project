import styled from 'styled-components';
import V_ICON from '../../assets/V.png';
import X_ICON from '../../assets/X.png';
import { IconButton } from '../icon-button/icon-button';
import { Input } from '../input/input';

const InputFormContainer = ({ className, title, name, handleIsChange, value }) => {
	return (
		<div className={className}>
			{title && <div>Новая категория</div>}
			<Input
				width="100%"
				// onChange={onTypeChange}
				value={value}
				margin="10px 0"
			/>
			<div className="button-confirm-cancel">
				<IconButton
					icon={V_ICON}
					width="30px"
					// onClick={}
				/>

				<IconButton
					icon={X_ICON}
					width="20px"
					onClick={() => handleIsChange(name)}
				/>
			</div>
		</div>
	);
};

export const InputForm = styled(InputFormContainer)`
	position: relative;
	display: flex;

	& .button-confirm-cancel {
		display: flex;
		align-items: center;
	}
`;

import styled from 'styled-components';
import ADD_ICON from '../../../../assets/add-icon.svg';
import { Link } from 'react-router-dom';
import { IconButton } from '../../../../components';

const CardContainer = ({ className, children, to, name }) => {
	return (
		<div className={className}>
			<div className="header_widget">
				<h3>{name}</h3>
				<Link to={to}>
					<IconButton icon={ADD_ICON} width="30px" />
				</Link>
			</div>
			{children}
		</div>
	);
};

export const Card = styled(CardContainer)`
	display: flex;
	flex-wrap: wrap;
	gap: 5px;
	border: 1px solid #e0e0e0;
	padding: 5px;
	border-radius: 10px;
	overflow: hidden;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s;
	background-color: #e9e9e9;
	flex: 2 1 600px;

	&:hover {
		transform: translateY(-5px);
	}

	& .header_widget {
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 0;
	}
`;

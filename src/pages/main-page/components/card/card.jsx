import styled from 'styled-components';
import ADD_ICON from '../../../../assets/add-icon.svg';
import { Link } from 'react-router-dom';
import { IconButton } from '../../../../components';

const CardContainer = ({ className, content, children, to }) => {
	return (
		<div className={className}>
			<div className="header_widget">
				<h3>{children}</h3>
				<Link to={to}>
					<IconButton icon={ADD_ICON} width="30px" />
				</Link>
			</div>
			{content}
		</div>
	);
};

export const Card = styled(CardContainer)`
	border: 1px solid #e0e0e0;
	padding: 5px;
	border-radius: 10px;
	overflow: hidden;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s;
	width: calc(50% - 20px);

	&:hover {
		transform: translateY(-5px);
	}

	& .header_widget {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;

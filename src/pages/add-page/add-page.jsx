import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { FormAccount, FormCategoty, FormTransaction } from './components';

const AddPageContainer = ({ className }) => {
	const requestServer = useServerRequest();

	const navigate = useNavigate();
	const { pathname } = useLocation();

	const onSave = (event, operation, data) => {
		event.preventDefault();
		requestServer(operation, data).then(() => navigate(-1));
	};

	const Form = () => {
		switch (pathname) {
			case '/add-transactions':
				return <FormTransaction onSave={onSave} />;
			case '/add-categories':
				return <FormCategoty onSave={onSave} />;
			case '/add-account':
				return <FormAccount onSave={onSave} />;
			default:
				return;
		}
	};

	return <div className={className}>{Form()}</div>;
};

export const AddPage = styled(AddPageContainer)`
	width: 50%;
	margin: 10% auto 0;
	border: 1px solid #e0e0e0;
	padding: 10px;
	border-radius: 10px;
	overflow: hidden;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s;
`;

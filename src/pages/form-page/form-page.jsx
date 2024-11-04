import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { FormAccount, FormCategoty, FormTransaction } from './components';

const FormPageContainer = ({ className }) => {
	const requestServer = useServerRequest();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { id } = useParams();

	const onSave = (event, operation, data) => {
		event.preventDefault();
		requestServer(operation, data).then(() => navigate(-1));
	};

	const Form = () => {
		switch (pathname) {
			case `/transaction/${id}`:
			case '/transaction':
				return <FormTransaction onSave={onSave} />;
			case `/category/${id}`:
			case '/category':
				return <FormCategoty onSave={onSave} />;
			case `/account/${id}`:
			case '/account':
				return <FormAccount onSave={onSave} />;
			default:
				return <div>Привет</div>;
		}
	};

	return <div className={className}>{Form()}</div>;
};

export const FormPage = styled(FormPageContainer)`
	width: 50%;
	margin: 10% auto 0;
	border: 1px solid #e0e0e0;
	padding: 10px;
	border-radius: 10px;
	overflow: hidden;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s;
`;

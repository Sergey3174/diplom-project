import styled from 'styled-components';
import UserAvatar from '../../../../assets/user-svgrepo-com.svg';

import { useDispatch, useSelector } from 'react-redux';
import { selectUserLogin, selectUserSession } from '../../../../selectors';
import { logout } from '../../../../actions';
import { Button } from '../../../button/button';

const UserBlockContainer = ({ className }) => {
	const dispatch = useDispatch();

	const session = useSelector(selectUserSession);
	const login = useSelector(selectUserLogin);

	const onLogout = () => {
		dispatch(logout(session));
		sessionStorage.removeItem('userData');
	};

	return (
		<div className={className}>
			<img src={UserAvatar} />
			<span>{login}</span>
			<Button onClick={onLogout}>Выход</Button>
		</div>
	);
};

export const UserBlock = styled(UserBlockContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	padding: 8px;
	width: 150px;
	position: absolute;
	bottom: 10vh;
	left: 50%;
	transform: translateX(-50%);

	& > img {
		width: 65%;
		border-radius: 50%;
	}
`;

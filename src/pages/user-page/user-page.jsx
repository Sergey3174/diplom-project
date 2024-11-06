import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectUser } from '../../selectors';
import BACK_ICON from '../../assets/back.png';
import TRASH from '../../assets/trash.png';
import USER_ICON from '../../assets/user-svgrepo-com.svg';
import { UserRow } from './components';
import { InputForm } from '../../components/input-form/input-form';
import { useState } from 'react';

const UserPageContainer = ({ className }) => {
	const [isChange, setIsChange] = useState({
		name: false,
		login: false,
		email: false,
		password: false,
	});

	const handleIsChange = (name) => {
		setIsChange((prevValues) => ({
			...prevValues,
			[name]: !prevValues[name],
		}));
	};

	const user = useSelector(selectUser);
	console.log(isChange);
	return (
		<div className={className}>
			<div className="container">
				<img src={USER_ICON} />
				<div>
					<span className="title">ФИО:</span>
					{!isChange.name ? (
						<UserRow name="name" handleIsChange={handleIsChange}>
							{user.name}
						</UserRow>
					) : (
						<InputForm
							value={user.name}
							name="name"
							handleIsChange={handleIsChange}
						/>
					)}
					<span className="title">Логин:</span>
					{!isChange.login ? (
						<UserRow name="login" handleIsChange={handleIsChange}>
							{user.login}
						</UserRow>
					) : (
						<InputForm
							value={user.login}
							name="login"
							handleIsChange={handleIsChange}
						/>
					)}
					<span className="title">E-mail:</span>
					{!isChange.email ? (
						<UserRow name="email" handleIsChange={handleIsChange}>
							{user.email}
						</UserRow>
					) : (
						<InputForm
							value={user.email}
							name="email"
							handleIsChange={handleIsChange}
						/>
					)}
				</div>
			</div>
		</div>
	);
};
export const UserPage = styled(UserPageContainer)`
	width: 70%;
	height: 70vh;
	margin: 100px auto;
	border: 1px solid #e0e0e0;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	& .container {
		width: 50%;
		display: flex;
	}

	& .title {
		font-size: 20px;
		font-weight: bold;
	}
`;

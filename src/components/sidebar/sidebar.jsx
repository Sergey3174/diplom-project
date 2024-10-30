import styled from 'styled-components';
import { Logo, UserBlock } from './components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SideBarContainer = ({ className }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const menuItems = [
		{ name: 'Главная', to: '/' },
		{ name: 'История', to: '/history' },
		{ name: 'Аналитика', to: '/login' },
	];
	return (
		<div className={className}>
			<Logo />
			<ul>
				{menuItems.map(({ name, to }, index) => (
					<Link to={to} key={index}>
						<li
							onClick={() => setActiveIndex(index)}
							className={activeIndex === index ? 'active' : ''}
						>
							{name}
						</li>
					</Link>
				))}
			</ul>
			<UserBlock />
		</div>
	);
};

export const SideBar = styled(SideBarContainer)`
	width: 220px;
	background-color: white;
	height: 100vh;
	padding: 20px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	position: fixed;

	& ul {
		list-style: none;
		padding: 0;
	}

	& ul li {
		margin-bottom: 15px;
		cursor: pointer; /* Курсор при наведении */
		padding: 10px; /* Внутренний отступ для элементов меню */
		border-radius: 4px; /* Закругление углов */
	}

	& ul li:hover {
		background-color: #e0e0e0; /* Фон при наведении */
	}

	& ul li.active {
		background-color: #007bff; /* Фон для активного пункта */
		color: white; /* Цвет текста для активного пункта */
		& > a {
			color: white;
		}
	}
`;

import { Outlet, Route, Routes } from 'react-router-dom';
import { PrivateRoute, SideBar } from './components';
import {
	Authorization,
	MainPage,
	HistoryPage,
	FormPage,
	Analitics,
	Registration,
} from './pages';

import styled from 'styled-components';
import { useLayoutEffect } from 'react';
import { setUser } from './actions';
import { useDispatch } from 'react-redux';

const AppFlex = styled.div`
	display: flex;
`;

const Page = styled.div`
	margin: 0 10px 0 280px;
	width: 100%;
`;

function App() {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);
		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<>
			<Routes>
				<Route
					path="/"
					element={
						<PrivateRoute>
							<AppFlex>
								<SideBar />
								<Page>
									<Outlet />
								</Page>
							</AppFlex>
						</PrivateRoute>
					}
				>
					<Route path="/" element={<MainPage />} />
					<Route path="/history" element={<HistoryPage />} />
					<Route path="/transaction" element={<FormPage />} />
					<Route path="/transaction/:id" element={<FormPage />} />
					<Route path="/category" element={<FormPage />} />
					<Route path="/category/:id" element={<FormPage />} />
					<Route path="/account" element={<FormPage />} />
					<Route path="/account/:id" element={<FormPage />} />
					<Route path="/analitics" element={<Analitics />} />
				</Route>
				<Route path="/register" element={<Registration />} />
				<Route path="/login" element={<Authorization />} />
			</Routes>
		</>
	);
}

export default App;

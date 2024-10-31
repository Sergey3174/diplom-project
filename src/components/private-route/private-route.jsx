import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectUserSession } from '../../selectors';

export const PrivateRoute = ({ children }) => {
	const session = useSelector(selectUserSession);

	return session ? children : <Navigate to="/login" />;
};

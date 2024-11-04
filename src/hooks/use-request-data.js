import { useDispatch } from 'react-redux';
import { useServerRequest } from './use-server-request';
import { useEffect } from 'react';
import { loadDataAsync } from '../actions';

export const useRequestData = (userId) => {
	const serverRequest = useServerRequest();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadDataAsync(serverRequest, userId));
	}, [dispatch, serverRequest, userId]);
};

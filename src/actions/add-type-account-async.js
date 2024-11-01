import { addTypeAccount } from './add-type-account';

export const addTypeAccountAsync = (requestServer, name) => (dispatch) => {
	return requestServer('addTypeAccount', name).then((data) => {
		dispatch(addTypeAccount(data.res.typeAccount));
	});
};

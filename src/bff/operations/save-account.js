import { addAccount, updateAccount } from '../api';

export const saveAccount = async (newAccountData) => {
	if (newAccountData.id === '') {
		const newAccount = await addAccount(newAccountData);
		return { res: newAccount };
	} else {
		await updateAccount(newAccountData);
	}
};

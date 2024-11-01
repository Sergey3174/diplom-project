import { addAccount, updateAccount } from '../api';

export const saveAccount = async (newAccountData) => {
	newAccountData.id === ''
		? await addAccount(newAccountData)
		: await updateAccount(newAccountData);
};

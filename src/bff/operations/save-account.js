import { addAccount } from '../api';

export const saveAccount = async (newAccountData) => {
	await addAccount(newAccountData);
};

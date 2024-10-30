import { addCategory } from '../api';

export const saveCategory = async (newCategoryData) => {
	await addCategory(newCategoryData);
};

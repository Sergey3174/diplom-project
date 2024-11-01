import { addCategory, updateCategory } from '../api';

export const saveCategory = async (newCategoryData) => {
	newCategoryData.id === ''
		? await addCategory(newCategoryData)
		: await updateCategory(newCategoryData);
};

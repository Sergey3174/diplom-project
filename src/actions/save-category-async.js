import { addNewCategory } from './add-new-category';

export const saveCategoryAsync = (requestServer, newCategoryData) => (dispatch) =>
	requestServer('saveCategory', newCategoryData).then((data) => {
		if (data.res) {
			dispatch(addNewCategory(data.res));
		}
		return data;
	});

import { jsonToFormData } from "../utils/commonUtils";
import api from "./api";

export const getHelpCenterCategories = () => {
  return api.get("/admin/support/categories");
};

export const createHelpCenterCategory = (categoryData: FormData) => {
  return api.post("/admin/support/category", categoryData);
};

export const deleteHelpCenterCategory = (categoryID: string) => {
  return api.delete(`/admin/support/categories/${categoryID}`);
};

export const getSubcategoryByCategory = (categoryId: string) => {
  return api.get(`/admin/support/categories/${categoryId}/subcategories`);
};

export const createHelpCenterSubCategory = (subCategory: FormData) => {
  return api.post("/admin/support/sub-category", subCategory);
}

export const deleteHelpCenterSubcategory = (subCategoryId: string) => {
  return api.delete(`/admin/support/sub-category/${subCategoryId}`);
};

export const updateFav = (data: any) => {
  return api.put(`/admin/support/questions/status`, data);
};


export const getQnsBySubCatgory = ({ subCategoryId, ...qnData }: { subCategoryId: string } & QnAPIParams) => {

  const queryParams = new URLSearchParams();

  if (qnData.page) {
    queryParams.append("page", qnData.page.toString());
  }

  if (qnData.limit) {
    queryParams.append("limit", qnData.limit.toString());
  }
  if (qnData.search && qnData.search.trim() !== "") {
    queryParams.append("search", qnData.search);
  }

  if (qnData.from && qnData.from.trim() !== "") {
    queryParams.append("from", qnData.from);
  }

  return api.get(`admin/support/subcategories/${subCategoryId}/questions?${queryParams.toString()}`);
};

export const addQns = (qn: FormData) => {
  return api.post('admin/support/question', qn)
}

export const deleteQn = (qnId: string) => {
  return api.delete(`/admin/support/questions/${qnId}`);
};

export const getQnByQnId = (qnId: string) => {
  return api.get(`/admin/support/questions/${qnId}`)
}

export const updateQn = (qn: Record<string, any>) => {
  const { qnId, ...rest } = qn
  const frmData = jsonToFormData(rest)
  return api.put(`admin/support/questions/${qnId}`, frmData)
}

export interface QnAPIParams {
  search: string;
  page?: Number;
  limit?: Number;
  from?: string;
}

export const getALlQns = (qnData: QnAPIParams) => {
  const queryParams = new URLSearchParams();
  if (qnData.page) {
    queryParams.append("page", qnData.page.toString());
  }

  if (qnData.limit) {
    queryParams.append("limit", qnData.limit.toString());
  }

  if (qnData.search && qnData.search.trim() !== "") {
    queryParams.append("search", qnData.search);
  }

  if (qnData.from && qnData.from.trim() !== "") {
    queryParams.append("from", qnData.from);
  }

  return api.get(`admin/support/questions?${queryParams.toString()}`);
};
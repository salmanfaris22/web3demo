// import { jsonToFormData } from "../utils/commonUtils";
import api from "./api";

export const getHelpCenterCategories = () => {
  // return api.get("/support/categories");
  return api.get('/support/list-all-subcategory?page=1&page_size=100')
};

export const getSubcategoryByCategory = (categoryId: string) => {
  return api.get(`/support/categories/${categoryId}/subcategories`);
};

export const getQnsBySubCatgory = ({ subCategoryId }: { subCategoryId: string }) => {
  return api.get(`/support/subcategories/${subCategoryId}/questions?limit=100`);
};

export const addQns = (qn: FormData) => {
  return api.post('/admin/support/question', qn)
}

export const deleteQn = (qnId: string) => {
  return api.delete(`/admin/support/questions/${qnId}`);
};

export const getQnByQnId = (qnId: string) => {
  return api.get(`/support/questions/${qnId}`)
}

// export const updateQn = (qn : Record<string  , any> )=>{
//   const {qnId , ...rest} = qn
//   const frmData = jsonToFormData(rest)
//   return api.put(`admin/support/questions/${qnId}` , frmData)
// }

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

  return api.get(`/support/questions?${queryParams.toString()}`);
};



export const getPopularQns = () => {
  // return api.get(
  //   `/support/questions-by-category-name?category_name=${CardNames.popular}`
  // );
  return api.get('/support/questions?page=1&limit=100&status=true')
};

export const getTicketCategories = () => {
  return api.get("/tickets/category");
};

export const createTicket = (apiData: FormData) => {
  return api.post("/tickets/create", apiData)
}

export const searchTickets = (search: string) => {
  return api.get(`/tickets/search?search_query=${search}`)
}

export const getCurrentUserTicket = () => {
  return api.get('/tickets/get-all')
}

export const getTicketDetialsById = (id: string) => {
  return api.get(`/tickets/${id}/messages`)
}
export const submitReply = (content: { content: string, id: string }) => {
  console.log(content)
  return api.post(`/tickets/${content.id}/reply`, { content: content.content })
}
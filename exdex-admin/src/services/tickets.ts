import api from "./api";

export interface PageParams {
  search: string;
  page?: Number;
  limit?: Number;
  from?: string;
}

export const getAllTickets = ({ ...qnData }: PageParams) => {
  const queryParams = new URLSearchParams();

  if (qnData.page) {
    queryParams.append("page", qnData.page.toString());
  }

  if (qnData.limit) {
    queryParams.append("page_size", qnData.limit.toString());
  }
  if (qnData.search && qnData.search.trim() !== "") {
    queryParams.append("search_name", qnData.search);
  }

  if (qnData.from && qnData.from.trim() !== "") {
    queryParams.append("from", qnData.from);
  }

  return api.get(`admin/tickets/get-all?${queryParams.toString()}`);
};
export const getUserTickets = ({ ...qnData }: PageParams & { id: string }) => {
  const queryParams = new URLSearchParams();

  if (qnData.page) {
    queryParams.append("page", qnData.page.toString());
  }

  if (qnData.limit) {
    queryParams.append("page_size", qnData.limit.toString());
  }
  if (qnData.search && qnData.search.trim() !== "") {
    queryParams.append("search_name", qnData.search);
  }

  if (qnData.from && qnData.from.trim() !== "") {
    queryParams.append("from", qnData.from);
  }

  return api.get(`admin/users/${qnData.id}/tickets?${queryParams.toString()}`);
};

export const updateTicket = ({
  status,
  id,
}: {
  status: "open" | "closed";
  id: string;
}) => {
  return api.put(`/admin/tickets/update/${id}`, { status });
};

export const getTicketsById = (id: string) => {
  return api.get(`/tickets/${id}/messages`);
};

export interface IReplyTicketAPIP {id :string , content  : string}

export const replyTicket = ({id , content} : IReplyTicketAPIP )=>{
  return api.post(`/tickets/${id}/reply` , {content})
} 

export const exportTickets = ()=>{
  return api.get('/admin/tickets/export')
}
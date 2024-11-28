import api from "./api";

export interface pageConfig {
  page?: Number;
  limit?: Number;
  search?: string;
}

export const getAffiliate = ({ page, limit, search }: pageConfig) => {
  return api.get(
    `admin/affiliate/submissions?page=${page}&page_size=${limit}&search=${search}`
  );
};

export interface IApproveRejectAf{
  id: string;
  status: "accepted" | "rejected";
}

export const apporvRejectAffiliate = ({
  id,
  status,
}: IApproveRejectAf) => {
  return api.put(`admin/affiliate/${id}/status`, { status });
};


export const getInfluencerById = (id: string) => {
  return api.get(`admin/affiliate/${id}/submission`);
};
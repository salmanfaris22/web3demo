import api from "./api";

export const generateToken = (qn: any) => {
  return api.post("admin/token/generate-token", qn);
};

export const transer = (qn: any) => {
  return api.post("admin/token/transfer", qn);
};

export const getTokenDistibution = () => {
  return api.get("admin/token/distribution");
};


export const getTxnHistory = () => {
  return api.get("admin/token/platform-transaction-history");
};


export const getTokenInfo = ()=>{
  return api.get("/admin/token/info")
}
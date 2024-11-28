import api from "./api";
import { PageParams } from "./tickets";

export const getAnnouncements = ({ ...qnData }: PageParams) => {
    const queryParams = new URLSearchParams();
  
    if (qnData.page) {
      queryParams.append("page", qnData.page.toString());
    }
  
    if (qnData.limit) {
      queryParams.append("page_size", qnData.limit.toString());
    }
    if (qnData.search && qnData.search.trim() !== "") {
      queryParams.append("search", qnData.search);
    }
    return api.get(`admin/announcements/get-all?${queryParams.toString()}`);
  };

  

export const deleteAnnoucement = (AnnoucementId: string) => {
    return api.delete(`/admin/announcements/delete/${AnnoucementId}`);
  };
  
  export const getAnnoucementsById = (AnnoucementId : string)=>{
    return api.get(`/admin/announcements/get-by-id/${AnnoucementId}`)
  }
  
  
  export const updateAnnoucementsById = ({AnnoucementId , AnnoucementData} : {AnnoucementId : string, AnnoucementData : FormData})=>{
    return api.put(`/admin/announcements/update/${AnnoucementId}` , AnnoucementData)
  }
  
  export const addAnnoucement = (blogData: FormData) => {
    return api.post("/admin/announcement/create", blogData);
  };
  
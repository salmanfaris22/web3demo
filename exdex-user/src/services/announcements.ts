import api from "./api";

export interface IGetAllAnnouncementParam {
  page: number;
  page_size: number;
}

export const getAllAnnouncements = ({
  page,
  page_size,
}: IGetAllAnnouncementParam) => {
  return api.get(`/public/announcement/get-all?page=${page}&page_size=${page_size}`);
};


export const getAnnoucementsById = (AnnoucementId : string)=>{
    return api.get(`/announcements/get-by-id/${AnnoucementId}`)
  }
  
import api from "./api";

export const getCountry = (search : string) => {
  return api.get(`/footer/get-country?search=${search}`);
};

export const getSocialMedia = () => {
  return api.get("/footer/get-social-media");
};

export const getLanguages = (search:string) => {
  return api.get(`/footer/get-languages?search=${search}`);
};

export const getMarketerType = ()=>{
    return api.get("/footer/get-marketer-type")
}

export const getContentType  =()=>{
  return api.get("/footer/get-content-type")
}

export const submitAffForm  = (apidata:FormData)=>{
  console.log("apiData" , apidata)
  return api.post("/footer/affiliate-form",apidata)
}
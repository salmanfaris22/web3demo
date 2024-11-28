export const  goToIdPage = (url : string  , value : string ,idKey=":id")=>{
    return url.replace(idKey  , value)
  }

export const jsonToFormData = (json: Record<string, any>) : FormData => {
  const formData = new FormData();
  Object.keys(json).forEach((key) => {
    formData.append(key, json[key]);
  });
  return formData
};  

interface Params {
  [key: string]: string | number;
}

export function replacePlaceholders(url: string, params: Params): string {
  return url.replace(/:([a-zA-Z]+)/g, (_, key) => {
    if (params[key] !== undefined) {
      return String(params[key]);
    }
    throw new Error(`Missing value for URL parameter: ${key}`);
  });
}

export const convertDateToYYYYMMDD = (dateString: string): string => {
  if(Boolean(dateString)){
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
  }
  return dateString
};

export const convertToMMDDYY = (date:string)=>{
  console.log(date)
 return Boolean(date) ?   new Date(date).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  ) : ""
}

export const getPageDetails = (dataLength : number  , perPage : number , currentPage :  number)=>{
  const pageCount =  Math.ceil(Number(dataLength)/ Number(perPage) ) 
  const page =   Number(currentPage) - 1;
  return  {pageCount , page}
}   


export const downloadCSV = (data: string | BlobPart, filename = "transactions.csv") => {
  const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const formatUserName = (name:string)=>{
   return name.startsWith("@") ? name : `@${name}`
}
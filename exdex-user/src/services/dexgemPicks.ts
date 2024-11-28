import exDexApi from "./exdexapi";


export const getDexgemPickFilters = ()=>{
    return exDexApi.get("/project/user/explore/filters")
}
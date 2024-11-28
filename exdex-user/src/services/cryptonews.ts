import api from "./api"

export const getCrtyptoNews = ()=>{
    return api.get('footer/crypto-news')
}

export const getFeaturedCryptoNews = ({page , pageSize} : {page:number , pageSize : number})=>{
    return api.get(`/footer/featured-news?page=${page}&page_size=${pageSize}`)
}


export const getForexNews = ()=>{
    return api.get('footer/forex-news')
}

export const getFeaturedForexNews = ({page , pageSize} : {page:number , pageSize : number})=>{
    return api.get(`/footer/featured-forex-news?page=${page}&page_size=${pageSize}`)
}
import { TabKeys } from "../pages/Trading/AllInOne/ChartsTab/CHartsTab"
import api from "./api"

export const getPopular = (type : TabKeys)=>{
return api.get(`market/popular?market_type=${type}`)
}
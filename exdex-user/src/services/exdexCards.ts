import { CardDataProps } from "../pages/AISignals/TradeCardRows/TradeCardsRow";
import exDexApi from "./exdexapi";

export const getSmartCardInfo = (card: string) => {
  return exDexApi.get(`/card/smart-card-info?filter=${card}`);
};

export const getSmartCardInfoDexGem = (id: any) => {
  return exDexApi.get(`/project/smart-card?category_id=${id}`);
};

export const getTopGainerInfo = (card: string) => {
  return exDexApi.get(`/card/top-gainer?filter=${card}`);
};
export const getTopGainerInfoDexGem = (id: any) => {
  return exDexApi.get(`/project/top-gainers?category_id=${id}`);
};


export const getTopComments = (card: string) => {
  return exDexApi.get(`/trading-view/engaging/comment?cardType=${card}`);
};

export const getWatchlistAi = (card: string) => {
  return exDexApi.get(`/card/watchlist-count?category=${card}`);
};

export const getExchanges = () => {
  return exDexApi.get(`card/exchange?crypto=true`);
};

export const getCards = (query: string) => {
  return exDexApi.get(`card/${query}`);
};

export const addWatchList = (data: CardDataProps) => {
  if (data.watch_list_status === 1) {
    return exDexApi.delete(`card/watchlist/delete/${data.id}`);
  } else {
    return exDexApi.patch(`card/watchlist/add/${data.id}`);
  }
};

export const getTradeView = (tradingViewId: string) => {
  return exDexApi.get(`trading-view/${tradingViewId}`);
};

export interface IActiveCardParams {
  marketType: string;
  coinPair: string;
}

export const getActiveCard = (data: IActiveCardParams) => {
  return exDexApi.get(
    `trading-view/active-card?market=${data.marketType}&pair=${data.coinPair}&count=3`
  );
};

export const getAppreciateDetails = (tradingViewId: string) => {
  let apiUrl = `trading-view/appreciation?trading_view_id=${tradingViewId}`;
  return exDexApi.get(apiUrl);
};

export interface IUpdateRatingParams {
  trading_view_id: number;
  ratings: number;
}

export const updateRatings = (ratingInfo: IUpdateRatingParams) => {
  return exDexApi.post(`trading-view/manage-appreciation`, {
    ...ratingInfo,
    appreciate_type: "ratings",
  });
};

export const updateComments = (apiData: FormData) => {
  return exDexApi.post("/comment", apiData);
};

export const getComments = ({ apiParams, table }: { apiParams: string, table: string }) => {
  let apiUrl = `comment?table=${table}&${apiParams}`;
  return exDexApi.get(apiUrl);
};
export const updateLike = ({
  apiData,
  table_id,
}: {
  apiData: any;
  table_id: any;
}) => {
  return exDexApi.post("/like", {
    ...apiData,
    table_id,
    table: "trading_views",
  });
};

export const getAppreciates = (trade_view_id: number) => {
  return exDexApi.get(
    `trading-view/appreciation?trading_view_id=${trade_view_id}`
  );
};

export interface IUpdateAppreciate {
  appreciate_state: boolean;
  trading_view_id: number;
}

export const updateAppreciation = (apiData: IUpdateAppreciate) => {
  return exDexApi.post(`trading-view/manage-appreciation`, {
    ...apiData,
    appreciate_type: "appreciate",
  });
};

export interface ISimilarMarketProps {
  marketType: string;
  market: string;
  view_id: number;
}

export const getSimilarMarket = ({
  market,
  marketType,
  view_id,
}: ISimilarMarketProps) => {
  let apiUrl = `trading-view/similar?market=${marketType}&view=${market}&view_id=${view_id}&count=2`;
  return exDexApi.get(apiUrl)
};

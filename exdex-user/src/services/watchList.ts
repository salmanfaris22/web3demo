import exDexApi from "./exdexapi";

export const getWatchList = () => {
  return exDexApi.get("/project/watchlist");
};

export const getAiSignalWatchList = (filterString: string) => {
  return exDexApi.get(`/card/explore/watchlist${filterString}`);
};

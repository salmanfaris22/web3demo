export const countryList = [
  { name: "China", value: "China" },
  { name: "Germany", value: "Germany" },
  { name: "Indonesia", value: "Indonesia" },
  { name: "Iran", value: "Iran" },
  { name: "Russia", value: "Russia" },
  { name: "Saudi Arabia", value: "Saudi Arabia" },
  { name: "Spain", value: "Spain" },
  { name: "United Kingdom", value: "United Kingdom" },
];

export const languageList = [
  { name: "Arabic", value: "Arabic" },
  { name: "Chinese", value: "Chinese" },
  { name: "English", value: "English" },
  { name: "German", value: "German" },
  { name: "Indonesian", value: "Indonesian" },
  { name: "Persian", value: "Persian" },
  { name: "Russian", value: "Russian" },
  { name: "Spanish", value: "Spanish" },
];

export const socialList = [
  {
    name: "Instagram",
    value: "Instagram",
  },
  {
    name: "Facebook",
    value: "Facebook",
  },
];

export const affiliateMarketType = [
  {
    label: "Trading Platform ( IB)",
    value: "Trading Platform ( IB)",
  },
  {
    label: "AI insight",
    value: "AI insight",
  },
  {
    label: "Both",
    value: "Both",
  },
];

export const affiliateType = [
  {
    label: "Crypto Influencer (Individual)",
    value: "Crypto Influencer (Individual)",
  },
  {
    label: "Social Influencer (Non-Crypto Community)",
    value: "Social Influencer (Non-Crypto Community)",
  },
  {
    label: "Forex Influencer",
    value: "Forex Influencer",
  },
  {
    label: "Affiliate marketers",
    value: "Affiliate marketers",
  },
];

export const routers = {
  overview:'/overview',
  termsOfService: "/terms-of-service",
  referal: "/affiliate-program-signup",
  affiliateMarketing: "/affiliate-marketing",
  aboutUs: "/about-us",
  referalProgram: "/refferal-program",
  helpCenter: "/help-center",
  QuestionInfo: "/help-center/questions/:id",
  TicketInfo: "/help-center/ticket/:id",
  topGainer: "/dex-gem",
  aiSignalReport: "/ai-signal-report",
  trade: "/",
  academy: "/academy",
  brokerPage: "/ib",
  forex: "/forex",
  signup: "/register",
  createTicket: "/create-ticket",
  tickets: "/tickets",
  ticketDetails: "/tickets/:id",
  participationAgreement: "/participation-agreement",
  aiSignal: "/ai-signal",
  projects: "/dexgem",
  watchlist: "/watchlist",
  projectDetails: "/dexgem/:id/:categoryId",
  aiSignalWatchList : "/ai-signal-watchlist",
  dexGemPicks : "/dexgem-picks/:name/:id",
  blogs : "/blogs",
  announcements : "/announcements",
  blogDetails : "/blogs/:id",
  announceDetails : "/announcements/:id"

};


export const bookMarkRoutes  = {
  [routers.aiSignal] : routers.aiSignalWatchList,
  [routers.projects] : routers.watchlist,
}

export enum TicketTypes {
  SignalCard = "Signal cards",
  Metamask = "Metamask",
  Affiliate = "Affiliate",
  BinanceSmarkChain = "Binance Smart Chain",
  TenCoins = "10x coins",
  DepositAndWithDraw = "Deposit and Withdraw",
  Swap = "Swap",
  Settings = "Settings",
}

export type TTicketTypes = `${TicketTypes}`;

export enum TicketHelpTypes {
  Refund = "Refund",
  TenXNFT = "TenX NFT",
  Charts = "Charts",
  TenXCommunity = "10x Community",
  SecurityPrivacy = "Security & Privacy",
  InfluencerMarketing = "Influencer Marketing",
  AffiliateStrategy = "Affiliate Strategy",
  VIPCommission = "VIP Commission",
}

export type TTicketHelpTypes = `${TicketHelpTypes}`;

export const CardNames = {
  primary: "Primary Section",
  popular: "Popular Section",
  somrthingElse: "Looking for Something Else",
};

export const halfSlierConfig = {
  centeredSlidesBounds: true,
  spaceBetween: 18, // Adjust the space between slides
  slidesPerView: 1.4, // Shows one full slide and part of the next
  centeredSlides: true,
};

export const categoryArray = [
  { name: "Data", value: "Data" },
  { name: "Billing", value: "Billing" },
  { name: "Signal Cards", value: "Signal Cards" },
  { name: "Billing", value: "Billing" },
  { name: "Data", value: "Data" },
  { name: "Data", value: "Data" },
  { name: "Signal Cards", value: "Signal Cards" },
  { name: "Inactive", value: "Inactive" },
  { name: "Billing", value: "Billing" },
];

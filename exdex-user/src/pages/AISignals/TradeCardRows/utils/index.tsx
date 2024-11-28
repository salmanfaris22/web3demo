
import { TradingSettings } from "../../../../store/context/filterContext";
import { CardDataProps } from "../TradeCardsRow";

export const SplitTime = (numberOfHours: any) => {
    var hours;
    let numOfHour = Number(numberOfHours);
    if (numOfHour > 24) {
      var Days = Math.floor(numOfHour / 24);
      hours =
        Math.trunc(Days) == 1
          ? Math.trunc(Days) + " " + "Day"
          : Math.trunc(Days) + " " + "Days";
    }
    if (numOfHour > 168) {
      var Days = Math.floor(numOfHour / 168);
      hours =
        Math.trunc(Days) == 1
          ? Math.trunc(Days) + " " + "Week"
          : Math.trunc(Days) + " " + "Weeks";
    }
    if (numOfHour < 24 && numOfHour > 1) {
      hours =
        Math.trunc(numOfHour) <= 1
          ? Math.trunc(numOfHour) + " " + "Hour"
          : Math.trunc(numOfHour) + " " + "Hours";
    }
    //  if(numOfHour>0.5 && numOfHour<1){
    //    hours= 1 +' '+'Hours';
    //  }
    if (numOfHour < 1) {
      hours = 1 + " " + "Hour";
    }
    return hours;
  };

  export const getTimeZone = (
    createdDate: any,
    targetHittedTime: any,
    hitAnyTime?: any
  ) => {
    let selectedDate: any = "";
    if (targetHittedTime !== null) {
      selectedDate = targetHittedTime;
      // this.hideHrs = false;
      // console.log('Final target hitted')
    } else if (hitAnyTime !== null) {
      selectedDate = hitAnyTime;
      // this.hideHrs = false;
      // console.log('Any target hitted')
    } else {
      // this.hideHrs = true
      // console.log('No target hitted')
      return 0;
    }
    const timestamp1 = Date.parse(selectedDate); // 1659028800000
    const timestamp2 = Date.parse(createdDate); // 1658942400000
    // if ( timestamp1 <= timestamp2)  {
    // // this.hideHrs = true
    // return this.SplitTime(0);
    // }
    const timeDifference = timestamp1 - timestamp2; // 86400000 (24 hours in milliseconds
    const hours = timeDifference / (1000 * 60 * 60);
    const getTime = SplitTime(hours.toFixed(2));
    return getTime;
  };

  export const convertToLocalTime = (utcTime: string) => {
    // UTC date and time   "2023-05-26T13:08:56Z"
    const utcDate = new Date(utcTime);
    // Get user's current timezone dynamically
    const targetTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Convert to target timezone
    const localDate = utcDate.toLocaleString("en-US", {
      timeZone: targetTimezone,
      year: "numeric",
      month: "short", // "Sep"
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    // console.log('utcTime =',utcTime, 'localDate',localDate); // Output: Dynamically converted date and time based on the user's timezone

    return localDate; // Output: Dynamically converted date and time based on the user's timezone
  };



 export  const convertPrice = (price: number) =>
    price.toLocaleString(undefined, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 18,
    });

export const getQString = (settings:TradingSettings , selectedTab : {smartCardId : string}  , tabStyles: Record<string , {smartCardId : string}>)=>{
    let queryString = `?page=${settings.currentPage}&per_page=${settings.itemsPerPage}&card_type=${settings.card_type}`;
    if (
      settings.activatedPair &&
      selectedTab.smartCardId === tabStyles.spotMarket.smartCardId
    ) {
      queryString += `&quote=${settings.activatedPair}`;
    }
    if (settings.exchange) {
      queryString += `&exchange=${settings.exchange}`;
    }
    if (settings.timeframe) {
      queryString += `&time_frame=${settings.timeframe}`;
    }
    if (settings.riskType) {
      queryString += `&risk_status=${settings.riskType}`;
    }
    if(settings.search){
      queryString += `&market_query=${settings.search}` 
    }
    if (
      settings.position &&
      selectedTab.smartCardId !== tabStyles.spotMarket.smartCardId
    ) {
      queryString += `&position=${settings.position}`;
    }
    return queryString
}


export const getTabUrlQ  = (tab : string)=>tab.replace(/\s+/g, "-").toLowerCase()
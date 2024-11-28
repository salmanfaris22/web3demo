import { IMAGE_URL, TENX_IMAGE_URL } from "../config";

export const scrollToElementWithMargin = (
  elementId: string,
  behavior = "smooth"
) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      //@ts-ignore
      behavior,
    });
  }
};

export const goToIdPage = (url: string, value: string, idKey = ":id") => {
  return url.replace(idKey, value);
};

export const getPageDetails = (
  dataLength: number,
  perPage: number,
  currentPage: number
) => {
  const pageCount = Math.ceil(Number(dataLength) / Number(perPage));
  const page = Number(currentPage) - 1;
  return { pageCount, page };
};

export const formatRadioOptions = (
  options = [],
  labelKey: string,
  valueKey: string
) => {
  return (
    options.map((x: any) => {
      return {
        ...x,
        label: x[labelKey],
        value: x[valueKey],
      };
    }) || []
  );
};

export function calculateTimeAgo(date: string) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (seconds < 30) return "Just now";

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const unit in intervals) {
    //@ts-ignore
    const intervalSeconds = intervals[unit];
    const counter = Math.floor(seconds / intervalSeconds);

    if (counter > 0) {
      return counter + " " + unit + (counter === 1 ? "" : "s") + " ago";
    }
  }

  return ""; // Fallback in case no match is found
}

export const getImageWithBaseUrl = (url = "") => {
  return (IMAGE_URL as string) + (url.startsWith("/") ? url : `/${url}`);
};
export const getTenxImageWithBaseUrl = (url = "") => {
  return (TENX_IMAGE_URL as string) + (url.startsWith("/") ? url : `/${url}`);
};
export const splitArrayIntoCustomPattern = (data: any[]) => {
  const result = [];
  let currentIndex = 0;

  while (currentIndex < data.length) {
    const group1 = [];

    // Add first object
    if (currentIndex < data.length) {
      group1.push(data[currentIndex]);
      currentIndex++;
    }

    // Add second object
    if (currentIndex < data.length) {
      group1.push(data[currentIndex]);
      currentIndex++;
    }

    // Add an array of 6 objects
    if (currentIndex < data.length) {
      const innerArray = data.slice(currentIndex, currentIndex + 6);
      group1.push(innerArray);
      currentIndex += 6;
    }

    // Add the 9th object
    if (currentIndex < data.length) {
      group1.push(data[currentIndex]);
      currentIndex++;
    }

    result.push(group1);

    // Handle the second group
    const group2 = [];

    // Add an array of 3 objects
    if (currentIndex < data.length) {
      const innerArray = data.slice(currentIndex, currentIndex + 3);
      group2.push(innerArray);
      currentIndex += 3;
    }

    // Add remaining objects individually
    while (currentIndex < data.length && group2.length < 4) {
      group2.push(data[currentIndex]);
      currentIndex++;
    }

    result.push(group2);
  }

  return result;
};

export const shareToSocial = (type: "fb" | "x" | "telegram" | "vk" | "weibo" | "reddit", appUrl: string) => {
  switch (type) {
    case "fb":
      const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}`;
      window.open(facebookShareUrl, "_blank", "width=600,height=400");
      break;

    case "x":
      const xShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(appUrl)}`;
      window.open(xShareUrl, "_blank", "width=600,height=400");
      break;

    case "telegram":
      const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(appUrl)}`;
      window.open(telegramShareUrl, "_blank", "width=600,height=400");
      break;

    case "vk":
      const vkShareUrl = `https://vk.com/share.php?url=${encodeURIComponent(appUrl)}`;
      window.open(vkShareUrl, "_blank", "width=600,height=400");
      break;

    case "weibo":
      const weiboShareUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(appUrl)}`;
      window.open(weiboShareUrl, "_blank", "width=600,height=400");
      break;

      case "reddit":
        const redditShareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(appUrl)}&title=${encodeURIComponent("Your title here")}`;
        window.open(redditShareUrl, "_blank", "width=600,height=400");
        break;
  

    default:
      console.error("Unsupported social platform type");
      break;
  }
};

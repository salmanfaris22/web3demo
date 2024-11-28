import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToElementWithMargin } from "../../../utils/commonutils";
import { HEADER } from "../../Layout/Header/Header";

const ScrollToHeader = () => {
  const location = useLocation();

  useEffect(() => {
    scrollToElementWithMargin(HEADER, "instant");
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export default ScrollToHeader;

import { useNavigate } from "react-router-dom";
import Navigate from "../../Components/Navigate/Navigate";
import PageAnimation from "../../Components/PageAnimation/PageAnimation";
import { routers } from "../../Constants";
import classes from "./Footer.module.scss";
import LanguageSelector from "./LanguageSelector/LanguageSelector";
import NewsInsights from "./NewsInsights/NewsInsights";
import ProductService from "./ProductService/ProductService";
import SignupBar from "./SignupBar/SignupBar";
import FooterContent from "./FooterContent/FooterContent";

const linksArray = [
  { name: "Regulations", href: "/terms-of-service#regulations" },
  {
    name: "Legal documents",
    href: "terms-of-service?section=legal-and-regulatory",
  },
  { name: "Privacy policy", href: "/terms-of-service?section=privacy-policy" },
  { name: "About Us", href: "/about-us" },
  {
    name: "Risk disclosure",
    href: "/terms-of-service?section=risk-disclosure",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const nav = useNavigate();

  return (
    <PageAnimation>
      <footer className={classes.footer}>
        <div className={classes.footerWrap}>
          <div className={classes.footerFirst}>
            <div
              className={`cursor ${classes.footerLogo}`}
              onClick={() => {
                nav(routers.trade);
              }}
            >
              {/* <img src="/assets/images/footer/logo.png"/> */}
            </div>
            <div className={classes.footerSignup}>
              <SignupBar />
              <LanguageSelector />
            </div>
          </div>
          <ProductService />
          <NewsInsights />

          <div className={`${classes.coyRights} ${classes.topLinks}`}>
            {linksArray.map((l) => {
              return (
                <span
                  key={l.name}
                  onClick={() => {
                    l.href ? nav(l.href) : console.log("");
                  }}
                >
                  {l.name}
                </span>
              );
            })}
          </div>

          <FooterContent />
          <div className={classes.coyRights}>
            <span>©️ {year} exdex.com. All rights reserved.</span>
            {/* !add actual links later */}
            <div className={classes.copyRightsLogo}>
              <img src="/assets/images/copyrightslogo.png" alt="copyrights" />
            </div>
            <div className={classes.termPrivacy}>
              <span>
                <Navigate to={'/terms-of-service?section=terms'}>
                  Terms of Service | 
                </Navigate>
              </span>
              <span>
                <Navigate to={'/terms-of-service?section=privacy-policy'}> Privacy Terms</Navigate>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </PageAnimation>
  );
};

export default Footer;

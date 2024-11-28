import { useNavigate } from "react-router-dom";
import { routers } from "../../../Constants";
import FooterNavLink from "../FooterNavLink/NavLink";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./NewsInsights.module.scss";

const footerLinks = [
  {
    name: "Forex News",
    to: routers.forex,
  },
  {
    name: "Crypto News",
    to: "/crypto-news",
  },
  {
    name: "DexGEM Reports",
    to: "",
    disabled: true,
  },
  {
    name: "Blog",
    to: routers.blogs,
  },
  {
    name: "Announcement",
    to: routers.announcements,
    disabled: false,
  },
  {
    name: "AI Signal Reports",
    to: "",
    disabled: true,
  },
  {
    name: "Live chat",
    to: "",
    disabled: true,
    hideMobile: true,
  },
  {
    name: "Help Center",
    to: routers.helpCenter,
  },
  {
    name: "Auto Trade Reports",
    to: "",
    disabled: true,
  },
];

const socialLinks = [
  {
    img: "/assets/images/social/pint.png",
    alt: "Instagram",
    link: "https://www.instagram.com/exdexglobal/",
  },
  {
    img: "/assets/images/social/insta.png",
    alt: "Pinterest",
    link: "https://www.pinterest.com/exdexglobal/",
  },
  {
    img: "/assets/images/social/twitter.png",
    alt: "Twitter",
    link: "https://x.com/exdexglobal",
  },
  {
    img: "/assets/images/social/youtube.png",
    alt: "YouTube",
    link: "https://www.youtube.com/@exdexglobal",
  },
  {
    img: "/assets/images/social/fb.png",
    alt: "Facebook",
    link: "https://www.facebook.com/people/ExDex/61566353865636/",
  },
  // {
  //   img: "/assets/images/social/linkedin.png",
  //   alt: "LinkedIn",
  // },
  // {
  //   img: "/assets/images/social/tele.png",
  //   alt: "Telegram",
  // },
  {
    img: "/assets/images/social/reddit.png",
    alt: "Reddit",
    link: "https://www.reddit.com/user/exdexglobal/",
  },
  {
    img: "/assets/images/social/tiktok.png",
    alt: "TikTok",
    link: "https://www.tiktok.com/@exdexglobal",
  },
  {
    img: "/assets/images/social/discord.png",
    alt: "Discord",
    link: "https://discord.com/invite/CHwDjVRM",
  },
];

const NewsInsights = () => {
  const navigate = useNavigate();

  const redirectUrl = (url: any) => {
    window.open(url, "_blank");
  };

  return (
    <div>
      <SectionTitle title="New and Insights" />
      <div className={styles.container}>
        <div className={styles.sections}>
          {footerLinks.map(({ name, to, disabled, hideMobile }, index) => (
            <div
              className={`${styles.navContainer} ${
                disabled && "disabledLink"
              } ${hideMobile && styles.hideMobile}`}
              key={index}
            >
              {" "}
              <FooterNavLink type="dark" to={to} disabled={disabled}>
                {name}
              </FooterNavLink>{" "}
            </div>
          ))}
        </div>
        <div className={styles.sections}>
          <div className={styles.socialLinks}>
            <div className={styles.socialTitle}>
              <SectionTitle title="Community" />
            </div>
            {socialLinks.map(({ img, alt, link }) => (
              <img
                className="social"
                key={alt}
                alt={alt}
                src={img}
                onClick={() => {
                  redirectUrl(link);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsInsights;

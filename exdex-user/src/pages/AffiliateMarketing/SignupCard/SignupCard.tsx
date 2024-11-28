import React from "react";
import styles from "./SignupCard.module.scss";
import Button from "../../../common/Components/Button/Button";
import { useNavigate } from "react-router-dom";
import { routers } from "../../../common/Constants";


const SignupCard = () => {

  const nav = useNavigate();

  const hasFilled =JSON.parse(sessionStorage.getItem("form_submitted") as string);

  return (
    <div className={styles.container}>
      <h2>Join Exdex affiliate program &<br></br> enjoy passive income !</h2>
      <p>
        Are you an influencer or affiliate marketer in the finance and tech
        space? Partner with Exdex.com and promote a cutting-edge trading
        platform that empowers users worldwide.
      </p>
      <p>
        As an Exdex affiliate, you’ll enjoy competitive commissions, transparent
        tracking, and dedicated support. Our innovative platform, featuring
        AI-driven insights and automated trading, offers your audience a unique
        opportunity to succeed in the financial markets.
      </p>
      <p>
        Maximize your earnings while growing your brand. Sign up today at
        Exdex.com and start earning with us!
      </p>
      <div className={styles.signupArea}>
        <div className={styles.bigText}>
        I'm In
        </div>
        <Button onClick={()=>{
          nav(hasFilled ? routers.overview :  routers.referal)
        }}>Sign up now </Button>
      </div>
    </div>
  );
};

export default SignupCard;

import React from "react";
import styles from "./VideoIntro.module.scss";
import Video from "../../../common/Components/Video/Video";
import ActionBtn from "../../Dashboard/ActionBtn/ActionBtn";
import {motion} from "framer-motion"
import { useSelector } from "react-redux";
import { selectToken } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { routers } from "../../../common/Constants";
const VideoIntro = () => {
  const token =  useSelector(selectToken);
  const url  = token ? routers.trade : routers.signup;
  const btnLabel = token? "Home" : "Get Started";
  const nav = useNavigate()

  return (
    <motion.div
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    animate="once"
    viewport={{ once: true }}
    transition={{
      ease: "easeIn",
      duration: 0.4,
      delay: 0.1,
    }}
    className={styles.container}>
      <div className={styles.videoContainer}>
        <div className={styles.videoInfo}>
          <h1>Earn Multiple Commissions with a Single Referral Link !</h1>
          <ActionBtn
             onClick={() => {
              nav(url);
            }}
          >{btnLabel}</ActionBtn>
        </div>
        <div className={styles.video}>
          <div className={styles.videoOuter}>
            <div className={styles.videoWrapper}>
              <Video videoClass={styles.videoPlayer} poster="/assets/images/remove/videoPoster.png" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoIntro;

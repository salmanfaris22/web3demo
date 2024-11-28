import { useNavigate } from "react-router-dom";
import Button from "../../../common/Components/Button/Button";
import { getblogHeadId } from "../../../common/Components/HTMLParser/HTMLParser";
import { scrollToElementWithMargin } from "../../../utils/commonutils";
import styles from "./ContactCard.module.scss";
import { useSelector } from "react-redux";
import { selectToken } from "../../../store/authSlice";
import { routers } from "../../../common/Constants";

function ContactCard({ heading , count }: { heading: string[] , count : number }) {

    const nav = useNavigate()
    const token = useSelector(selectToken);

   

  return (
    <div className={styles.container}>
      <div>
        <img src="/assets/images/blog/user.png" alt="User" />
      </div>
      <div className={styles.usersCount}>
        {count} users chose us.<br></br>
        Find out why today.
      </div>
      <div className={styles.registerNow}>
        <Button
         onClick={()=>{
            nav(token ? routers.trade : routers.signup)
         }}
        theme="neon">{token ? "Home" : "Register Now"}</Button>
      </div>
      <div className={styles.headings}>
        {heading.map((h, i) => {
          return (
            <div className={styles.heading} key={h}>
              <div
                className={styles.content}
                onClick={() => {
                  scrollToElementWithMargin(getblogHeadId(i));
                }}
              >
                {h}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ContactCard;

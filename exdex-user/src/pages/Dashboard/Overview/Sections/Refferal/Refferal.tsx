import { useEffect, useState } from "react";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import classes from "./Refferal.module.scss";
import { getReferralHistory } from "../../../../../services/overview";
import { convertISOToLongDateFormat } from "../../../../../utils/date";
import { getFirstLetter } from "../../../../../utils/name";
import { formatCurrency } from "../../../../../utils/currencyFormatter";

const Refferal = () => {

  const [data, setData] = useState([]);
  //loading
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    getHistoryMethod();
  }, []);

  const getHistoryMethod = async () => {
    try {
      let data: any = {
        type: "all",
        search: "",
      };
      setFetching(true);
      setData([]);
      const response = await getReferralHistory(data);
      if (response.status) {
        if (response.data) {
          setData(response.data);
        } else {
          setData([]);
        }
      }
    } catch (err) {
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  return (
    <div className={classes.visitWrap}>
      <OverviewCard type="fullHeight">
        <div className={classes.refferalInner}>
          <div className={classes.top}>
            <div className={classes.head}>Referrals</div>
            <div className={classes.refferalList}>
              {data.map((item: any, index) => (
                <div className={classes.refferalItem} key={index}>
                  <div className={classes.profileDetails}>
                    <div className={classes.profilePic}>
                      {item.image ? (
                        <img src={item.image} />
                      ) : (
                        <span>{getFirstLetter(item.user_name)}</span>
                      )}
                    </div>
                    <div className={classes.details}>
                      <div className={classes.name}>{item.user_name}</div>
                      <div className={classes.des}>
                        {convertISOToLongDateFormat(item.joining_date)}
                      </div>
                    </div>
                  </div>
                  <div className={classes.commission}>
                    <div className={classes.name}>
                      {formatCurrency(item.total_amount_usd,'en-US','USD')}
                    </div>
                    <div className={classes.des}>{item.referral_type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </OverviewCard>
    </div>
  );
};
export default Refferal;

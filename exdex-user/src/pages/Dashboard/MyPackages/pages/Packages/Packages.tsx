import { useEffect, useState } from "react";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import classes from "./Packages.module.scss";
import Loading from "../../../../../common/UI/Loading/Loading";
import NoData from "../../../../../common/Components/NoData/NoData";
import { getPurchasedPlans } from "../../../../../services/plan";
import { formatCurrency } from "../../../../../utils/currencyFormatter";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPlansMethod();
  }, []);

  const redirect = (url: string) => {
    navigate(url);
  };

  const getPlansMethod = async () => {
    setLoading(true);
    try {
      const response = await getPurchasedPlans();
      if (response.status) {
        if (response.data) {
          setPlans(response.data);
        }
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageAnimation>
      {loading && <Loading />}
      {!loading && !plans.length && (
        <PageAnimation>
          <NoData title="No Data" description="" />
        </PageAnimation>
      )}
      {plans && plans.length > 0 && (
        <PageAnimation>
          <div className={classes.packageOuter}>
            <div className={classes.packageCards}>
              {plans.map((item: any) => (
                <div
                  className={`${classes.packageCard} ${
                    item.percentage_passed >= 100 ? classes.full : ""
                  }`}
                  key={item.id}
                >
                  <div
                    className={classes.nft}
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                  <div className={classes.name}>{item.collection}</div>
                  <div className={classes.packageDetails}>
                    <div className={classes.packageItem}>
                      <div className={classes.label}>Participation:</div>
                      <div className={classes.val}>
                        {formatCurrency(
                          item.total_amount_usd,
                          "en-US",
                          "USD"
                        )}
                      </div>
                    </div>
                    <div className={classes.packageItem}>
                      <div className={classes.label}>Company fee:</div>
                      <div className={classes.val}>35%</div>
                    </div>
                  </div>
                  <div
                    className={classes.btn}
                    onClick={() => {
                      redirect(`/package/detail/${item.id}`);
                    }}
                  >
                    View
                  </div>
                  <div className={classes.progress}>
                    <div className={classes.progressText}>In Progress</div>
                    <div className={classes.percent}>
                      {formatCurrency(item.percentage_passed)}%
                    </div>
                    <div className={classes.progressOuter}>
                      <div
                        className={classes.progressInner}
                        style={{ width: `${item.percentage_passed}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
              <div className={`${classes.packageCard} ${classes.dummy}`}></div>
              <div className={`${classes.packageCard} ${classes.dummy}`}></div>
              <div className={`${classes.packageCard} ${classes.dummy}`}></div>
            </div>
          </div>
        </PageAnimation>
      )}
    </PageAnimation>
  );
};

export default Packages;

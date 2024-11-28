import { useEffect, useState } from "react";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import classes from "./Marketing.module.scss";
import { getMarketing } from "../../../../../services/overview";
import { IMAGE_URL } from "../../../../../config";
import MarketingCard from "../../components/MarketingCard/MarketingCard";

const Marketing = () => {
  //loading
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getMarketingMethod();
  }, []);

  const getMarketingMethod = async () => {
    try {
      const response = await getMarketing();
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
    }
  };

  return (
    <>
      {!loading && (
        <PageAnimation>
          <div className={classes.binaryWrap}>
            <OverviewCard type="fullHeight">
              <div className={classes.binaryInner}>
                <div className={classes.head}>Marketing kit</div>
                <div className={classes.marketingWrap}>
                  {data.map((item: any, index: number) => (
                    <div className={classes.marketingItem} key={index}>
                      <MarketingCard
                        title={item.title}
                        image={IMAGE_URL + item.image_url}
                      />
                    </div>
                  ))}
                  <div className={classes.marketingItem}></div>
                  <div className={classes.marketingItem}></div>
                  <div className={classes.marketingItem}></div>
                </div>
              </div>
            </OverviewCard>
          </div>
        </PageAnimation>
      )}
      ;
    </>
  );
};

export default Marketing;

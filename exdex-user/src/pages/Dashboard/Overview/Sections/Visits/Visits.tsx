import classes from "./Visits.module.scss";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import WorldMap from "../../../../../common/Components/Map/Map";
import { useEffect, useState } from "react";
import {
  fetchLocation,
  fetchVisitByCountry,
} from "../../../../../services/map";
import { formatCurrency } from "../../../../../utils/currencyFormatter";

const Visits = () => {
  const [rentedGPUs, setRentedGPUs] = useState<any>([]);
  const [stats, setStats] = useState<any>([]);

  useEffect(() => {
    fetchLocationMethod();
    fetchVisitByCountryMethod();
  }, []);

  const fetchLocationMethod = async () => {
    try {
      const response = await fetchLocation('affiliate');
      if (response.status) {
        if (response.data.latitude_longitude) {
          setRentedGPUs(response.data.latitude_longitude);
        }
      }
    } catch (err) {
    } finally {
    }
  };

  const fetchVisitByCountryMethod = async () => {
    try {
      const response = await fetchVisitByCountry();
      if (response.status) {
        if (response.status) {
          if (response.data.visits_by_location) {
            setStats(response.data.visits_by_location);
          }
        }
      }
    } catch (err) {
    } finally {
    }
  };

  return (
    <div className={classes.visitWrap}>
      <OverviewCard type="fullHeight">
        <div className={classes.visitInner}>
          <div className={classes.head}>Visits by location</div>
          <div className={classes.map}>
            <WorldMap rentedGPUs={rentedGPUs} zoom={1} />
          </div>
          <div className={classes.stats}>
            {stats.map((item: any) => (
              <div className={classes.statItem} key={item.country}>
                <div className={classes.name}>{item.country}</div>
                <div className={classes.statDetails}>
                  <div className={classes.statCount}>{item.count}</div>
                  <div
                    className={`${classes.statPercentIcon} ${
                      item.change_direction == "up" && classes.statPercentIconUp
                    }`}
                  >
                    <img
                      src={`/assets/images/${
                        item.change_direction == "up"
                          ? "upArrow.png"
                          : "downArrow.png"
                      }`}
                    />
                  </div>
                  <div className={classes.statPercent}>
                    {formatCurrency(item.percentage_change)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </OverviewCard>
    </div>
  );
};

export default Visits;

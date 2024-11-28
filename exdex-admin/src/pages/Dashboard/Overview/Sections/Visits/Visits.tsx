import classes from "./Visits.module.scss";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import WorldMap from "../../../../../common/Components/Map/Map";
import { useEffect, useState } from "react";
import {
  fetchLocation,
  fetchVisitByCountry,
  fetchVisitSummary,
} from "../../../../../services/map";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import { formatCurrency } from "../../../../../utils/currencyFormatter";

const Visits = () => {
  const [rentedGPUs, setRentedGPUs] = useState<any>([]);
  const [zoom, setZoom] = useState(1);
  const [stats, setStats] = useState<any>([]);
  const [statsSummary, setSummaryStats] = useState<any>({
    total_team_size: 0,
    total_countries: 0,
    total_online: 0,
  });

  useEffect(() => {
    fetchLocationMethod();
    fetchVisitByCountryMethod();
    fetchSummaryMethod();
  }, []);

  const handleZoomIn = () => {
    if (zoom >= 4) return;
    setZoom((prevZoom) => prevZoom * 2);
  };

  const handleZoomOut = () => {
    if (zoom <= 1) return;
    setZoom((prevZoom) => prevZoom / 2);
  };

  const fetchLocationMethod = async () => {
    try {
      const response = await fetchLocation();
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

  const fetchSummaryMethod = async () => {
    try {
      const response = await fetchVisitSummary();
      if (response.status) {
        if (response.status) {
          setSummaryStats(response.data);
        }
      }
    } catch (err) {
    } finally {
    }
  };

  return (
    <PageAnimation>
      <div className={classes.visitWrap}>
        <OverviewCard type="fullHeight">
          <div className={classes.visitInner}>
            <div className={classes.head}>
              LIVE VIEW
              <div className={classes.zoomOptions}>
                <div className={classes.zoomBtn} onClick={handleZoomOut}>
                  <img src="/assets/images/zoomOut.png" alt="zoom" />
                </div>
                <div className={classes.zoomBtn} onClick={handleZoomIn}>
                  <img src="/assets/images/zoomIn.png" alt="zoom" />
                </div>
              </div>
            </div>
            <div className={classes.bodyWrap}>
              <div className={classes.insights}>
                <div className={classes.overviewItem}>
                  <div className={classes.overviewHead}>Total User</div>
                  <div className={classes.overviewVal}>
                    {formatCurrency(statsSummary.total_team_size)}
                  </div>
                </div>
                <div className={classes.overviewItem}>
                  <div className={classes.overviewHead}>Total Countries</div>
                  <div className={classes.overviewVal}>
                    {" "}
                    {formatCurrency(statsSummary.total_countries)}
                  </div>
                </div>
                <div className={classes.overviewItem}>
                  <div className={classes.overviewHead}>Total Live</div>
                  <div className={classes.overviewVal}>
                    {formatCurrency(statsSummary.total_online)}
                  </div>
                </div>
              </div>
              <div className={classes.map}>
                <WorldMap
                  rentedGPUs={rentedGPUs}
                  zoom={zoom}
                  mapColor={"rgba(255,255,255,1)"}
                />
              </div>
              <div className={classes.mapOpt}>
                <div className={classes.opt}>
                  <img src="/assets/images/eye.png" alt="eye" />
                  Visit
                </div>
                <div className={classes.opt}>
                  <img src="/assets/images/graph.png" alt="graph" />
                  Sale
                </div>
              </div>
            </div>
          </div>
        </OverviewCard>
      </div>
    </PageAnimation>
  );
};

export default Visits;

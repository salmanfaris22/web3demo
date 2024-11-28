import React, { useEffect, useState } from "react";
import classes from "./PackageDetails.module.scss";
import Button from "../../../../../common/Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../../../../store/authSlice";
import { getPurchasedPlanDetails } from "../../../../../services/plan";
import { hideToastById, showToast } from "../../../../../store/toastSlice";
import { API_URL } from "../../../../../config";
import { formatCurrency } from "../../../../../utils/currencyFormatter";
import { convertISOToCustomFormat } from "../../../../../utils/date";

interface PakcageProps {
  id?: string;
}

const PackageDetails: React.FC<PakcageProps> = ({ id }) => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const [plans, setPlans] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      getPlanDetailsMethod();
    }
  }, [id]);

  const getPlanDetailsMethod = async () => {
    setLoading(true);
    try {
      const response = await getPurchasedPlanDetails(id);
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

  const handleDownload = async () => {
    try {
      dispatch(
        showToast({
          message: "Downlaoding...",
          type: "warning",
          timeout: 25000,
          id: 10,
        })
      );
      const response = await fetch(
        `${API_URL}/user-plans/employment-agreement/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/pdf",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "contract.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        dispatch(hideToastById(10));
      } else {
        console.error("Failed to download invoice");
        dispatch(hideToastById(10));
      }
    } catch (err) {
      dispatch(hideToastById(10));
      console.error("Error:", err);
    } finally {
      dispatch(hideToastById(10));
    }
  };

  return (
    <div className={classes.detailsPackage}>
      <div className={classes.bottomWrap}>
        <div className={classes.bottomLeft}>
          <div className={classes.packageHead}>Package Details</div>
          <div className={classes.packageDetail}>
            <div className={classes.packageItem}>
              <div className={classes.left}>Agreement Number:</div>
              <div className={classes.right}>
                {formatCurrency(plans.roi_income, "en-US", "USD")}(
                {formatCurrency(plans.roi_income_percentage)}%)
              </div>
            </div>
            <div className={classes.packageItem}>
              <div className={classes.left}>ROI Income:</div>
              <div className={classes.right}>
                {formatCurrency(plans.roi_income, "en-US", "USD")}(
                {formatCurrency(plans.roi_income_percentage)}%)
              </div>
            </div>
            <div className={classes.packageItem}>
              <div className={classes.left}>Date Of Participation :</div>
              <div className={classes.right}>
                {convertISOToCustomFormat(plans.date_of_purchase)}
              </div>
            </div>
            <div className={classes.packageItem}>
              <div className={classes.left}>Amount:</div>
              <div className={classes.right}>
                {formatCurrency(plans.amount, "en-US", "USD")}
              </div>
            </div>
            <div className={classes.packageItem}>
              <div className={classes.left}>Duration:</div>
              <div className={classes.right}>
                {plans.duration_in_months} Month
              </div>
            </div>
            <div className={classes.packageItem}>
              <div className={classes.left}>Duration Past:</div>
              <div className={classes.right}>
                {plans.duration_past_days} Days
              </div>
            </div>
            <div className={classes.packageItem}>
              <div className={classes.left}>Duration Remainig:</div>
              <div className={classes.right}>
                {plans.duration_remaining_days} Days
              </div>
            </div>
            {/* <div className={classes.packageItem}>
          <div className={classes.left}>Agreement Number:</div>
          <div className={classes.right}>213 Days</div>
        </div> */}
          </div>
        </div>
        <div className={classes.bottomRight}>
          <div className={classes.contractWrap}>
            <div className={classes.contractImage}></div>
          </div>
          <div className={classes.progressWrap}>
            <div
              className={classes.progressInner}
              style={{ width: `${plans.percentage_passed}%` }}
            >
              {/* Replace with actual logic */}
              <div className={`${classes.progressVal} ${classes.darkPercent}`}>
                {formatCurrency(plans.percentage_passed)}%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.export}>
        <Button onClick={handleDownload}>
          <div className={classes.btnWrap}>
            Export
            <img src="/assets/images/filter/download.png" alt="downlaod" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default PackageDetails;

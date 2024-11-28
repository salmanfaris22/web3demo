import React from "react";
import classes from "./PaymentTag.module.scss";
import { formatCurrency } from "../../../utils/currencyFormatter";
import Button from "../Button/Button";

interface PaymentTagProps {
  data: any;
  index: number;
  buyPackage: () => void;
}

const PaymentTag: React.FC<PaymentTagProps> = ({ data, index, buyPackage }) => {
  return (
    <div className={`${classes.paymentTag}`}>
      <div className={`${classes.paymentTagInner} ${classes["pay" + index]}`}>
        <div className={classes.monthlyWrap}>
          <div className={classes.top}>
            <div className={classes.head}>
              {data.plan_type == "monthly"
                ? "Monthly"
                : data.plan_type == "yearly"
                ? "Yearly"
                : "Life Time"}
            </div>
            <div className={classes.subhead}>Subscription</div>
          </div>
          <div className={classes.priceDis}>
            <div className={classes.price}>
              {formatCurrency(data.price, "en-US", "USD", 12000)}
            </div>
            <div className={classes.dis}>
              {formatCurrency(data.offer_price, "en-US", "USD", 12000)}
            </div>
          </div>
          <div className={classes.disDet}>{data.discount}% DISCOUNT</div>
          <div className={classes.payNow}>
            <Button type="full" onClick={buyPackage} disabled={data.loading}>
              <div className={classes.btnInner}>
                {data.loading ? "Processing" : "Pay Now"}
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTag;

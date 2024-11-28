import React from "react";
import classes from "./PriceDiscount.module.scss";

interface PriceDiscountProps {
  price: string;
  unit: string;
  discount?: string;
}

const PriceDiscount: React.FC<PriceDiscountProps> = ({
  price,
  unit,
  discount,
}) => {
  return (
    <div className={classes.priceDisWrap}>
      <div className={classes.price}>
        {unit}{price}
      </div>
      {discount && (
        <div className={classes.discount}>
          {unit}{discount}
        </div>
      )}
    </div>
  );
};

export default PriceDiscount;

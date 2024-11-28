import React from "react";
import classes from "./CheckoutCard.module.scss";
import PriceDiscount from "../../../../../common/Components/PriceDiscout/PriceDiscount";
import { IMAGE_URL } from "../../../../../config";

interface CheckoutCardProps {
  details: any;
  saveForLater?: boolean;
  removeItem: (val: any) => void;
}

const CheckoutCard: React.FC<CheckoutCardProps> = ({
  details,
  removeItem,
  saveForLater,
}) => {
  return (
    <div className={classes.card}>
      <div
        className={classes.image}
        style={{
          backgroundImage: `url(${IMAGE_URL + "/" + details.logo})`,
        }}
      >
        {details.type == "NFT" && (
          <div className={classes.tag}>
            <img src="/assets/images/tag.png" alt="tag" />
            <div className={classes.tagName}>TR</div>
          </div>
        )}
      </div>
      <div className={classes.details}>
        <div className={classes.detailsItem}>
          <div className={classes.name}>
            {details.name}
            <div
              className={`${classes.save} ${classes.mobShow}`}
              onClick={() => {
                removeItem(details);
              }}
            >
              <img src="/assets/images/save.png" alt="save" />
            </div>
            {details.type != "Auto Trade" && (
              <div
                className={classes.close}
                onClick={() => {
                  removeItem(details);
                }}
              >
                <img src="/assets/images/close.png" alt="close" />
              </div>
            )}
          </div>
          <div className={classes.discount}>
            <div className={classes.priceWrap}>
              <PriceDiscount
                price={details.price}
                discount={
                  details.offer_price != details.price
                    ? details.offer_price
                    : ""
                }
                unit={details.unit ? details.unit : "$"}
              />
            </div>
            <div className={classes.disPercent}>
              {details.offer_percentage ? details.offer_percentage : ""}{" "}
              {details.offer_percentage ? "% Off" : ""}
            </div>
          </div>
          <div className={classes.hightlight}>
            <div className={classes.high}>
              <img src="/assets/images/check.png" alt="check" />
              <div title={details.description} className={classes.highText}>
                {details.description}
              </div>
            </div>
            {/* <div
              className={`${classes.save} ${classes.mobHide}`}
              onClick={() => {
                removeItem(details);
              }}
            >
              {saveForLater ? 'Buy Now' : 'Save for Later'}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;

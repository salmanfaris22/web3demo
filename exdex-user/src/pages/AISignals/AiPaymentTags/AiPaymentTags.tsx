import classes from "./AiPayment.module.scss";
import { buyAiDexPackage, listAiPackages } from "../../../services/payment";
import { useEffect, useState } from "react";
import PaymentTag from "../../../common/Components/PaymentTag/PaymentTag";
import PageAnimation from "../../../common/Components/PageAnimation/PageAnimation";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/toastSlice";
import { useNavigate } from "react-router-dom";

const AiPaymentTags = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentCards, setPaymentCards] = useState<any>([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  const goTo = (url: string) => {
    navigate(url);
  };

  const fetchPackages = async () => {
    try {
      const response = await listAiPackages();
      if (response.status) {
        setPaymentCards(response.data);
      }
    } catch (err) {
      // setError(err);
    } finally {
    }
  };

  const buyPackage = async (item: any) => {
    let packages = [...paymentCards];
    packages.forEach((pack) => {
      if (pack.ID == item.ID) {
        pack.loading = true;
      }
    });
    setPaymentCards(packages);
    try {
      const data = {
        dex_gem: false,
        ai_signal: true,
        ai_signal_plan_type: item.plan_type,
        dex_gem_plan_type: "",
      };
      const response = await buyAiDexPackage(data);
      if (response.status) {
        goTo(`/checkout/autotrade/${response.data.user_plan_id}`);
      }
    } catch (err: any) {
      try {
        if (err.response.data.error) {
          dispatch(
            showToast({
              message: err.response.data.error,
              type: "error",
              timeout: 5000,
            })
          );
        }
      } catch (e) {
        console.log(e);
      }
    } finally {
      let packages = [...paymentCards];
      packages.forEach((pack) => {
        if (pack.ID == item.ID) {
          pack.loading = false;
        }
      });
      setPaymentCards(packages);
    }
  };

  return (
    <PageAnimation>
      <div className={classes.paymentWrap}>
        <div className={classes.planTitle}>Choose a Plan</div>
        <div className={classes.paymentInnerWrap}>
          {paymentCards.map((item: any, index: number) => (
            <PaymentTag
              key={index}
              data={item}
              index={index}
              buyPackage={() => {
                buyPackage(item);
              }}
            ></PaymentTag>
          ))}
        </div>
      </div>
      <div className={classes.warning}>
        <span>Risk warning: </span> Cryptocurrency trading is subject to high
        market risk. Please make your trades cautiously. Exdex will make best
        efforts to choose high-quality signals but will not be responsible for
        your trading losses.
      </div>
    </PageAnimation>
  );
};

export default AiPaymentTags;

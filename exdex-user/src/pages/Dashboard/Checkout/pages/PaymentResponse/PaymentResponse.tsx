import { useParams } from "react-router-dom";
import Button from "../../../../../common/Components/Button/Button";
import classes from "./PaymentResponse.module.scss";
import { useNavigate } from "react-router-dom";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import { useEffect, useState } from "react";
import { getSelectedPlan } from "../../../../../services/plan";
import Loading from "../../../../../common/UI/Loading/Loading";
import { convertISOToCustomFormat } from "../../../../../utils/date";
import { API_URL } from "../../../../../config";
import { useSelector } from "react-redux";
import { selectToken } from "../../../../../store/authSlice";
import NoData from "../../../../../common/Components/NoData/NoData";

const PaymentResponse = () => {
  const token = useSelector(selectToken);
  const { id, id2 } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  const goBack = () => {
    navigate(-1);
  };

  const downloadInvoiceMethod = async () => {
    try {
      setDownloading(true);
      const response = await fetch(`${API_URL}/user-plans/invoice/${id2}`, {
        method: "GET",
        headers: {
          Accept: "application/pdf",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "invoice_8.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        setDownloading(false);
      } else {
        console.error("Failed to download invoice");
        setDownloading(false);
      }
    } catch (err) {
      setDownloading(false);
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    const fetchPlan = async () => {
      setLoading(true);
      try {
        const response = await getSelectedPlan(id2 + "");
        if (response.status) {
          setData(response.data[0] ? response.data[0] : {});
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [id2]);

  return (
    <>
      {loading && <Loading />}
      {!loading && !data["checkout_details"] && (
        <PageAnimation>
          <NoData title="No Data" description="" />
          </PageAnimation>
      )}
      {!loading && data["checkout_details"] && (
        <PageAnimation left={true}>
          <div className={classes.checkboxOuter}>
            <div className={classes.checkboxInner}>
              <div
                className={`${classes.top} ${
                  id == "success" ? classes.bg : ""
                }`}
              >
                <div className={`${classes.close} ${classes.mobShow}`}>
                  <img src="/assets/images/closeWhite.png" alt="close" />
                </div>
                <img
                  className={classes.statusImage}
                  src={`/assets/images/payment/${
                    id == "success" ? "success" : "error"
                  }.png`}
                  alt="success"
                />
                <div className={classes.status}>
                  Payment {id == "success" ? "Successful!" : "Failed"}
                </div>
                <div className={classes.transactionDetails}>
                  Transaction Number : {data.id}
                </div>
              </div>
              <div className={classes.bottom}>
                <div className={classes.bottomInner}>
                  <div className={classes.sectionHead}>
                    {data &&
                      data["checkout_details"] &&
                      data["checkout_details"].items.map(
                        (item: any, index: number) => (
                          <span key={index}>{item.name} </span>
                        )
                      )}
                  </div>
                  <div className={classes.sectionWrap}>
                    <div className={classes.sectionItem}>
                      <div className={classes.sectionLabel}>Total Amount</div>
                      <div
                        className={`${classes.sectionVal} ${classes.sectionMain}`}
                      >
                        ${data?.checkout_details.total_price}
                      </div>
                    </div>
                    <div className={classes.sectionItem}>
                      <div className={classes.sectionLabel}>ExCoin</div>
                      <div className={classes.sectionVal}>
                        {data.ex_coin_used}
                      </div>
                    </div>
                    <div className={classes.sectionItem}>
                      <div className={classes.sectionLabel}>
                        Points Redeemed
                      </div>
                      <div className={classes.sectionVal}>
                        {data.dex_token_used}
                      </div>
                    </div>

                    <div className={classes.sectionItem}>
                      <div className={classes.sectionLabel}>
                        Transaction Date
                      </div>
                      <div className={classes.sectionVal}>
                        {" "}
                        {data.updated_at
                          ? convertISOToCustomFormat(data.updated_at)
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.btnWrap}>
                  <Button
                    type="full"
                    disabled={downloading}
                    onClick={id == "success" ? downloadInvoiceMethod : goBack}
                  >
                    <div className={classes.btnInner}>
                      {id == "success" ? (
                        <>
                          {downloading ? (
                            "Downloading..."
                          ) : (
                            <>
                              Download Receipt
                              <img
                                src="/assets/images/payment/download.png"
                                alt="download"
                              />
                            </>
                          )}
                        </>
                      ) : (
                        "Try Again"
                      )}
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </PageAnimation>
      )}
    </>
  );
};

export default PaymentResponse;

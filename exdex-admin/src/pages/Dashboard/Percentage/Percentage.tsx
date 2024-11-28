import { useEffect, useState } from "react";
import OverviewCard from "../../../common/Components/OverviewCard/OverviewCard";
import { listROI, updateROI } from "../../../services/roi"; // Assuming updateROI exists
import classes from "./Percentage.module.scss";
import Button from "../../../common/Components/Button/Button";
import Loading from "../../../common/UI/Loading/Loading";
import NoData from "../../../common/Components/NoData/NoData";
import PageAnimation from "../../../common/Components/PageAnimation/PageAnimation";
import { IMAGE_URL } from "../../../config";

const Percentage = () => {
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [btnText, setBtnText] = useState("Update");
  const [defaultPercentage , setDefaultPercentage] = useState<Record<number , Record<string , string>>>({})

  useEffect(() => {
    getROIMethod();
  }, []);

  const getROIMethod = async () => {
    try {
      setFetching(true);
      setData([]);
      const response = await listROI();
      if (response.status) {
        if (response.data) {
          const yearPercentObj :Record<number , Record<string , string>> = {}
           response.data?.map((d:any , index : number)=>{
            const {year_default_percentage} = d;
            yearPercentObj[index] = year_default_percentage;
           })
           setDefaultPercentage(yearPercentObj)
           console.log(yearPercentObj)
          setData(response.data);
        } else {
          console.log("Unexpected data format:", response.data);
        }
      } else {
        console.log("Response status is false");
      }
    } catch (err) {
      console.log("Error fetching binary data:", err);
    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (index: number, field: any, value: any) => {
    const updatedData: any = [...data];
    updatedData[index][field] = value;
    setData(updatedData);
  };

  const handleSubmit = async () => {
    try {
      const tempData = data.map((item: any,index : number) => {
        const numerics = {} as any;
        Object.keys(defaultPercentage[index]).forEach((k)=>{
          const stringKey = String(k);
          numerics[stringKey] = Number(defaultPercentage[index][k]) || 0
        })
        console.log(numerics , "numbericx")
        return {
          id : item.id,
          plan_id: item.plan_id,
          year_default_percentage:numerics,
          customized_percentage: item.customized_percentage
            ? Number(item.customized_percentage)
            : 0,
        };
      });
      console.log(tempData)
      setBtnText("Updating...");
      const response = await updateROI(tempData);
      if (response.status) {
        getROIMethod();
      } else {
        console.log("Error in updating");
      }
    } catch (error) {
      console.error("Error updating ROI:", error);
    } finally {
      setBtnText("Update");
    }
  };

  return (
    <PageAnimation>
      <div className={classes.percentOuter}>
        <OverviewCard>
          <div className={classes.wrap}>
            <div className={classes.head}>Auto-Trade</div>
            {fetching && <Loading />}
            {!fetching && (!data || !data.length) && (
              <NoData title="No Data" description="" />
            )}
            {data && data.length > 0 && (
              <PageAnimation>
                <div className={classes.body}>
                  {data.map((item: any, index) => (
                    <div className={classes.item} key={item.id}>
                     
                      <div className={classes.nameImage}>
                        <div className={classes.image}>
                          <img
                            src={`${IMAGE_URL}/logos/${item.logo}`}
                            alt="autotrade"
                          />{" "}
                        </div>
                        {item.collection}
                      </div>
                      <div className={classes.section1}>
                      <div className={classes.default}>
                        Default{" "}
                        {Object.keys(defaultPercentage[index]).map((k)=>{
                            return (
                              <input
                                type="text"
                                //@ts-ignore
                                value={defaultPercentage[index][k]}
                                onChange={(e) => {
                                  const re = /^[0-9\b.]+$/;
                                  if (e.target.value === "" || re.test(e.target.value)) {
                                    console.log("here" , e.target.value.split('.'))
                                    const tempPercentage = { ...defaultPercentage };
                                  
                                    if ( e.target.value.split('.').length <= 2) {
                                      tempPercentage[index][k] = (e.target.value);
                                      setDefaultPercentage(tempPercentage);
                                    }
                                  } else {
                                    e.preventDefault();
                                    e.target.value = "";
                                  }
                                }}
                                placeholder="Enter percentage"
                              />
                            );
                          })
                        }
                        {/* {Object.keys(item.year_default_percentage).map((k)=>{
                          return  <input
                          type="text"
                          value={defaultPercentage[k]}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "default_percentage",
                              e.target.value
                            )
                          }
                          placeholder="Enter percentage"
                        />
                        })} */}
                       
                        {/* <input
                          type="text"
                          value={item.default_percentage}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "default_percentage",
                              e.target.value
                            )
                          }
                          placeholder="Enter percentage"
                        /> */}
                      </div>
                      <div className={classes.default}>
                        Customised{" "}
                        <input
                          type="text"
                          value={item.customized_percentage}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "customized_percentage",
                              e.target.value
                            )
                          }
                          placeholder="Enter percentage"
                        />
                      </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={classes.btnWrap}>
                  <Button theme="bordered" onClick={getROIMethod}>
                    <div className={classes.cancel}>Cancel</div>
                  </Button>
                  <Button
                    theme="neon"
                    onClick={handleSubmit}
                    disabled={btnText != "Update"}
                  >
                    <div className={classes.sub}>{btnText}</div>
                  </Button>
                </div>
              </PageAnimation>
            )}
          </div>
        </OverviewCard>
      </div>
    </PageAnimation>
  );
  
};

export default Percentage;

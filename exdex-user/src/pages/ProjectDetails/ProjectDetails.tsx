import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HTMLParser from "../../common/Components/HTMLParser/HTMLParser";
import LazyImage from "../../common/Components/LazyImage/LazyImage";
import useApi from "../../hooks/useAPI";
import useToast from "../../hooks/useToast";
import {
  addProjectToWatchList,
  getOtherProjectsForDetal,
  getPopularProjects,
  getProject,
  manageAppreciationData,
} from "../../services/projects";
import CommentsSection from "../AISignals/AISignalDetails/ChartDetails/CommentsSection/CommentsSection";
import PostComments from "../AISignals/AISignalDetails/ChartDetails/PostComments/PostComments";
import RatingAndReview from "../AISignals/AISignalDetails/RatingAndReview/RatingAndReview";
import LatestProjectLong from "../Projects/LatestProjects/LatestProjectLong/LatestProjectLong";
import OtherProjects from "../Projects/OtherProjects/OtherProjects";
import { Project } from "../Projects/Projects";
import TopProjects from "../Projects/TopProjects/TopProjects";
import styles from "./ProjectDetails.module.scss";
import SideStickyGroup from "./SliderGroupLeft/SliderGroupLeft";
import Graph from "./GraphDetails/Graph";
import BannerLoader from "./BannerLoader";
import LatestProjectLongLoader from "../Projects/LatestProjects/LatestProjectLong/LatestProjectsLongLoader";
import { useScroll } from "framer-motion";
import NumberInput from "../../common/Components/NumberInput/NumberInput";
import { formatCurrency } from "../../utils/currencyFormatter";
import { getTenxImageWithBaseUrl } from "../../utils/commonutils";

export const SCROLLDETECT = "SCROLLDETECT";

const ProjectDetails = () => {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [amount, setAmount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const navigate = useNavigate();
  const { id: projectId, categoryId } = useParams();
  const incrementedId = Number(categoryId) + 1;

  const {
    executeApi,
    data,
    loading: blogloading,
  } = useApi<{ data: { tenx_project: Project[] } }, number>(getProject, {
    keepBeforeRefresh: true,
  });

  const [Otherdata, setData] = useState<Project[]>([]);
  const [pageConfig, setPageConfig] = useState({ page: 1, per_page: 15 });

  const {
    loading: OthersLoading,
    error,
    executeApi: getOthers,
  } = useApi<{ data: { other_proj: { [key: string]: Project[] } } }, any>(
    getOtherProjectsForDetal,
    {
      onComplete: (d) => {
        const apiData = d?.data?.other_proj?.["latest_project"];
        if (apiData) {
          setData(apiData);
        }
      },
      keepBeforeRefresh: true,
    }
  );

  const { executeApi: manageAppreciation } = useApi(manageAppreciationData, {
    onComplete: (m) => {
      triggerToast(m.data, "success");
      executeApi(Number(projectId));
    },
  });

  const { executeApi: addProjectToWatchListAPI } = useApi(
    addProjectToWatchList,
    {
      onComplete: (m) => {
        triggerToast(m.data.message, "success");
        executeApi(Number(projectId));
      },
      onError: () => {},
    }
  );

  const [popularData, setPopularData] = useState<Project[]>([]);
  const { triggerToast } = useToast();

  const {
    loading: popularLoading,
    error: popularError,
    executeApi: getPopularAPI,
  } = useApi<{ data: { popular: Project[] } }, any>(getPopularProjects, {
    onComplete: (data) => {
      setPopularData(data?.data?.popular || []);
    },
    keepBeforeRefresh: true,
  });

  useEffect(() => {
    if (projectId && incrementedId) {
      executeApi(Number(projectId));
      getOthers({ categoryId: incrementedId, ...pageConfig });
      getPopularAPI({ categoryId: incrementedId, config: { ...pageConfig } });
    }
  }, [projectId, incrementedId]);

  const formatPrice = (price: number) => {
    let splitValue = price?.toString().split(".");
    if (splitValue[1])
      if (splitValue[1].length > 7) {
        return (
          splitValue[0] +
          "." +
          splitValue[1][0] +
          "..." +
          splitValue[1][splitValue[1].length - 3] +
          splitValue[1][splitValue[1].length - 2] +
          splitValue[1][splitValue[1].length - 1]
        );
      } else {
        return splitValue[0] + "." + splitValue[1];
      }
  };

  const projectData: any = data?.data?.tenx_project[0];

  console.log(projectData);

  const showLink = (url: string) => {
    return url && url !== "";
  };

  const navigateTo = (url: string, event: any) => {
    event.preventDefault();
    window.open(url, "_blank"); // Opens the link in a new tab
  };

  return (
    <>
      <div className={styles.bgs}></div>
      <div className={styles.container}>
        <div
          className={styles.goBack}
          onClick={() => {
            navigate(-1);
          }}
        >
          {" "}
          &lt; Go Back{" "}
        </div>
        <div id={SCROLLDETECT} className={styles.scrollingDvc}>
          <div className={styles.topSection}>
            {projectData && (
              <div className={styles.topWrap}>
                <div className={styles.coinWrapper}>
                  <div className={styles.coinIcon}>
                    <LazyImage
                      alt="icon"
                      src={getTenxImageWithBaseUrl(
                        projectData?.base_currency_image
                      )}
                    />
                  </div>
                  <div className={styles.coinDetails}>
                    <p className={styles.coinName}>
                      {projectData?.base_currency_name
                        ? projectData?.base_currency_name
                        : projectData?.token}
                      {projectData?.base_currency_name && (
                        <span className={styles.coinShortName}>
                          ({projectData?.token})
                        </span>
                      )}
                    </p>
                    <h3 className={styles.coinValue}>
                      <span>${formatPrice(projectData?.price || 0)}</span>
                      {projectData?.price_change !== undefined && (
                        <span
                          className={`${styles.percentage} ${
                            projectData?.price_change < 0 ? styles.danger : ""
                          }`}
                        >
                          {projectData?.price_change > 0
                            ? `+${projectData?.price_change}`
                            : projectData?.price_change}
                          %
                        </span>
                      )}
                    </h3>
                    <div className={styles.webLink}>
                      {showLink(projectData?.project_link || "") && (
                        <a
                          className={styles.link}
                          href={projectData?.project_link}
                          onClick={(e) =>
                            navigateTo(projectData?.project_link || "", e)
                          }
                        >
                          Coinmarketcap
                        </a>
                      )}
                      {showLink(projectData?.website_link || "") && (
                        <a
                          className={styles.link}
                          href={projectData?.website_link}
                          onClick={(e) =>
                            navigateTo(projectData?.website_link || "", e)
                          }
                        >
                          Website
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.recom}>
                  <div className={styles.headRe}>Recomended Investment</div>
                  <div className={styles.valRe}>
                    {projectData?.investment_range
                      ? projectData.investment_range
                      : "-"}
                  </div>
                </div>
                <div className={styles.graphOuter}>
                  <Graph projectData={projectData} />
                </div>
              </div>
            )}
          </div>
          <div className={styles.bottomWrapper}>
            <div className={styles.bottomSection}>
              <div className={styles.left}>
                <div className={styles.sectionLeft}>
                  {blogloading &&
                    (data?.data?.tenx_project.length ||
                      !data?.data?.tenx_project) && <BannerLoader />}

                  <div>
                    <h1 className={`${styles.titleWrapper} `}>
                      {projectData?.name}
                    </h1>
                    <p className={`${styles.subTitles}`}>
                      {projectData?.heading}
                    </p>
                    {projectData?.analytics?.published_at && (
                      <p className={`${styles.subTitles}`}>
                        {format(
                          projectData?.analytics?.published_at,
                          "dd MMM, yyyy"
                        )}
                      </p>
                    )}
                    {projectData && (
                      <>
                        {" "}
                        <div className={styles.mainBanner}>
                          <LazyImage
                            alt="icon"
                            src={
                              "https://tenx-prod-123.s3.eu-west-2.amazonaws.com/" +
                              projectData?.banner
                            }
                          />
                        </div>
                        <div className={styles.description}>
                          {HTMLParser(projectData?.description || "")}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.sectionRight}>
                  <div className={styles.calculatorWrap}>
                    <div className={styles.numWrap}>
                      <div className={styles.priceVal}>
                        ${formatPrice(projectData?.price || 0)}
                      </div>
                    </div>
                    <div className={styles.numWrap}>
                      <NumberInput
                        label=""
                        type="number"
                        value={count}
                        theme="fontWeight"
                        className={styles.numInput}
                        step={1}
                        minWidth={"none"}
                        unit={"x"}
                        updated={(val: any) => {
                          console.log(val);
                          setCount(val);
                        }}
                      />
                    </div>

                    <div className={styles.numWrap}>
                      <NumberInput
                        label=""
                        type="number"
                        reverseunit={"$"}
                        value={amount}
                        theme="fontWeight"
                        className={styles.numInput}
                        step={100}
                        minWidth={"none"}
                        updated={(val: any) => {
                          setAmount(val);
                        }}
                      />
                    </div>
                    <div className={styles.numWrap}>
                      <div className={styles.priceVal}>
                        {formatCurrency(count * amount, "en-US", "USD")}
                      </div>
                    </div>
                  </div>
                  <div className={styles.latestProjects}>
                    <h3 className={styles.sectionHeading}>Latest Projects</h3>
                    {OthersLoading &&
                      Otherdata.length === 0 &&
                      Array.from({ length: 5 }).map((_, i) => {
                        return <LatestProjectLongLoader />;
                      })}
                    {Otherdata.length > 0 &&
                      Otherdata.slice(0, 3).map((p) => {
                        return (
                          <LatestProjectLong
                            projectId={p.id}
                            categoryId={Number(categoryId)}
                            growth={p?.growth}
                            date={p?.analytics?.published_at}
                            watchListed={p?.analytics?.watch_listed}
                            image={p.thumbnail}
                            name={p.name}
                            description={p.heading}
                            onBookMarkClick={() => {
                              triggerToast("updating watchlist", "info");
                              addProjectToWatchListAPI({
                                category_id: 1,
                                project_id: p.id,
                                isOnWatchList: p.analytics.watch_listed,
                              });
                            }}
                          />
                        );
                      })}
                  </div>
                  <div className={styles.popularProjects}>
                    <h3 className={styles.sectionHeading}>Popular Projects</h3>
                    {popularLoading &&
                      popularData.length === 0 &&
                      Array.from({ length: 5 }).map((_, i) => {
                        return <LatestProjectLongLoader />;
                      })}
                    {popularData.map((p) => {
                      return (
                        <LatestProjectLong
                          projectId={p.id}
                          categoryId={Number(categoryId)}
                          growth={p.growth}
                          date={p?.analytics?.published_at}
                          watchListed={p?.analytics?.watch_listed}
                          image={p.thumbnail}
                          name={p.name}
                          description={p.heading}
                          onBookMarkClick={() => {
                            triggerToast("updating watchlist", "info");
                            addProjectToWatchListAPI({
                              category_id: 1,
                              project_id: p.id,
                              isOnWatchList: p.analytics.watch_listed,
                            });
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className={styles.remainingNews}>
                <div className={styles.remainigPosts}>
                  <h3 className={styles.sectionHeading}>Latest Projects</h3>
                  {OthersLoading &&
                    Otherdata.length === 0 &&
                    Array.from({ length: 5 }).map((_, i) => {
                      return <LatestProjectLongLoader />;
                    })}
                  {Otherdata.length > 0 &&
                    Otherdata.slice(3, 5).map((p) => {
                      return (
                        <LatestProjectLong
                          projectId={p.id}
                          categoryId={Number(categoryId)}
                          growth={p.growth}
                          date={p?.analytics?.published_at}
                          watchListed={p?.analytics?.watch_listed}
                          image={p.thumbnail}
                          name={p.name}
                          description={p.heading}
                          onBookMarkClick={() => {
                            triggerToast("updating watchlist", "info");
                            addProjectToWatchListAPI({
                              category_id: incrementedId,
                              project_id: p.id,
                              isOnWatchList: p.analytics.watch_listed,
                            });
                          }}
                        />
                      );
                    })}
                </div>
                <RatingAndReview users_rating={2} onUpdateRating={(e) => {}} />
                <PostComments
                  onSaveComment={() => {
                    // if(commentRef.current){
                    //   //@ts-ignore
                    //   commentRef.current.resetAndRefresh()
                    // }
                  }}
                  trade_view_id={Number(projectId)}
                  onTabSwitch={(s) => {}}
                  table="tenx_projects"
                />
                <CommentsSection
                  trade_view_id={Number(projectId)}
                  table="tenx_projects"
                />
              </div>
              {projectData && (
                <div className={styles.sliderGrp}>
                  <SideStickyGroup
                    reactToProject={(appreciate_type, like) => {
                      manageAppreciation({
                        like: like,
                        project_id: Number(projectId),
                        appreciate_type: appreciate_type,
                      });
                    }}
                    moveToComments={() => {}}
                    addToWatchlist={() => {
                      triggerToast("updating watchlist", "info");
                      addProjectToWatchListAPI({
                        category_id: incrementedId,
                        project_id: Number(projectId),
                        isOnWatchList: projectData.analytics.watch_listed,
                      });
                    }}
                    projectData={projectData}
                  />
                </div>
              )}
            </div>
            <OtherProjects categoryId={incrementedId} />
            <TopProjects categoryId={incrementedId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;

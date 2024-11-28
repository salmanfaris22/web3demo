import { useEffect, useState } from "react";
import OverviewCard from "../../../../../common/Components/OverviewCard/OverviewCard";
import Tab from "../../../../../common/Components/Tab/Tab";
import CryptoBubbleChart from "../../components/CryptoBubble/CryptoBubble";
import classes from "./Bubbles.module.scss";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import TeamSection from "../../components/TeamSection/TeamSection";
import { getBubbleList, getUserList } from "../../../../../services/bubbleTeam";
import Pagination from "../../../../../common/Components/Pagination/Pagination";
import { useDispatch } from "react-redux";
import { showToast } from "../../../../../store/toastSlice";

const Bubbles = () => {
  const dispatch = useDispatch();
  const tabItems = [
    {
      label: "Bubble",
    },
    {
      label: "Team View",
    },
  ];

  const tabItems2 = [
    {
      label: "All",
      val: "all",
    },
    {
      label: "Top Earner",
      val: "top_earners",
    },
    {
      label: "Newest",
      val: "newest",
    },
  ];
  const [currentTab, setCurrentTab] = useState(0);
  const [currentTab2, setCurrentTab2] = useState(0);
  const [currentActive, setActiveTab] = useState(0);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);

  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const [parentId, setParentId] = useState<any>(null);

  const [fetching, setFetching] = useState(false);

  const tabUpdate = (val: any) => {
    setCurrentTab(val);
    setCurrentTab2(0);
  };

  const tabUpdate2 = (val: any) => {
    setCurrentTab2(val);
  };

  useEffect(() => {
    getUsers();
  }, [page]);

  useEffect(() => {
    if (parentId) {
      getUsers();
    }
  }, [parentId]);

  useEffect(() => {
    if (currentTab == 0) {
      getBubbles();
    } else {
      getUsers();
    }
  }, [currentTab2]);

  const getBubbles = async () => {
    try {
      const filter = `?filter=${tabItems2[currentTab2].val}`;
      setFetching(true);
      setData([]);
      const response = await getBubbleList(filter);
      if (response.status) {
        if (response.data) {
          setData(response.data);
        } else {
          setData([]);
        }
      }
    } catch (err) {
    } finally {
      setFetching(false);
    }
  };

  const getUsers = async () => {
    try {
      let filter = `?page=${page + 1}&limit=${pageSize}&filter=${
        tabItems2[currentTab2].val
      }`;
      if (parentId) {
        filter = filter + `&user_id=${parentId}`;
      } else {
        setUserData([]);
      }
      setFetching(true);
      const response = await getUserList(filter);
      if (response.status) {
        if (response.data && response.data.members) {
          if (parentId) {
            let userdataArr = userData;
            userdataArr.forEach((user: any) => {
              if (user.user_id == parentId) {
                user.children = response.data.members;
              } else if (user.children && user.children.length) {
                user.children.forEach((inneruser: any) => {
                  if (inneruser.user_id == parentId) {
                    inneruser.children = response.data.members;
                  }
                });
              }
            });
            setUserData(userdataArr);
          } else {
            setPageCount(Math.ceil(response.data.total / pageSize));
            setUserData(response.data.members);
          }
        } else {
          setUserData([]);
        }
      }
    } catch (err: any) {
      dispatch(
        showToast({
          message: err.response.data.error || "Error fetching data",
          type: "error",
          timeout: 5000,
        })
      );
    } finally {
      setParentId(null);
      setFetching(false);
    }
  };
  // ?page=1&limit=5&filter=top_earners

  const getChildren = (data: any) => {
    setParentId(data.user_id);
  };

  return (
    <OverviewCard>
      <div className={classes.bubbleWrap}>
        <div className={classes.tabOut}>
          <Tab
            items={tabItems}
            activeIndex={currentActive}
            onUpdate={tabUpdate}
            theme="line"
          />
        </div>
        {currentTab == 0 && (
          <PageAnimation left={true}>
            <div className={classes.feed}>
              <div className={classes.feedTop}>
                <div className={classes.head}>Feed</div>
                <div className={classes.right}>
                  <Tab
                    items={tabItems2}
                    activeIndex={currentActive}
                    onUpdate={tabUpdate2}
                    theme="button"
                  />
                </div>
              </div>
              <CryptoBubbleChart data={data} isLoading={fetching} />
            </div>
          </PageAnimation>
        )}
        {currentTab == 1 && (
          <PageAnimation left={true}>
            <div className={classes.feed}>
              <div className={classes.feedTop}>
                <div className={classes.head}>
                  <span className={classes.des}>Your Team</span>
                  <span className={classes.mob}>Team</span>
                </div>
                <div className={classes.right}>
                  <Tab
                    items={tabItems2}
                    activeIndex={currentActive}
                    onUpdate={tabUpdate2}
                    theme="button"
                  />
                </div>
              </div>
              <div className={classes.teamOuter}>
                <TeamSection
                  data={userData}
                  isLoading={fetching}
                  getChildren={getChildren}
                />
                {userData && userData?.length > 0 && (
                  <Pagination
                    containerClassName="CustomPaginationSimple"
                    pageCount={pageCount}
                    initialPage={page}
                    onPageChange={(e) => {
                      console.log(e);
                      setPage(e.selected);
                    }}
                  />
                )}
              </div>
            </div>
          </PageAnimation>
        )}
      </div>
    </OverviewCard>
  );
};

export default Bubbles;

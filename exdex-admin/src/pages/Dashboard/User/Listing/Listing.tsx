import { useEffect, useState } from "react";
import FilterTable from "../Sections/FilterTable/FilterTable";
import OverviewSec from "../Sections/Overview/Overview";
import classes from "./Listing.module.scss";
import {
  getUserList,
  searchUserProfileListing,
} from "../../../../services/user";
import FilterDetails from "../../../../common/Components/FilterDetails/FilterDetails";
import PageAnimation from "../../../../common/Components/PageAnimation/PageAnimation";
import OverviewCard from "../../../../common/Components/OverviewCard/OverviewCard";
import Table2 from "../../../../common/Components/Table2/Table2";
import { useNavigate } from "react-router-dom";
import { getFirstLetter } from "../../../../utils/name";
import Pagination from "../../../../common/Components/Pagination/Pagination";

const Listing = () => {
  const navigate = useNavigate();

  const tabsArr = [
    {
      name: "Overview",
      hasImage: false,
      type: "tab",
    },
    // {
    //   name: "Manage",
    //   hasImage: false,
    //   type: "tab",
    // },
  ];
  const filters = [
    {
      name: "Online User",
      key: "online",
    },
    {
      name: "New User",
      key: "new",
    },
    {
      name: "Affiliate User",
      key: "affiliate",
    },
    {
      name: "Unilevel",
      key: "unilevel",
    },
    {
      name: "IB",
      key: "ib",
    },
    {
      name: "Exchange",
      key: "exchange",
    },
    {
      name: "Academy",
      key: "academy",
    },
    {
      name: "Active User",
      key: "active",
    },
    {
      name: "Inactive User",
      key: "inactive",
    },
    {
      name: "Suspend User",
      key: "suspended",
    },
    {
      name: "KYC Rejected",
      key: "kyc rejected",
    },
    {
      name: "KYC",
      key: "kyc",
    },
    {
      name: "Direct",
      key: "direct",
    },
    {
      name: "Team",
      key: "team",
    },
  ];
  const [data, setData] = useState([]);
  const [activeFilter, setActiveFilter] = useState(0);
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedSearchItem, setSelectedItem] = useState<any>({});
  //loading
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  //pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (currentPage != -1) {
      getUserMethod();
    }
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(-1);
    setTimeout(() => {
      setCurrentPage(0);
    });
    setTotalPages(0);
  }, [activeFilter]);

  const getUserMethod = async () => {
    try {
      setFetching(true);
      setData([]);
      let filterKey = `?type=${filters[activeFilter]["key"]}&page=${
        currentPage + 1
      }&limit=${itemsPerPage}`;
      const response = await getUserList(filterKey);
      if (response.status) {
        if (response.data && response.data.users) {
          setData(response.data.users);
          setTotalPages(Math.ceil(response.data.total_count / itemsPerPage));
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } else {
        console.error("Response status is false");
      }
    } catch (err) {
      console.error("Error fetching binary data:", err);
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  const redirect = (url: any) => {
    navigate(url);
  };

  const selectedItem = (item: any) => {
    console.log(item);
    setSelectedItem(item);
    redirect(`/user/details/${item.user_id}`);
  };

  const getSearchResult = async (val: any) => {
    try {
      setSearching(true);
      let filterKey = `?listType=search`;
      filterKey = filterKey + `&searchQuery=${val}`;

      const data = {
        // id: id,
        url: filterKey,
      };
      const response = await searchUserProfileListing(data);
      if (response.status) {
        if (response.data) {
          setSearchResult(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } else {
        console.error("Response status is false");
      }
    } catch (err) {
      console.error("Error fetching binary data:", err);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className={classes.userOuter}>
      <div className={classes.filterOut}>
        <FilterDetails
          searching={searching}
          searchResult={searchResult}
          searchNameKey={"name"}
          enableSearch={true}
          listDisplayKey={"name"}
          getSearchResult={getSearchResult}
          selectedItem={selectedItem}
          tabsArr={tabsArr}
          enableDate={false}
        />
      </div>
      <div className={classes.body}>
        <OverviewSec />
        <div className={classes.bottom}>
          <div className={classes.filterTable}>
            <div className={classes.filterWrap}>
              <FilterTable
                filterArr={filters}
                filterChanged={(val) => {
                  setActiveFilter(val);
                }}
              />
            </div>
            <div className={classes.tableOuter}>
              <PageAnimation>
                <OverviewCard>
                  <div className={classes.table}>
                    <Table2>
                      <thead>
                        <tr>
                          <th className={classes.nft}>User Id</th>
                          <th className={classes.amount}>Name</th>
                          <th className={classes.durationHead}>Type</th>
                          <th className={classes.tradeFee}>Status</th>
                          <th className={classes.greenCol}>Request</th>
                          <th className={classes.progressCol}>Affiliate</th>
                          <th className={classes.progressCol}>
                            Account Number
                          </th>
                          <th className={classes.progressCol}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data.map((item: any, index: number) => (
                            <tr
                              className={classes.hover}
                              key={index}
                              onClick={() => {
                                redirect(`/user/details/${item.id}`);
                              }}
                            >
                              <td>{item.id}</td>
                              <td>
                                <div className={classes.nameAvatar}>
                                  <div className={classes.avatar}>
                                    {item.avatar && (
                                      <img src={item.avatar} alt="profile" />
                                    )}
                                    {getFirstLetter(item.name)}
                                  </div>
                                  {item.name}
                                </div>
                              </td>
                              <td>{item.type}</td>
                              <td>
                                {" "}
                                <div className={classes.statusWrap}>
                                  <div
                                    className={`${classes.statusDot} ${
                                      classes[item.status]
                                    }`}
                                  >
                                    {item.status}
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className={classes.statusWrap}>
                                  <div
                                    className={`${classes.status} ${
                                      classes[
                                        item.request == "KYC Rejected"
                                          ? "red"
                                          : ""
                                      ]
                                    }`}
                                  >
                                    {item.request}
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className={classes.statusWrap}>
                                  <div
                                    className={`${classes.statusDot} ${
                                      classes[item.affiliate]
                                    }`}
                                  >
                                    {item.affiliate}
                                  </div>
                                </div>
                              </td>
                              <td> {item.account_number}</td>
                              <td></td>
                            </tr>
                          ))}
                        {fetching && (
                          <>
                            <tr>
                              <td colSpan={9}>
                                <div className={classes.filler}>Loading...</div>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={9}>
                                <div className={classes.loader}>Loading...</div>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={9}>
                                <div className={classes.filler}>Loading...</div>
                              </td>
                            </tr>
                          </>
                        )}
                        {!fetching && !data.length && (
                          <>
                            <tr>
                              <td colSpan={9}>
                                <div className={classes.filler}>No Data</div>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={9}>
                                <div className={classes.loader}>No Data</div>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={9}>
                                <div className={classes.filler}>No Data</div>
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </Table2>
                    <div className={classes.pageiOuter}>
                      <Pagination
                        containerClassName="CustomPaginationSimple"
                        pageCount={totalPages}
                        initialPage={currentPage}
                        onPageChange={(e) => {
                          setCurrentPage(e.selected);
                        }}
                      />
                    </div>
                  </div>
                </OverviewCard>
              </PageAnimation>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;

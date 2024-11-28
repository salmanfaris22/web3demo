import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button, { BtnSpinner } from "../../../common/Components/Button/Button";
import FilterDetails from "../../../common/Components/FilterDetails/FilterDetails";
import PageAnimation from "../../../common/Components/PageAnimation/PageAnimation";
import Table2 from "../../../common/Components/Table2/Table2";
import Toggle from "../../../common/Components/Toggle/Toggle";
import MainWrapper from "../../../common/Layout/PageWrapper/PageWrapper";
import PageWrapper from "../../../common/Layout/TableWrapper/TableWrapper";
import DataError from "../../../common/UI/DataError/DataError";
import Loader from "../../../common/UI/Loader/Loader";
import NoDataFound from "../../../common/UI/NoDataFound/NoDataFound";
import { routes } from "../../../constants/routes";
import useApi from "../../../hooks/useAPI";
import useToast from "../../../hooks/useToast";
import {
  getUserTickets,
  PageParams,
  updateTicket,
} from "../../../services/tickets";
import {
  convertToMMDDYY,
  getPageDetails,
  replacePlaceholders,
} from "../../../utils/commonUtils";
import { convertISOToLongDateFormat } from "../../../utils/date";
import classes from "./Tickets.module.scss";
import { getFirstLetter } from "../../../utils/name";

export interface Ticket {
  id: number;
  title: string;
  full_name: string;
  category: string;
  user_id: number;
  date: string;
  status: "open" | "closed";
  created_at: string;
  description: string;
}
interface UserInfo {
  user_id: number;
  full_name: string;
  avatar_url: string;
  last_online: string; // ISO date format
  is_online: boolean;
}

interface GetTicketResponse {
  data: {
    limit: number;
    page: number;
    tickets: Ticket[];
    user_info: UserInfo;
    total: number;
  };
}

export const defaultQnTabs = [
  {
    name: "Overview",
  },
];

const UserTickets = () => {
  const [search, setSearch] = useState<PageParams>({
    search: "",
    from: "",
    limit: 20,
    page: 1,
  });
  const [updatedId, setUpdateId] = useState("");
  const {
    executeApi: getQns,
    loading,
    data,
    error,
  } = useApi<GetTicketResponse, PageParams & { id: string }>(getUserTickets, {
    onComplete: (data) => {
      console.log("Data loaded successfully:", data);
    },
    onError: (error) => {
      console.error("Error occurred:", error);
    },
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getQns({ ...search, id: String(id) });
    }
  }, [...Object.values(search), id]);

  const { page, pageCount } = getPageDetails(
    data?.data.total || 0,
    Number(search.limit),
    Number(search.page)
  );

  const { triggerToast } = useToast();

  const { executeApi, loading: submitLoading } = useApi<
    any,
    { status: "open" | "closed"; id: string }
  >(updateTicket, {
    onComplete: () => {
      setUpdateId("");
      getQns({ ...search, id: String(id) });
    },
    onError: (e) => {
      triggerToast(e, "error");
    },
  });

  const userData = data?.data?.user_info;
  const navigate = useNavigate();

  const gotoReply = (data: Ticket) => {
    const { id: ticketId } = data;
    const url = replacePlaceholders(routes.ticketReply, {
      userId: String(id),
      ticketId: ticketId,
    });
    navigate(url);
  };

  return (
    <div className={classes.container}>
      <MainWrapper>
        <div className={classes.filterOut}>
          <FilterDetails
            activeIndex={0}
            enableDate={false}
            enableSearch
            searchResult={[]}
            searchNameKey="title"
            listDisplayKey="title"
            getSearchResult={(e) => {
              if (e.trim() == "") {
                setSearch((prev) => ({ ...prev, search: "" }));
              } else {
                setSearch((prev) => ({ ...prev, search: e }));
              }
            }}
            // exportMethod={() => {}}
            tabsArr={defaultQnTabs}
            searching={false}
            handleDateSelect={({ selection }) => {
              setSearch((prev) => ({
                ...prev,
                from: convertToMMDDYY(selection.startDate),
              }));
            }}
            triggerAction={(e) => {
              console.log(e);
              if (e === defaultQnTabs[1].name) {
                // handleNav("add");
              }
            }}
            showSuggestion={false}
          />
        </div>
        <div className={classes.breadCrumb}>
          {/* <Breadcrumb sections={sections} /> */}
        </div>
        <PageAnimation>
          <PageWrapper
            title={
              userData && (
                <div className={classes.profileWrapper}>
                  <div className={classes.userName}>
                    <div className={classes.name}>{userData?.full_name}</div>
                    <div className={` ${classes.lastSeen}`}>
                      Last seen {""}
                      {convertISOToLongDateFormat(userData?.last_online)}
                    </div>
                  </div>
                  <div
                    className={` ${userData?.is_online && classes.userOnline} ${
                      classes.proPic
                    } ${userData?.avatar_url ? "" : "noAvatar"} `}
                    style={{ backgroundImage: `url(${userData?.avatar_url})` }}
                  >
                    {!userData?.avatar_url &&
                      getFirstLetter(userData.full_name)}
                  </div>
                </div>
              )
            }
          >
            <div className={classes.tableWrapper}>
              {/* Loading and Error States */}
              {loading && <Loader />}
              {error && (
                <DataError
                  btnProps={{
                    onClick: () => {
                      getQns({ ...search, id: String(id) });
                    },
                  }}
                  title="Something went wrong"
                  btnLabel="Reload Tickets"
                />
              )}

              {/* Data Table */}
              {!loading && !error && (
                <PageAnimation>
                  <Table2
                    hasPagination
                    pageProps={{
                      pageCount,
                      initialPage: page,
                      onPageChange: (e) => {
                        setSearch((prev) => ({
                          ...prev,
                          page: e.selected + 1,
                        }));
                      },
                    }}
                  >
                    <thead>
                      <tr>
                        <th>CREATED ON</th>
                        <th>SUBJECT</th>
                        <th>CATEGORY</th>
                        <th>DESCRIPTION</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.data?.tickets?.map((item) => (
                        <tr key={item.id}>
                          <td>{convertISOToLongDateFormat(item.created_at)}</td>
                          <td>
                            <div className={classes.tableDescription}>
                              {item.title}
                            </div>
                          </td>
                          <td>{item?.category}</td>
                          <td>
                            <div className={classes.tableDescription}>
                              {item?.description}
                            </div>
                          </td>
                          <td className={classes.replyTab}>
                            {item.status === "closed" ? (
                              <span
                                onClick={() => {
                                  gotoReply(item);
                                }}
                              >
                                View Reply
                              </span>
                            ) : (
                              <Button
                                onClick={() => {
                                  gotoReply(item);
                                }}
                                theme="neon"
                              >
                                Give Reply
                              </Button>
                            )}
                          </td>
                          <td>
                            {" "}
                            <div className={classes.updateText}>
                              {submitLoading &&
                              updatedId === String(item.id) ? (
                                <>
                                  Updating...
                                  <BtnSpinner className={classes.loadingSpin} />
                                </>
                              ) : (
                                <Toggle
                                  theme="mini"
                                  value={item.status === "closed"}
                                  onToggleChange={() => {
                                    if (!submitLoading) {
                                      setUpdateId(String(item.id));
                                      executeApi({
                                        id: String(item.id),
                                        status:
                                          item.status === "closed"
                                            ? "open"
                                            : "closed",
                                      });
                                    }
                                  }}
                                />
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                      {/* Empty State */}
                      {(!data?.data?.tickets ||
                        data?.data?.tickets?.length === 0) && (
                        <tr>
                          <td colSpan={5}>
                            <NoDataFound title={`Sorry No Tickets found`} />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table2>
                </PageAnimation>
              )}
            </div>
          </PageWrapper>
        </PageAnimation>
      </MainWrapper>
    </div>
  );
};

export default UserTickets;

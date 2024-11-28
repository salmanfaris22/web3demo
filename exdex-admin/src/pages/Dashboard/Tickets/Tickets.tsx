import { useEffect, useState } from "react";
import FilterDetails from "../../../common/Components/FilterDetails/FilterDetails";
import PageAnimation from "../../../common/Components/PageAnimation/PageAnimation";
import Table2 from "../../../common/Components/Table2/Table2";
import MainWrapper from "../../../common/Layout/PageWrapper/PageWrapper";
import DataError from "../../../common/UI/DataError/DataError";
import Loader from "../../../common/UI/Loader/Loader";
import NoDataFound from "../../../common/UI/NoDataFound/NoDataFound";
import useApi from "../../../hooks/useAPI";
import { exportTickets, getAllTickets, PageParams } from "../../../services/tickets";
import { downloadCSV, getPageDetails, goToIdPage } from "../../../utils/commonUtils";
import { convertISOToLongDateFormat } from "../../../utils/date";
import PageWrapper from "../../../common/Layout/TableWrapper/TableWrapper";
import classes from "./Tickets.module.scss";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../constants/routes";
import useToast from "../../../hooks/useToast";

export interface Ticket {
  id: number;
  title: string;
  full_name: string;
  category: string;
  user_id: number;
  date: string;
  status: "open" | "closed";
  created_at: string;
  description?:string
  attachment_urls : string[]
}
interface GetTicketResponse {
  data: {
    limit: number;
    page: number;
    tickets: Ticket[];
    total: number;
  };
}

export const defaultQnTabs = [
  {
    name: "Overview",
  },
];

const Tickets = () => {
  const [search, setSearch] = useState<PageParams>({
    search: "",
    from: "",
    limit: 20,
    page: 1,
  });
  const {
    executeApi: getQns,
    loading,
    data,
    error,
  } = useApi<GetTicketResponse, PageParams>(getAllTickets, {
    onComplete: (data) => {
      console.log("Data loaded successfully:", data);
    },
    onError: (error) => {
      console.error("Error occurred:", error);
    },
  });

  const {triggerToast} = useToast()

  const {executeApi : exportQns } = useApi(exportTickets , {
    onError  : (e)=>{
      triggerToast(e  , "error")
    },
    onComplete : (e)=>{
      console.log(e)
      if (e) {
        downloadCSV(e)
      }
    }
  })

  useEffect(() => {
    getQns({ ...search });
  }, [...Object.values(search)]);

  const { page, pageCount } = getPageDetails(
    data?.data.total || 0,
    Number(search.limit),
    Number(search.page)
  );

  const navigate = useNavigate()

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
            exportMethod={() => {
              exportQns()
            }}
            tabsArr={defaultQnTabs}
            searching={false}
            // handleDateSelect={({ selection }) => {
            //   setSearch((prev) => ({
            //     ...prev,
            //     from: convertToMMDDYY(selection.startDate),
            //   }));
            // }}
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
          <PageWrapper title="All Support Tickets">
            <div className={classes.tableWrapper}>
              {/* Loading and Error States */}
              {loading && <Loader />}
              {error && (
                <DataError
                  btnProps={{
                    onClick: () => {
                      getQns({ ...search });
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
                        <th>NAME</th>
                        <th>SUBJECT</th>
                        <th>CATEGORY</th>
                        <th>DATE</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.data?.tickets?.map((item) => (
                        <tr key={item.id}
                        onClick={()=>{
                         const url =   goToIdPage(routes.userTickets , String(item.user_id))
                         navigate(url)
                        }}
                        >
                          <td>{item.full_name}</td>
                          <td>{item.title}</td>
                          <td>{item?.category}</td>
                          <td>{convertISOToLongDateFormat(item?.date)}</td>
                          <td>
                            <div className={classes.statusWrap}>
                              {item.status}
                              <div
                                className={`${classes.status} ${
                                  item.status === "closed"
                                    ? classes.closed
                                    : classes.open
                                }`}
                              ></div>
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

export default Tickets;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Components/Button/Button";
import FilterDetails from "../../common/Components/FilterDetails/FilterDetails";
import Modal from "../../common/Components/Modal/Modal";
import OverviewCard from "../../common/Components/OverviewCard/OverviewCard";
import PageAnimation from "../../common/Components/PageAnimation/PageAnimation";
import usePopUp from "../../common/Components/PopuUp/usePopUp";
import Table2 from "../../common/Components/Table2/Table2";
import PageWrapper from "../../common/Layout/PageWrapper/PageWrapper";
import TablePageWrapper from "../../common/Layout/TableWrapper/TableWrapper";
import DataError from "../../common/UI/DataError/DataError";
import Loader from "../../common/UI/Loader/Loader";
import NoDataFound from "../../common/UI/NoDataFound/NoDataFound";
import { routes } from "../../constants/routes";
import useApi from "../../hooks/useAPI";
import useToast from "../../hooks/useToast";
import {
  apporvRejectAffiliate,
  getAffiliate,
  IApproveRejectAf,
  pageConfig,
} from "../../services/affiliate";
import {
  convertToMMDDYY,
  formatUserName,
  getPageDetails,
  goToIdPage,
} from "../../utils/commonUtils";
import classes from "./InfluencersList.module.scss";

export const defaultQnTabs = [];

export interface Submission {
  id: number;
  username: string;
  email: string;
  phone_number: string;
  current_country: number;
  language_id: number;
  social_media_id: number;
  marketing_country_id: number;
  social_media_username: string;
  marketer_type: string;
  affiliate_type: string;
  platform_description: string;
  primary_social_media_id: number;
  promotion_link: string;
  followers_count: number;
  content_type: string;
  additional_info: string;
  performance_screenshot: string;
  language: string;
  social_media: string;
  status: "REJECTED" | "ACCEPTED" | "";
  primary_social_media: string;
  marketing_country: string;
  created_at: string; // ISO string format (e.g., "2024-10-06T09:41:00.59579Z")
  updated_at: string; // ISO string format (e.g., "2024-10-06T09:41:00.59579Z")
}

interface SubmissionsResponse {
  page: number;
  page_size: number;
  submissions: Submission[];
  total: number;
  total_pages: number;
}

const InfluencersList = () => {
  const [search, setSearch] = useState<pageConfig>({
    limit: 30,
    page: 1,
    search: "",
  });

  const { executeApi, error, loading, data } = useApi<
    { data: SubmissionsResponse },
    pageConfig
  >(getAffiliate);
  const { executeApi: approveReject, loading: approveRejectLoading } = useApi<
    any,
    IApproveRejectAf
  >(apporvRejectAffiliate, {
    onComplete: () => {
      executeApi(search);
      closePopUp();
    },
    onError: (errorMessage) => {
      triggerToast(errorMessage, "error");
      console.log("Error deleting category:", errorMessage);
    },
  });

  useEffect(() => {
    executeApi(search);
  }, Object.values(search));

  const { page, pageCount } = getPageDetails(
    data?.data.total || 0,
    Number(search.limit),
    Number(search.page)
  );

  const { triggerToast } = useToast();
  const [deleteData, setDeleteCategory] = useState<null | {
    data: Submission;
    type: "accepted" | "rejected";
  }>(null);

  const { isOpen, openPopUp, closePopUp } = usePopUp();

  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <Modal show={isOpen} closeBtn={true} closeMethod={closePopUp}>
        <div className={"modalBody"}>
          <div className={"popHead"}>Delete Category</div>
          <div className={"description"}>
            Are you sure you want to{" "}
            {deleteData?.type === "accepted" ? "approve" : "reject"}{" "}
            {deleteData?.data.username}
          </div>
          <div className={`${"btnOuter"}`}>
            <Button
              onClick={(e) => {
                setDeleteCategory(null);
                closePopUp();
              }}
              theme="danger"
            >
              <div className={"dangerBtn"}>Cancel</div>
            </Button>
            <Button
              onClick={() => {
                approveReject({
                  id: String(deleteData?.data.id),
                  status: deleteData?.type as any,
                });
              }}
              disabled={approveRejectLoading}
            >
              <div className={"authBtn"}>
                {approveRejectLoading
                  ? "Submitting..."
                  : deleteData?.type === "accepted"
                  ? "Approve"
                  : "Reject"}
              </div>
            </Button>
          </div>
        </div>
      </Modal>

      <PageWrapper>
        <div className={classes.filterOut}>
          <FilterDetails
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
            tabsArr={defaultQnTabs}
            searching={false}
            handleDateSelect={({ selection }) => {
              setSearch((prev) => ({
                ...prev,
                from: convertToMMDDYY(selection.startDate),
              }));
            }}
            triggerAction={(e) => {}}
            showSuggestion={false}
          />
        </div>
        <TablePageWrapper title="Influencers">
          <PageAnimation>
            <OverviewCard>
              <div className={classes.tableWrapper}>
                {/* Loading and Error States */}
                {loading && <Loader />}
                {error && (
                  <DataError
                    btnProps={{
                      onClick: () => {
                        // getQns(search);
                      },
                    }}
                    title="Something went wrong"
                    btnLabel="Reload Questions"
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
                          <th>Name</th>
                          <th>Country</th>
                          <th>Platform</th>
                          <th>Followers</th>
                          <th>Profile</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.data?.submissions?.map((item) => (
                          <tr key={item.id}       onClick={() => {
                            const url = goToIdPage(
                              routes.influencerDetails,
                              String(item.id)
                            );
                            navigate(url);
                          }}>
                            <td
                        
                            >
                              {item.username}
                            </td>
                            <td>{item.current_country}</td>
                            <td>{item.social_media}</td>
                            <td>{item.followers_count}</td>
                            <td
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(item.promotion_link);
                              }}
                              className={classes.userName}
                            >
                              {formatUserName(item.social_media_username)}
                            </td>
                            <td className={classes.actnBtn}>
                              {(item.status === "ACCEPTED" ||
                                item.status === "") && (
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setDeleteCategory({
                                      data: item,
                                      type: "rejected",
                                    });
                                    openPopUp();
                                  }}
                                  theme="bordered"
                                  className={classes.rejBtn}
                                >
                                  Reject
                                </Button>
                              )}
                              {(item.status === "REJECTED" ||
                                item.status === "") && (
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setDeleteCategory({
                                      data: item,
                                      type: "accepted",
                                    });
                                    openPopUp();
                                  }}
                                  theme="bordered"
                                  className={classes.accBtn}
                                >
                                  Approve
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                        {/* Empty State */}
                        {(data?.data?.submissions?.length === 0 ||
                          !data?.data?.submissions) && (
                          <tr>
                            <td colSpan={5}>
                              <NoDataFound
                                title={`Sorry No Influencers found `}
                              />
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table2>
                  </PageAnimation>
                )}
              </div>
            </OverviewCard>
          </PageAnimation>
        </TablePageWrapper>
      </PageWrapper>
    </div>
  );
};

export default InfluencersList;

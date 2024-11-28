import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Delete from "../../../../common/Components/Icons/Delete";
import Edit from "../../../../common/Components/Icons/Edit";
import usePopUp from "../../../../common/Components/PopuUp/usePopUp";
import MainWrapper from "../../../../common/Layout/PageWrapper/PageWrapper";
import Loader from "../../../../common/UI/Loader/Loader";
import NoDataFound from "../../../../common/UI/NoDataFound/NoDataFound";
import { routes } from "../../../../constants/routes";
import useApi from "../../../../hooks/useAPI";
import {
  getALlQns,
  QnAPIParams,
  updateFav,
} from "../../../../services/helpCenter";
import {
  convertToMMDDYY,
  getPageDetails,
  replacePlaceholders,
} from "../../../../utils/commonUtils";

import FilterDetails from "../../../../common/Components/FilterDetails/FilterDetails";
import Table2 from "../../../../common/Components/Table2/Table2";
import DataError from "../../../../common/UI/DataError/DataError";
import DeleteQn from "../PrimarySectionQns/DeleteQn/DeleteQn";
import { Question } from "../PrimarySectionQns/PrimarySectionQns";
import classes from "./AllQuestions.module.scss";
import OverviewCard from "../../../../common/Components/OverviewCard/OverviewCard";
import PageAnimation from "../../../../common/Components/PageAnimation/PageAnimation";
import { hideToastById, showToast } from "../../../../store/toastSlice";
import { useDispatch } from "react-redux";

export const defaultQnTabs = [
  {
    name: "Overview",
  },
  {
    name: "Manage",
    key: "Manage",
    type: "button",
    action: "trigger",
  },
];

interface GetQuestionsResponse {
  data: {
    limit: number;
    page: number;
    questions: Question[];
    total_count: number;
  };
}

const AllQuestions = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<QnAPIParams>({
    search: "",
    from: "",
    limit: 30,
    page: 1,
  });
  const [deleteData, setDeleteQn] = useState<any>(null);
  const {
    executeApi: getQns,
    loading,
    data,
    error,
  } = useApi<GetQuestionsResponse, QnAPIParams>(getALlQns, {
    onComplete: (data) => {
      console.log("Data loaded successfully:", data);
    },
    onError: (error) => {
      console.error("Error occurred:", error);
    },
  });

  const route = useNavigate();

  const {
    isOpen: isDeleteOpen,
    openPopUp: OpenDeletePoPup,
    closePopUp: closeDeletePopup,
  } = usePopUp();

  useEffect(() => {
    getQns(search);
  }, Object.values(search));

  const handleNav = (type: "add" | "edit", qn: Question) => {
    const url = replacePlaceholders(routes.editQuestionFromAll, {
      qnId: qn.ID,
      type: "edit",
    });

    route(url);
  };

  const { page, pageCount } = getPageDetails(
    data?.data.total_count || 0,
    Number(search.limit),
    Number(search.page)
  );

  const updateFavourite = async (item: any) => {
    console.log(item);
    try {
      const data = {
        question_id: item.ID + "",
        status: item.status ? false : true,
      };
      dispatch(
        showToast({
          message: "Updating...",
          type: "warning",
          timeout: 25000,
          id: 10,
        })
      );
      const response = await updateFav(data);
      if (response.status) {
        dispatch(hideToastById(10));
        getQns(search);
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
    }
  };

  return (
    <div className={classes.container}>
      <DeleteQn
        qn={deleteData}
        isDeleteOpen={isDeleteOpen}
        closeDeletePopUp={(hasDone) => {
          closeDeletePopup();
          if (hasDone) {
            getQns(search);
          }
        }}
      />
      <MainWrapper>
        <div className={classes.filterOut}>
          <FilterDetails
            enableDate
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
                route(routes.helpCenterManage);
              }
            }}
            showSuggestion={false}
          />
        </div>
        <div className={classes.breadCrumb}></div>
        {/* <PageWrapper title=""> */}
        <PageAnimation>
          <OverviewCard>
            <div className={classes.tableWrapper}>
              {/* Loading and Error States */}
              {loading && <Loader />}
              {error && (
                <DataError
                  btnProps={{
                    onClick: () => {
                      getQns(search);
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
                        <th>QUESTION</th>
                        <th>DATE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.data?.questions?.map((item) => (
                        <tr key={item.ID}>
                          <td>{item.title}</td>
                          <td>{convertToMMDDYY(item.UpdatedAt)}</td>
                          <td>
                            <button
                              onClick={() => {
                                updateFavourite(item);
                              }}
                            >
                              <img
                                src={`/assets/images/${
                                  item.status ? "heart2" : "heart"
                                }.png`}
                                alt="favourite"
                              />
                            </button>
                            <button
                              onClick={() => {
                                handleNav("edit", item);
                              }}
                            >
                              <Delete />
                            </button>
                            <button
                              onClick={() => {
                                setDeleteQn(item);
                                OpenDeletePoPup();
                              }}
                            >
                              <Edit />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {/* Empty State */}
                      {data?.data?.questions?.length === 0 && (
                        <tr>
                          <td colSpan={3}>
                            <NoDataFound title={`Sorry No Questios found `} />
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
        {/* </PageWrapper> */}
      </MainWrapper>
    </div>
  );
};

export default AllQuestions;

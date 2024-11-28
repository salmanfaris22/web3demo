import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb, {
  BreadcrumbSection,
} from "../../../../common/Components/Breadcrumb/Breadcrumb";
import FilterDetails from "../../../../common/Components/FilterDetails/FilterDetails";
import Delete from "../../../../common/Components/Icons/Delete";
import Edit from "../../../../common/Components/Icons/Edit";
import PageAnimation from "../../../../common/Components/PageAnimation/PageAnimation";
import usePopUp from "../../../../common/Components/PopuUp/usePopUp";
import Table2 from "../../../../common/Components/Table2/Table2";
import MainWrapper from "../../../../common/Layout/PageWrapper/PageWrapper";
import DataError from "../../../../common/UI/DataError/DataError";
import Loader from "../../../../common/UI/Loader/Loader";
import NoDataFound from "../../../../common/UI/NoDataFound/NoDataFound";
import { routes } from "../../../../constants/routes";
import useApi from "../../../../hooks/useAPI";
import {
  getQnsBySubCatgory,
  QnAPIParams,
} from "../../../../services/helpCenter";
import {
  convertToMMDDYY,
  getPageDetails,
  replacePlaceholders,
} from "../../../../utils/commonUtils";
import PageWrapper from "../../../../common/Layout/TableWrapper/TableWrapper";
import DeleteQn from "./DeleteQn/DeleteQn";
import classes from "./PrimarySectionQns.module.scss";

export interface Question {
  status?: any;
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  subcategory_id: string;
  title: string;
  body: string;
}

interface GetQuestionsResponse {
  data: {
    limit: number;
    page: number;
    questions: Question[];
    total_count: number;
  };
}

export const defaultQnTabs = [
  {
    name: "Overview",
  },
  {
    name: "Add",
    key: "Add",
    hasImage: true,
    Imgurl: "/assets/images/add.png",
    type: "button",
    action: "trigger",
  },
];

const PrimarySectionQns = () => {
  const { category, subCategoryId, subCategory, cardType, categoryId } =
    useParams();

  const sections: BreadcrumbSection[] = [
    { label: "Help Centre", link: routes.helpCenter },
    { label: category as string, link: routes.helpCenterManage },
    {
      label:
        cardType === "1" ? `Primary Section` : `Looking for Something Else`,
      link: `/help-center/manage/${category}/${categoryId}/${cardType}`,
    },
    {
      label: "Questions",
      link: "",
    },
  ];
  const [deleteData, setDeleteQn] = useState<any>(null);
  const [search, setSearch] = useState<QnAPIParams>({
    search: "",
    from: "",
    limit: 30,
    page: 1,
  });
  const {
    executeApi: getQns,
    loading,
    data,
    error,
  } = useApi<GetQuestionsResponse, { subCategoryId: string } & QnAPIParams>(
    getQnsBySubCatgory,
    {
      onComplete: (data) => {
        console.log("Data loaded successfully:", data);
      },
      onError: (error) => {
        console.error("Error occurred:", error);
      },
    }
  );

  const route = useNavigate();

  const {
    isOpen: isDeleteOpen,
    openPopUp: OpenDeletePoPup,
    closePopUp: closeDeletePopup,
  } = usePopUp();

  useEffect(() => {
    if (subCategoryId) {
      getQns({ subCategoryId: subCategoryId, ...search });
    }
  }, [subCategoryId, ...Object.values(search)]);

  const { page, pageCount } = getPageDetails(
    data?.data.total_count || 0,
    Number(search.limit),
    Number(search.page)
  );

  const handleNav = (type: "add" | "edit", qnId = "") => {
    const url =
      type === "add"
        ? replacePlaceholders(routes.addQuestions, {
            category: category as string,
            subCategory: subCategory as string,
            subCategoryId: subCategoryId as string,
            type,
          })
        : replacePlaceholders(routes.editQuestions, {
            category: category as string,
            subCategory: subCategory as string,
            subCategoryId: subCategoryId as string,
            qnId,
            type,
          });

    route(url);
  };

  return (
    <div className={classes.container}>
      <DeleteQn
        qn={deleteData}
        isDeleteOpen={isDeleteOpen}
        closeDeletePopUp={(hasDone) => {
          closeDeletePopup();
          if (hasDone) {
            getQns({ subCategoryId: subCategoryId as string, ...search });
          }
        }}
      />
      <MainWrapper>
        <div className={classes.filterOut}>
          <FilterDetails
            activeIndex={0}
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
                handleNav("add");
              }
            }}
            showSuggestion={false}
          />
        </div>
        <div className={classes.breadCrumb}>
          <Breadcrumb sections={sections} />
        </div>
        <PageAnimation>
          <PageWrapper title="Help Centre">
            <div className={classes.tableWrapper}>
              {/* Loading and Error States */}
              {loading && <Loader />}
              {error && (
                <DataError
                  btnProps={{
                    onClick: () => {
                      getQns({
                        subCategoryId: subCategoryId as string,
                        ...search,
                      });
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
                        <th
                          className={classes.action}
                          onClick={() => {
                            handleNav("add");
                          }}
                        >
                          + Add new
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.data?.questions?.map((item) => (
                        <tr key={item.ID}>
                          <td>{item.title}</td>
                          <td>
                            {new Date(item.UpdatedAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                handleNav("edit", String(item.ID));
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
                            <NoDataFound
                              title={`Sorry No Questios found  under ${subCategory}`}
                            />
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

export default PrimarySectionQns;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Components/Button/Button";
import FilterDetails from "../../common/Components/FilterDetails/FilterDetails";
import HTMLParser from "../../common/Components/HTMLParser/HTMLParser";
import Delete from "../../common/Components/Icons/Delete";
import Edit from "../../common/Components/Icons/Edit";
import PageAnimation from "../../common/Components/PageAnimation/PageAnimation";
import PopUp from "../../common/Components/PopuUp/PopuUp";
import usePopUp from "../../common/Components/PopuUp/usePopUp";
import Table2 from "../../common/Components/Table2/Table2";
import MainWrapper from "../../common/Layout/PageWrapper/PageWrapper";
import PageWrapper from "../../common/Layout/TableWrapper/TableWrapper";
import DataError from "../../common/UI/DataError/DataError";
import Loader from "../../common/UI/Loader/Loader";
import NoDataFound from "../../common/UI/NoDataFound/NoDataFound";
import { routes } from "../../constants/routes";
import useApi from "../../hooks/useAPI";
import useMutate from "../../hooks/useMutate";
import useToast from "../../hooks/useToast";
import { deleteAnnoucement, getAnnouncements } from "../../services/announcements";
import { PageParams } from "../../services/tickets";
import { getPageDetails, goToIdPage } from "../../utils/commonUtils";
import { convertISOToLongDateFormat } from "../../utils/date";
import classes from "./Announcements.module.scss";


interface Category {
  id: number;
  name: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface Announcement {
  id: number;
  name: string;
  status: "active" | "inactive"; // Use union type for status
  heading: string;
  description: string;
  thumbnail_url: string;
  banner_url: string;
  hashtags: string[] | null; // Optional array of strings
  category_id: number;
  Category: Category; // Nested object for category
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

interface AnnouncementsResponse {
  announcements: Announcement[];
  total: number;
  page: number;
  page_size: number;
}

export const announcementTabs = [
  {
    name: "Overview",
  },
  {
    name: "Create",
    hasImage: true,
    Imgurl: "/assets/images/add.png",
    action: "trigger",
    type: "button",
  },
];

const AnnouncementListing = () => {
  const [search, setSearch] = useState<PageParams>({
    search: "",
    from: "",
    limit: 20,
    page: 1,
  });
  const {
    executeApi: getBlogs,
    loading,
    data,
    error,
  } = useApi<{ data: AnnouncementsResponse }, PageParams>(getAnnouncements, {
    onComplete: (data) => {
      console.log("Data loaded successfully:", data);
    },
    onError: (error) => {
      console.error("Error occurred:", error);
    },
  });

  const { triggerToast } = useToast();



  useEffect(() => {
    getBlogs({ ...search });
  }, [...Object.values(search)]);

  const { page, pageCount } = getPageDetails(
    data?.data.total || 0,
    Number(search.limit),
    Number(search.page)
  );

  const navigate = useNavigate();
  console.log(data?.data, "sd");

  const {
    isOpen: isDeleteOpen,
    openPopUp: OpenDeletePoPup,
    closePopUp: closeDeletePopup,
  } = usePopUp();

  const [deleteData, setDeleteCategory] = useState<null | Announcement>(null);

  const { loading: deleteAPILoading, executeApi: deleteBlogAPI } = useMutate(
    deleteAnnoucement,
    {
      onComplete: (result) => {
        triggerToast("Announcement  deleted successfully", "success");
        setDeleteCategory(null);
        closeDeletePopup();
        getBlogs({ ...search });
      },
      onError: (errorMessage) => {
        triggerToast(errorMessage, "error");
        console.log("Error deleting S:", errorMessage);
      },
    }
  );

  const handleDeleteAPI = () => {
    if (deleteData) {
      deleteBlogAPI(String(deleteData.id));
    }
  };

  return (
    <div className={classes.container}>
      <PopUp
        header={`Delete Announcement`}
        isOpen={isDeleteOpen}
        onClose={() => {
          closeDeletePopup();
        }}
      >
        <h2>Are you sure you want to delete {deleteData?.name}</h2>
        <div className="submitBtns">
          <Button
            onClick={handleDeleteAPI}
            theme="neon"
            disabled={!deleteData || deleteAPILoading}
          >
            {deleteAPILoading ? "Submitting..." : "Delete"}
          </Button>
          <Button
            onClick={(e) => {
              closeDeletePopup();
            }}
            theme="danger"
          >
            Cancel
          </Button>
        </div>
      </PopUp>
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
            tabsArr={announcementTabs}
            searching={false}
            // handleDateSelect={({ selection }) => {
            //   setSearch((prev) => ({
            //     ...prev,
            //     from: convertToMMDDYY(selection.startDate),
            //   }));
            // }}
            triggerAction={(e) => {
              console.log(e);
              if (e === announcementTabs[1].name) {
                navigate(routes.createAnnouncements);
              }
            }}
            showSuggestion={false}
          />
        </div>
        <div className={classes.breadCrumb}>
          {/* <Breadcrumb sections={sections} /> */}
        </div>
        <PageAnimation>
          <PageWrapper title="All Announcements">
            <div className={classes.tableWrapper}>
              {/* Loading and Error States */}
              {loading && <Loader />}
              {error && (
                <DataError
                  btnProps={{
                    onClick: () => {
                      getBlogs({ ...search });
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
                        <th>HEADING</th>
                        <th>PUBLISHED DATE</th>
                        <th>STATUS</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.data?.announcements?.map((item) => (
                        <tr
                          key={item.id}
                        >
                          <td>{item.name}</td>
                          <td>{HTMLParser(item.heading)}</td>
                          <td>
                            {convertISOToLongDateFormat(item?.created_at)}
                          </td>
                          <td>{item.status}</td>
                          <td>
                            <button
                              onClick={() => {
                                const url =   goToIdPage(routes.editAnnouncement , String(item.id))
                                navigate(url)
                              }}
                            >
                              <Delete />
                            </button>
                            <button
                              onClick={() => {
                                setDeleteCategory(item);
                                OpenDeletePoPup()
                              }}
                            >
                              <Edit />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {/* Empty State */}
                      {(!data?.data?.announcements ||
                        data?.data?.announcements?.length === 0) && (
                        <tr>
                          <td colSpan={5}>
                            <NoDataFound title={`Sorry No Announcements found`} />
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

export default AnnouncementListing;

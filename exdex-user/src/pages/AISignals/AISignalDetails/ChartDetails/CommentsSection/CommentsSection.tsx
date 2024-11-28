import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Pagination from "../../../../../common/Components/Pagination/Pagination";
import useApi from "../../../../../hooks/useAPI";
import {
  getComments,
  updateComments,
  updateLike
} from "../../../../../services/exdexCards";
import {
  getPageDetails,
  scrollToElementWithMargin,
} from "../../../../../utils/commonutils";
import Comments from "./Comments/Comments";
import CommentsLoader from "./CommentsLoader/CommentsLoader";
import styles from "./CommentsSection.module.scss";
// import CommonListComment from './CommonListComment'; // Assuming you have a CommonListComment component

type Tab = {
  label: string;
  commentType: string;
};

const tabs: Tab[] = [
  { label: "All", commentType: "comment" },
  { label: "Opinions", commentType: "comment" },
  { label: "Questions", commentType: "question" },
  { label: "My Questions", commentType: "question" },
];

export interface CommentData {
  id: number;
  user_id: number;
  comment_id: number;
  table: string;
  table_id: number;
  comment: string;
  total_like: number;
  total_dislike: number;
  total_comment: number;
  comment_level: number;
  status: string;
  updated_at: string;
  created_at: string;
  comment_type: string;
  user_like: number;
  profile_pic: string;
  user_name: string;
  total: number;
  Images: string | null;
  replied_user_name: string;
  replies: CommentData[];
  parentId?: number;
  showReplies: boolean;
  showReplyPost: boolean;
  showReadMore: boolean;
}
interface CommentsSectionProps {
  trade_view_id: number;
  table?:string
}

const CommentsSection = forwardRef(
  ({ trade_view_id  , table ="trading_views"}: CommentsSectionProps, ref)  => {
  const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [data, setData] = useState<CommentData[]>([]);
  const [pageConfig, setPageConfig] = useState({ page: 1, perPage: 10 , mostPoular:false });
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { executeApi, loading } = useApi<
    { data: { comments: CommentData[]; total: number } },
    {apiParams : string , table : string}
  >(getComments, {
    keepBeforeRefresh: true,
    onComplete: (d) => {
      if (d.data.comments) {
        d?.data?.comments.forEach((x) => {
          x.showReplies = false;
          x.showReadMore = false;
          x.showReplyPost = false;
          x.replies = [];
        });
        setData(d.data.comments);
        setTotal(d.data.total);
      } else {
        setData([]);
      }
    },
  });
  const { executeApi: updateCommentAPI } = useApi(updateComments, {
    onComplete: () => {
      getInitialData();
    },
  });


  const getInitialData = () => {
    let apiUrl = `&table_id=${trade_view_id}&comment_type=${selectedTab?.commentType}&page=${pageConfig.page}&per_page=${pageConfig.perPage}`;
    if(pageConfig.mostPoular){
      apiUrl = apiUrl + `&filter=most-popular`
    }
    executeApi({apiParams :apiUrl , table});
  };



  const isAPILoading = loading || isLoading;

  useEffect(() => {
    getInitialData();
  }, [selectedTab, pageConfig]);


  const resetAndRefresh =()=>{
    setPageConfig({...pageConfig ,page :1, perPage:10 });
    setSelectedTab(tabs[0])
  }


  useImperativeHandle(ref, () => ({
    resetAndRefresh,
  }));

  const handleTabSwitch = (tab: Tab) => {
    setSelectedTab(tab);
    // Add logic for handling commentType if necessary
  };

  const filterBy = () => {
    setPageConfig({...pageConfig , mostPoular : !pageConfig.mostPoular})
  };

  const comments = [...data];

  const refreshData = (
    data: CommentData[],
    id: number,
    repData: CommentData[]
  ) => {
    console.log(repData);
    for (let comment of data) {
      if (comment.id === id) {
        comment.replies = [...repData];
        setData([...data]);
        return true;
      }
      if (comment.replies && comment.replies.length > 0) {
        const foundInReplies = refreshData(comment.replies, id, repData);
        if (foundInReplies) {
          comment.replies = [...repData];
          setData([...data]);
        }
      }
    }
    console.log(data, "dats");
  };

  const { page: calcPage, pageCount: calcPageCount } = getPageDetails(
    total || 0,
    Number(pageConfig.perPage),
    Number(pageConfig.page)
  );

  const saveComments = (updateComment: {
    comment: string;
    comment_id: number;
    comment_level: number;
  }) => {
    const frmData = new FormData();
    frmData.append("comment", updateComment.comment);
    frmData.append("comment_id", String(updateComment.comment_id));
    frmData.append("table_id", String(trade_view_id));
    frmData.append("table", table );
    frmData.append("comment_level", String(updateComment.comment_level + 1));
    frmData.append("comment_type", selectedTab.commentType);
    updateCommentAPI(frmData);
  };

  const getRepliesOf = (comment_id: number) => {
    let apiUrl = `&table_id=${trade_view_id}&comment_type=${selectedTab?.commentType}&comment_id=${comment_id}`;
    getComments({apiParams : apiUrl , table}).then((reps) => {
      console.log(reps.data?.data);
      const datRef = [...data];
      datRef.forEach((d) => {
        if (d.id === comment_id) {
          d.replies =
            reps.data.data.comments.map((c: any) => {
              return { ...c, parentId: comment_id };
            }) || [];
          d.showReplies = true;
        }
      });
      setData(datRef);
    });
  };

  return (
    <div className="listComments__container">
      <div
        className={`${styles.popular} ${styles.showMobile} ${
          pageConfig.mostPoular ? styles.isFiltered : ""
        }`}
        onClick={filterBy}
      >
        <img
          src="/assets/images/signal_cards/mostPopular.png"
          alt="tech analysis"
          className={styles.popularImg}
        />
        <span className="label-mobile-mostPopular">Most popular</span>
      </div>

      <ul className={styles.tabView} id="commentsTab">
        {tabs.map((tab) => (
          <li
            key={tab.label}
            className={`${styles.tabItem} ${
              selectedTab.label === tab.label ? styles.selected : ""
            }`}
            onClick={() => handleTabSwitch(tab)}
          >
            {tab.label}
          </li>
        ))}
        <li
          className={`${styles.popular} ${styles.hideMobile} ${
            pageConfig.mostPoular ? styles.isFiltered : ""
          }`}
          onClick={filterBy}
        >
          <img
            src="/assets/images/signal_cards/mostPopular.png"
            alt="tech analysis"
            className={styles.popularImg}
          />
          <span>Most popular</span>
        </li>
      </ul>
      <div className={styles.commentsWraper}>
        {isAPILoading && <CommentsLoader />}
        {comments?.map((x) => {
          return (
            <Comments
              key={x.id}
              {...x}
              updateComments={(updateComment) => {
                saveComments(updateComment);
              }}
              getReplies={(comment_id) => {
                getRepliesOf(comment_id);
              }}
              updateLikes={(l) => {
                const apiData = {
                  comment_type: x.comment_type,
                  ...l,
                };
                console.log(l);

                updateLike({ apiData, table_id: trade_view_id }).then((a) => {
                  if (a.data) {
                    let apiUrl = `table_id=${trade_view_id}&comment_type=${selectedTab?.commentType}`;
                    if (l.parentId) {
                      apiUrl =
                        apiUrl +
                        `&comment_id=${l.parentId ? l.parentId : l.comment_id}`;
                    }
                    getComments({apiParams :apiUrl + `&page=${1}&per_page=${20}` , table}).then(
                      (comm) => {
                        if (l.parentId) {
                          refreshData(
                            comments,
                            apiData.comment_id,
                            comm.data.data.comments.map((j: any) => {
                              return {
                                ...j,
                                ...(apiData.parentId && {
                                  parentId: apiData.parentId,
                                }),
                              };
                            })
                          );
                        } else {
                          // const updatedData = comm.data.data.comments.map
                          setData(comm.data.data.comments);
                        }
                      }
                    );
                  }
                });
              }}
            />
          );
        })}
      </div>

      {total > 0 && (
        <Pagination
          pageCount={calcPageCount}
          initialPage={calcPage}
          onPageChange={(p) => {
            console.log("fetched");
            // scrollToElementWithMargin("commentsTab");
            setPageConfig({ ...pageConfig, page: p.selected + 1 });
          }}
        />
      )}


      {/* <CommonListComment
        selectedTab={selectedTab}
        comments={comments}
        totalComments={totalComments}
        saveLikes={saveLikes}
        getGrandChild={getReplies}
        saveReply={saveReplyData}
        getByPagination={paginateTo}
      /> */}
    </div>
  );
});

export default CommentsSection;

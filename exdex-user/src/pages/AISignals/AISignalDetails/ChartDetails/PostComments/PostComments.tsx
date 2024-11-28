import { useEffect, useRef, useState } from "react";
import CommonPostComment from "./CommonPostComment/CommonPostComment";
import styles from "./PostComments.module.scss";
import { updateComments } from "../../../../../services/exdexCards";
import useApi from "../../../../../hooks/useAPI";

const tabTypes = [
  { name: "Point of view", type: "comment" },
  { name: "Question", type: "question" },
];

const PostComments = ({
  onSaveComment,
  onTabSwitch,
  trade_view_id,
  table = "trading_views"
}: {
  onSaveComment: () => void;
  onTabSwitch: (tab: string) => void;
  trade_view_id : number,
  table?: string
}) => {
  const [selectedTab, setSelectedTab] = useState<any>(tabTypes[0]);
  const commentsRef = useRef<typeof CommonPostComment>();
  const { loading, executeApi: commentsAPI } = useApi(updateComments, {
    onComplete: () => {
      //@ts-ignore
      commentsRef.current && commentsRef.current?.resetData();
      onSaveComment()
    },
  });

  useEffect(() => {
    onTabSwitch(selectedTab);
  }, [selectedTab]);

  const handleCommentAPI = ({ image, comments }:any) => {
    console.log(image , comments)
    const reqData = new FormData();
    reqData.append("comment", comments.trim());
    if (image) {
      reqData.append("image", image);
    }
    // reqData.append('comment_id', data.comment_id);
    // reqData.append('comment_level', data.comment_level);
    reqData.append("comment_type", selectedTab.type);
    reqData.append("table", table);
    reqData.append("table_id", (trade_view_id).toString());
    commentsAPI(reqData)
  };

  return (
    <div>

      <ul className={styles.tabView}>
        {tabTypes.map((t) => {
          return (
            <li
              className={selectedTab.name === t.name ? styles.selected : ""}
              onClick={() => setSelectedTab(t)}
            >
              {t.name}
            </li>
          );
        })}
      </ul>
      <CommonPostComment
        onCommentsAPI={(data) => {
          handleCommentAPI(data);
        }}
        ref={commentsRef}
      />
    </div>
  );
};

export default PostComments;

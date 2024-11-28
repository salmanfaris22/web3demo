import React, { useEffect, useRef, useState } from "react";
import styles from "./Comments.module.scss";
import { CommentData } from "../CommentsSection";
import PostComments from "../../PostComments/PostComments";
import CommonPostComment from "../../PostComments/CommonPostComment/CommonPostComment";
import { format, parseISO } from "date-fns";
import RatingAndReview from "../../../RatingAndReview/RatingAndReview";

const Thumbs = ({
  user_like,
  total_like,
  total_dislike,
  toggleLike,
}: {
  user_like: number;
  total_like: number;
  total_dislike: number;
  toggleLike: (t: "like" | "liked" | "unlike" | "unliked") => void;
}) => {
  return (
    <div className={styles.likes}>
      {/* Like Section */}
      <div>
        <span className={styles["like-unlike"]}>
          {user_like !== 1 ? (
            <img
              src="/assets/images/signal_cards/like.svg"
              alt="like"
              onClick={() => {
                toggleLike("like");
              }}
              style={{ opacity: 0.5 }}
            />
          ) : (
            <img
              src="/assets/images/signal_cards/liked_white.png"
              alt="liked"
              onClick={() => {
                toggleLike("liked");
              }}
              style={{ opacity: 1 }}
            />
          )}
        </span>
        <span style={{ opacity: user_like === 1 ? 1 : 0.5 }}>
          ({total_like})
        </span>
      </div>

      {/* Dislike Section */}

      <div>
        <span className={styles["like-unlike"]}>
          {user_like !== 2 ? (
            <img
              src="/assets/images/signal_cards/dislike.svg"
              alt="dislike"
              onClick={() => {
                toggleLike("unlike");
              }}
              style={{ opacity: 0.5 }}
            />
          ) : (
            <img
              src="/assets/images/signal_cards/disliked_white.png"
              alt="disliked"
              onClick={() => {
                toggleLike("unliked");
              }}
              style={{ opacity: 1 }}
            />
          )}
        </span>
        <span style={{ opacity: user_like === 2 ? 1 : 0.5 }}>
          ({total_dislike})
        </span>
      </div>
    </div>
  );
};

const Comments = (
  dataProps: CommentData & {
    updateLikes: (d: {
      like: number;
      comment_id: number;
      parentId: number;
      totalComments: number;
    }) => void;
    getReplies: (id: number) => void;
    parentId?: number;
    updateComments: ({
      comment,
    }: {
      comment: string;
      images: File;
      comment_level: number;
      comment_id: number;
    }) => void;
  }
) => {
  const [showReplyIp, setShowReplyIp] = useState(dataProps?.showReplyPost);
  const [readMore, setReadMore] = useState(dataProps?.showReadMore);
  const [showReplies, setShowReplies] = useState(dataProps?.showReplies);
  const [props, setProps] = useState<CommentData | null>(null);
  const [showReadMore, setShowReadMore] = useState(false);
  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // console.log(dataProps);
    setShowReplyIp(dataProps.showReplyPost);
    setProps(dataProps);
    setReadMore(dataProps?.showReadMore);
    setShowReplies(dataProps?.showReplies);
  }, [dataProps]);

  const handleReplyClick = () => {
    setShowReplyIp(!showReplyIp);
  };

  const getProfileImg = () => {
    let profilePicture = props?.profile_pic;
    if (profilePicture === "") {
      return "/assets/images/signal_cards/user-black.svg";
    } else {
      /**
       * !replace with actual implementation
       */
      return "" + profilePicture;
    }
  };

  const formatComment = (comment: any) => {
    return comment?.replaceAll("\n", "<br>");
  };

  // useEffect(()=>{
  //   if(commentRef.current){
  //     const elem =commentRef.current;
  //     if (elem) {
  //       console.log(elem ,"elem")
  //       const viewportWidth = elem.clientWidth;
  //       const offsetheight = elem.offsetHeight;
  //       const lineHeight = parseInt(
  //         window.getComputedStyle(elem, null).getPropertyValue("line-height")
  //       );
  //       const averageCharacterWidth = 5;
  //       const maxCharactersPerLine = Math.floor(
  //         viewportWidth / averageCharacterWidth
  //       );
  //       const lines: any[] = [];
  //       const hasMoreThanTwoLines = lines.length > 2;
  //   }
  // }
  // },[commentRef.current])

  const readMoreLess = (comment?: string) => {
    setTimeout(() => {
      const elem = document.getElementById(`desc-${props?.id}`);
      if (elem) {
        const offsetheight = elem.offsetHeight;
        const lineHeight = parseInt(
          window.getComputedStyle(elem, null).getPropertyValue("line-height")
        );
        const hasMoreThanTwoLines = offsetheight / lineHeight > 3;
        console.log(hasMoreThanTwoLines, offsetheight, lineHeight);
        setShowReadMore(hasMoreThanTwoLines);
      }
    }, 10);
  };

  readMoreLess();

  return (
    props && (
      <div>
        <div className={styles.commentContainer}>
          <div className={styles.commentHead}>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <span className={styles.profile}>
                <img
                  src={getProfileImg()}
                  alt="Profile pic"
                  decoding="async"
                  loading="eager"
                />
              </span>
              <div className={styles.commentOtherIn}>
                <div className={styles.mainHead}>
                <span className={`${styles.userName} textEllipsis`}>
                  {props?.user_name}
                </span>
                <span className={styles.date}>
                  {format(parseISO(props?.created_at), "MM/dd/yy, h:mm a")}
                </span>
                </div>
                <RatingAndReview isViewMode users_rating={2} onUpdateRating={() => {}} />
                <div
            className={`${styles.description}
           ${readMore && styles.seeMore} `}
          >
            {props?.replied_user_name && (
              <>
                <span className={styles["repliedFrom"]}>
                  @{props?.replied_user_name}
                </span>
                &nbsp;
              </>
            )}
            {props?.comment && (
              <span
                ref={commentRef}
                id={`desc-${props?.id}`}
                className={styles.replyComment}
                dangerouslySetInnerHTML={{
                  __html: formatComment(props?.comment),
                }}
              ></span>
            )}
          </div>
          <div className={styles.repliesList}>
            {props?.total_comment ? Number(props?.total_comment) !== 0 && (
              <p className={styles.listComments__container_viewMoreWeb}>
                <span className={styles.replyText}>
                  {props?.total_comment} Replies
                </span>
                <button
                  type="button"
                  className={styles.viewReplyBtn}
                  onClick={() =>
                    showReplies
                      ? setShowReplies(false)
                      : dataProps?.getReplies(props?.id)
                  }
                >
                  <img
                    decoding="async"
                    loading="eager"
                    src="/assets/images/signal_cards/replyCommentDown.png"
                    style={{
                      transform: dataProps?.showReplies ? "rotate(180deg)" : "",
                    }}
                    alt="profile"
                  />
                </button>
              </p>
            ) : null}

            <div className={`${styles.webthumbs}`}>
              <Thumbs
                total_dislike={props?.total_dislike}
                total_like={props?.total_like}
                user_like={props?.user_like}
                toggleLike={(t) => {
                  const data: any = {
                    like: t === "like" ? 1 : t === "unlike" ? 2 : 0,
                    comment_id: props?.id,
                    parentId: props?.parentId,
                  };
                  console.log("data", data);
                  dataProps?.updateLikes(data);
                }}
              />
            </div>

            <p className={styles.replyCommentLabel} onClick={handleReplyClick}>
              Reply
            </p>
          </div>
              </div>
            </div>
          </div>
   
          <div
            className="listComments__readMore"
            onClick={() => {
              setReadMore(!readMore);
            }}
          >
            {showReadMore && (
              <>
                <div className={styles.readMore}>
                  {" "}
                  {readMore ? "Read less" : "Read more"}
                </div>
              </>
            )}
          </div>

        </div>
        {showReplyIp && (
          <div className={styles.replieInp}>
            <CommonPostComment
              onCommentsAPI={(c) => {
                dataProps.updateComments({
                  comment: c.comments,
                  images: c.image,
                  comment_level: dataProps?.comment_level,
                  comment_id: dataProps.id,
                });
              }}
            />
          </div>
        )}
        {showReplies &&
          props?.replies.map((rp) => {
            console.log(rp, "reps");
            return (
              <div id="rps" className={styles.repliesMessages}>
                {" "}
                <Comments
                  {...rp}
                  updateComments={dataProps.updateComments}
                  key={rp.id}
                  updateLikes={dataProps?.updateLikes}
                  getReplies={dataProps?.getReplies}
                />
              </div>
            );
          })}
      </div>
    )
  );
};

export default Comments;

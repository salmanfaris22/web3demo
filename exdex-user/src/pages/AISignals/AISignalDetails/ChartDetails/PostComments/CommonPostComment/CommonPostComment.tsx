import emojis from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import useToast from "../../../../../../hooks/useToast";
import styles from "./CommonPostComment.module.scss";

interface CommonPostCommentProps {
  onCommentsAPI: ({
    comments,
    image,
  }: {
    comments: string;
    image: File;
  }) => void;
}

const CommonPostComment = forwardRef(
  ({ onCommentsAPI }: CommonPostCommentProps, ref) => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [selectedImageUrls, setSelectedImageUrls] = useState<any>([]);
    const [showEmojiPicker, setShowImojiPicker] = useState(false);
    const [comments, setComments] = useState("");
    const containerRef = useRef<any>(null);

    const uniqueId = "editor";
    const { triggerToast } = useToast();
    const acceptImage = (type: string) =>
      ["image/png", "image/jpeg", "image/jpg"].includes(type);

    const onBlur = () => {
      // setShowImojiPicker(false);
    };

    const toggleEmojiPicker = () => setShowImojiPicker(!showEmojiPicker);

    const resetData = () => {
      setComments("");
      setSelectedImages([]);
      setSelectedImageUrls([]);
    };

    const buildCommentsAPI = () => {
      onCommentsAPI({ comments, image: selectedImages[0] });
    };

    useImperativeHandle(ref, () => ({
      resetData,
    }));

    const addComments = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        if (!e.altKey) {
          setComments(comments.trim());
          buildCommentsAPI();
        } else {
          setComments(comments + `\n`);
          document.getElementById(uniqueId)?.scroll(0, 100);
        }
      }
    };

    const selectCommentImage = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const mimeType = file.type;

        if (!mimeType.match(/image\/*/)) {
          triggerToast("Only images are uploaded", "error");
          return;
        }

        const imageSize = Math.round(file.size / 1000);
        if (imageSize >= 2048) {
          triggerToast("File size should be less than 2 MB", "error");
          return;
        }

        if (acceptImage(file.type) && event.target) {
          setSelectedImages([...selectedImages, file]);
          const reader = new FileReader();
          reader.onload = (e) => {
            //@ts-ignore
            setSelectedImageUrls([...selectedImageUrls, e.target.result]);
          };
          reader.readAsDataURL(file);
        } else {
          triggerToast(
            "Only images of png and jpg formats are accepted",
            "error"
          );
        }
      }
    };

    const isUserNameExists = () => {
      /**
       * !update with actual logic
       */
      return false;
    };

    return (
      <div className={styles.commentsContainer} onMouseLeave={onBlur}>
        <form>
          <div className={`${styles.addComments}`}>
            <div className={styles.commentBoxContainer}>
              <div className={styles.commentSection}>
                <textarea
                  placeholder="Enter text here..."
                  value={comments}
                  onFocus={onBlur}
                  onBlur={onBlur}
                  className={`${styles.commentInput} ${styles.commentsBox}`}
                  onKeyUp={(e) => {
                    addComments(e);
                  }}
                  id={uniqueId}
                  disabled={isUserNameExists()}
                  onChange={(e) => setComments(e.target.value)}
                  rows={1}
                ></textarea>

                <div className={styles.emojiContainer}>
                  {
                    <div
                      className={styles.popupOuter}
                      style={{
                        visibility: showEmojiPicker ? "visible" : "hidden",
                        width: "100%",
                        zIndex: showEmojiPicker ? 10 : -1,
                      }}
                    >
                      {showEmojiPicker && (
                        <div
                          className={styles.popupOverlay}
                          onClick={toggleEmojiPicker}
                        ></div>
                      )}
                      <div
                        className={styles.popupContent}
                        ref={containerRef}
                        style={{ zIndex: 10, width: "100%" }}
                      >
                        <Picker
                          data={emojis}
                          className={"scx"}
                          onEmojiSelect={(emojiEv: any) => {
                            console.log(emojiEv, "emoj");
                            const text =
                              comments !== undefined
                                ? `${comments}${emojiEv.native}`
                                : `${emojiEv.native}`;
                            setComments(text);
                          }}
                        />
                      </div>
                    </div>
                  }
                </div>

                {selectedImageUrls.length > 0 && (
                  <div className={styles.imageContainer}>
                    {selectedImageUrls.map((img: string, i: number) => (
                      <div className={styles.imgWrap} key={i}>
                        <div
                          className={styles.closeIcon}
                          onClick={() => {
                            setSelectedImageUrls([]);
                            setSelectedImages([]);
                          }}
                        >
                          <img
                            src="/assets/images/signal_cards/close.png"
                            alt="close"
                          />
                        </div>
                        <img src={img} alt="uploaded" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.imgSelectWrap}>
                <input
                  type="file"
                  disabled={selectedImageUrls.length >= 1}
                  onChange={selectCommentImage}
                  accept="image/png,image/jpeg,image/jpg"
                />
                <img
                  src="/assets/images/signal_cards/img-select.png"
                  alt="Select"
                  className={styles.imageSelect}
                />
              </div>

              <img
                src="/assets/images/signal_cards/bi_emoji-smile.png"
                alt="smile"
                className={styles.smiley}
                onClick={toggleEmojiPicker}
              />
            </div>
          </div>

          <span
            className={styles.userNameValidation}
            style={{ display: isUserNameExists() ? "flex" : "none" }}
          >
            <a href="/public/customer-profile">Click here</a> to update your
            Name in order to add comments.
          </span>

          <div className={styles.postComment}>
            <button
              type="button"
              className={`${styles.btn} ${styles.post_btn}`}
              disabled={
                isUserNameExists() ||
                (comments.trim() === "" && selectedImageUrls.length === 0)
              }
              onClick={buildCommentsAPI}
            >
              Post Comment{" "}
            </button>
          </div>
        </form>
      </div>
    );
  }
);

export default CommonPostComment;

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./BlogImageInput.module.scss";
import UploadFile from "../Icons/UploadFile";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/toastSlice";
import DeleteWhite from "../Icons/DeleteWhite";

const BlogImageInput = ({
  placeholder,
  onUpload,
  imagePreviewData = null
}: {
  placeholder: string;
  onUpload: (image: File | null) => void;
  imagePreviewData? : string | null

}) => {
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(imagePreviewData);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(()=>{
    if(imagePreviewData){
      setImagePreview(imagePreviewData)
    }
  } , [imagePreviewData])

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        if (file.size <= 10 * 1024 * 1024) {
          setImageFile(file); // Save the file object
          setImagePreview(URL.createObjectURL(file)); // Save the image preview URL
          onUpload(file);
        } else {
          setImageFile(null);
          setImagePreview(null);
          onUpload(null);
          e.target.value = ""; // Clear the selected file
          dispatch(
            showToast({
              message: "Image must be 250x250 pixels and less than 10MB.",
              type: "error",
              timeout: 5000,
            })
          );
        }
      };
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.fileInner}>
        {imagePreview && (
          <div className={styles.previewContainer}>
            <img
              src={imagePreview}
              alt="Uploaded Preview"
              className={styles.imagePreview}
            />
            <div className={styles.previewOverlay}>
              <div
                onClick={() => {
                  setImageFile(null);
                  setImagePreview(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
              >
                <DeleteWhite />{" "}
              </div>

              <div>Click delete to remvoe {imageFile?.name} </div>
            </div>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
        />
        <div className={styles.placeholder}>
          <div className={styles.text}>
            <UploadFile />
            <span>{placeholder}</span>
            <div className={styles.warningMessage}>*Upload Image of less than 10Mb</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogImageInput;

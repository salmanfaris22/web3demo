import React, { ChangeEvent, useRef, useState } from "react";
import styles from "./IconUploader.module.scss";
import { showToast } from "../../../store/toastSlice";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";

export interface FileUplaoder {
  onUpload: (image: File | null) => void;
  placeholder: string
}

const IconUploader = ({ onUpload , placeholder }: FileUplaoder) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        if (file.size <= 1 * 1024 * 1024) {
          setImageFile(file); // Save the file object
          onUpload(file);
        } else {
          setImageFile(null);
          onUpload(null);
          e.target.value = ""; // Clear the selected file
          dispatch(
            showToast({
              message: "Image must be 45x45 pixels and less than 1MB.",
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
      {imageFile ? (
        <div className={styles.fileName}>
          {" "}
          {imageFile?.name}
          <Button
            theme="icon"
            onClick={() => {
              setImageFile(null);
              onUpload(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
          >
            <img src="/assets/images/closeIcon.png" alt="close icon" />
          </Button>
        </div>
      ) : <div>{placeholder}</div>}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
      />
    </div>
  );
};

export default IconUploader;

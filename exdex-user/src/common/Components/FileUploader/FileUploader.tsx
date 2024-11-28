import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./FileUploader.module.scss";
import { showToast } from "../../../store/toastSlice";
import { useDispatch } from "react-redux";
import DeleteIcon from "./DeleteIcon";

export interface FileUplaoder {
  onUpload : (image : File  | null)=>void
}


const FileUploader = ({onUpload}:FileUplaoder) => {
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        if (
          img.width === 250 &&
          img.height === 250 &&
          file.size <= 10 * 1024 * 1024
        ) {
          setImageFile(file); // Save the file object
          setImagePreview(URL.createObjectURL(file)); // Save the image preview URL
          onUpload(file)
        } else {
          setImageFile(null);
          setImagePreview(null);
          onUpload(null)
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


  // useEffect(()=>{
  //   onUpload(imageFile)
  // } , [imageFile , onUpload])

  console.log(imageFile);

  return (
    <div className={styles.container}>
      {imagePreview && (
        <div className={styles.previewContainer}>
          <img
            src={imagePreview}
            alt="Uploaded Preview"
            className={styles.imagePreview}
          />
          <div className={styles.previewOverlay}>
            <div  onClick={()=>{
                setImageFile(null);
                setImagePreview(null);
                if(fileInputRef.current)
                 fileInputRef.current.value = ""
            }}> <DeleteIcon   /></div>
            
             <div>Click delete to remvoe {imageFile?.name} </div>
          </div>
        </div>
      )}

      <img src="/assets/images/upload.png" alt="Upload Icon" />

      <div>
        <span className={styles.infoText}>
          Drag and drop or <button> browse </button> performance metrics image
        </span>
      </div>
      <div className={styles.promptMessage}>
        *Upload Images of less than 10MB & 250*250
      </div>
      <input type="file"
        ref={fileInputRef}
      onChange={handleImageChange} accept="image/*" />
    </div>
  );
};

export default FileUploader;

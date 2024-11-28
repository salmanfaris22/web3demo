import React from "react";
// import './CommentsLoader.css'; // Import CSS for styling
import styles from "./CommentsLoader.module.scss";

const generateRandomWidths = () => {
  // Generate 3 random widths between 30% and 100%
  return Array.from({ length: 25 }, () => Math.floor(Math.random() * 70) + 30);
};

const CommentsLoader = () => {
  const randomWidths = generateRandomWidths();

  return (
    <div className={styles.commentsLoader}>
      {randomWidths.map((width, index) => (
        <div
          key={index}
          className="img-loader"
          style={{
            width: `${width}%`,
            position: "relative",
            height: "10px",
            marginBottom: "12px",
          }}
        >
          <div>
            <div className="wave-container">
              <div className="wave"></div>
            </div>
          </div>
          <div className="wave-container">
            <div className="wave"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsLoader;

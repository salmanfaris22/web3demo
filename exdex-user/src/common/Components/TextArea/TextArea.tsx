import React, { TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.scss";

const TextArea = (
  props: TextareaHTMLAttributes<HTMLTextAreaElement> & {
    infoText?: string;
  }
) => {
  const { infoText, ...resr } = props;

  return (
    <div className={styles.textAreaWrap}>
      {infoText && <div className={styles.warningText}>{infoText}</div>}
      <textarea {...resr} />
    </div>
  );
};

export default TextArea;

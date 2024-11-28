import React from "react";
import styles from "./TelInput.module.scss";
import TextInput, { TextInputProps } from "../TextInput/TextInput";

const NumOnlyInput: React.FC<TextInputProps> = ({ ...textProps }) => {
  return (
    <TextInput
      {...textProps}
      type="text"
      onChange={(e) => {
        console.log("--")
        const re = /^[0-9\b]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
          console.log("props change")
          textProps.onChange && textProps.onChange(e);
        }else{
          e.preventDefault()
          e.target.value = ''
        }
      }}
    />
  );
};

export default NumOnlyInput;

import React, { useEffect, useState } from "react";
import classes from "./LabelInput.module.scss";

interface LabelInputProps {
  label?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  placeholder?: string;
  type?: string;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  isTagInput?: boolean;
  onTagChange?: (data: any) => any;
  inputType?: "input" | "select";
  options?: string[];
  initialTags?: any[];
}

const LabelInput: React.FC<LabelInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  name,
  disabled = false,
  readOnly = false,
  isTagInput = false,
  onTagChange,
  inputType = "input",
  options = [],
  initialTags = [],
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (onTagChange) {
      onTagChange(tags);
    }
  }, [tags]);

  useEffect(() => {
    if (initialTags && initialTags.length > 0 && tags.length === 0) {
      setTags(initialTags);
    }
  }, [initialTags]);

  console.log("tags");

  const togglePasswordVisibility = () => {
    setPasswordVisible((state) => !state);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isTagInput && value.trim() !== "") {
      e.preventDefault();
      setTags([...tags, value.trim()]);
      onChange({
        target: {
          value: "",
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleTagRemove = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isTagInput && e.target.value) {
      setTags([...tags, e.target.value]);
    }
    onChange(e);
  };

  return (
    <div className={classes.labelInputContainer}>
      {label && <label className={classes.label}>{label}</label>}
      {inputType === "input" ? (
        <div className={classes.inputWrapper}>
          <input
            readOnly={readOnly}
            type={type === "password" && isPasswordVisible ? "text" : type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={classes.input}
            name={name}
            disabled={disabled}
            onKeyDown={handleKeyDown}
          />
          {type === "password" && (
            <div className={classes.eyeIcon} onClick={togglePasswordVisibility}>
              <img src={"/assets/images/eye.png"} alt="toggle visibility" />
              {isPasswordVisible && <div className={classes.cross}></div>}
            </div>
          )}
        </div>
      ) : (
        <select
          value={typeof value === "string" ? value : ""}
          onChange={handleSelectChange}
          className={classes.input}
          name={name}
          disabled={disabled}
        >
          <option value="" disabled>
            {placeholder || "Select an option"}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
      {isTagInput && tags.length > 0 && (
        <div className={classes.tagsContainer}>
          {tags.map((tag, index) => (
            <>
              {tag && (
                <div key={index} className={classes.tag}>
                  <span>{tag}</span>
                  <button
                    type="button"
                    className={classes.removeTagButton}
                    onClick={() => handleTagRemove(index)}
                  >
                    <img src="/assets/images/closeWhite.png" alt="close" />
                  </button>
                </div>
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default LabelInput;

import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import CloseIcon from "../Icons/CloseIcon";
import TextInput, { TextInputProps } from "../TextInput/TextInput";
import styles from "./TagInput.module.scss";

export interface ITagInputProps extends TextInputProps {
  tagValues: string[];
  onTagsChange: (tags: string[]) => void;
  maxTags?: number;
}

const TagInput = ({
  tagValues,
  placeholder,
  onTagsChange,
  maxTags = 100,
}: ITagInputProps) => {
  const [tags, setTags] = useState(tagValues);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      if (inputValue) {
        addTag(inputValue);
      }
    }
  };

  const addTag = (tag: string) => {
    const newTag = tag.trim();
    if (!tags.includes(newTag) && tags.length < maxTags) {
      onTagsChange([...tags, newTag]);
      setInputValue("");
    }
  };

  const removeTag = (tag: string) => {
    onTagsChange([...tags.filter((t) => t !== tag)]);
  };

  useEffect(() => {
    console.log("tags useEffect", tagValues);
    setTags(tagValues);
  }, [tagValues]);

  return (
    <div className={styles.tagInput}>
      <TextInput
        value={inputValue}
        onKeyDown={handleInputKeyDown}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
      />
    {tags && tags.length > 0 &&  <div className={styles.tagWrapper}>
        {tags.map((t) => {
          return (
            <div className={styles.tagEntered} key={t}>
               <span>{t}</span>
              <Button
                onClick={() => {
                  removeTag(t);
                }}
                theme="icon"
              >
                <CloseIcon />{" "}
              </Button>
            </div>
          );
        })}
      </div>}
    </div>
  );
};

export default TagInput;

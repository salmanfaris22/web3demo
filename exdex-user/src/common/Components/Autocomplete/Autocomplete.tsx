import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Autocomplete.module.scss";

export interface IAutocompleteProps {
  options: any[];
  optionKey?: string;
  value?: any;
  onChange: (value: any) => void;
  completeMethod: (value: string) => void;
  isSearchig: boolean;
  placeholder?:string
}

const Autocomplete = ({
  options,
  optionKey,
  value,
  onChange,
  completeMethod,
  isSearchig,
  placeholder
}: IAutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (optionKey && value) {
      setInput(optionKey ? value[optionKey] : value);
    }
  }, [optionKey, value]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setTimeout(()=>{
        setIsOpen(false);
      },10)

    }
  };

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Debounced version of completeMethod
  const debouncedCompleteMethod = useCallback(
    debounce((value: string) => completeMethod(value), 300),
    [completeMethod]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInput(newValue);


    const hasMatchingOption = options?.some((op) =>
      optionKey
        ? op[optionKey]?.toLowerCase().includes(newValue.toLowerCase())
        : op.toLowerCase().includes(newValue.toLowerCase())
    );
    if (!hasMatchingOption || !e.target.value) {
        debouncedCompleteMethod(e.target.value);
    }
  };

  const validateAndSelectOption = () => {
  
        const matchedOption = options?.find((op) =>
            optionKey
              ? op[optionKey]?.toLowerCase() === inputValue.toLowerCase()
              : op.toLowerCase() === inputValue.toLowerCase()
          );
      
          if (matchedOption) {
            onChange(matchedOption);
          } else {
            setInput("");
            debouncedCompleteMethod("")
          }

  };

  

  return (
    <div className={styles.container} ref={containerRef}>
      <input
        autoComplete="new-password"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={validateAndSelectOption}
        placeholder={placeholder}
      />
      {isOpen && (
        <div className={styles.lisBox} role="listBox">
          {isSearchig ? (
            <div className={`${styles.lisItem}`}>Searching</div>
          ) : options?.length > 0 ? (
            options?.map((option) => {
              return (
                <div
                  onClick={() => {
                    onChange(option);
                    setInput(optionKey ? option[optionKey] : option)
                    setTimeout(() => {
                      setIsOpen(false);
                    }, 10);
                  }}
                  className={`${styles.lisItem} ${
                    optionKey
                      ? option[optionKey] === value?.[optionKey]
                      : option === value && styles.selectedListItem
                  }`}
                  key={option[optionKey ? option[optionKey] : option]}
                >
                  {optionKey ? option[optionKey] : option}
                </div>
              );
            })
          ) : (
            <div className={`${styles.lisItem}`}>No Data found,</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;

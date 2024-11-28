import React, { useEffect, useRef, useState } from "react";
import classes from "./SearchableDropdown.module.scss";
import { IMAGE_URL } from "../../../../../config";

interface SearchableDropdownProps {
  keyName?: string;
  suggestionKey?: string;
  updateParent?: (param: any) => void;
  placeholder?: string;
  fetchSuggestions: (searchTerm: string) => void;
  clearInput: boolean;
  suggestions: any[];
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  keyName = "name",
  suggestionKey = "name",
  updateParent,
  placeholder = "Search...",
  fetchSuggestions,
  clearInput = false,
  suggestions,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectItem = (item: any) => {
    setIsOpen(false);
    setSelectedItem(item);
    setSearchTerm(item[keyName]);
  };

  useEffect(() => {
    if (updateParent) {
      if (selectedItem[keyName]) {
        updateParent(selectedItem);
      }
    }
  }, [selectedItem]);

  useEffect(() => {
    if (clearInput) {
      setSearchTerm("");
    }
  }, [clearInput]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    fetchSuggestions(value);
    setIsOpen(true); // Open dropdown when typing
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`${classes.searchableDropdown} ${isOpen && classes.active}`}
      ref={containerRef}
    >
      <div className={classes.container}>
        <div className={classes.topWrap}>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className={classes.searchInput}
          />
        </div>
        {isOpen && suggestions.length > 0 && (
          <div className={classes.suggestionsContainer}>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={classes.suggestion}
                onClick={() => selectItem(suggestion)}
              >
                {suggestion.logo && (
                  <span className={classes.logoImg}>
                    <img src={`${IMAGE_URL}/${suggestion.logo}`} alt="icon" />
                  </span>
                )}
                {suggestion[suggestionKey]}{" "}
                <span className={classes.suggestionName}>
                  {suggestion[keyName]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchableDropdown;

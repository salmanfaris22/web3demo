import React, { useEffect, useRef, useState } from "react";
import classes from "./Search.module.scss";

interface SearchProps {
  placeholder: string;
  searching?: boolean;
  searchResult?: any[];
  searchNameKey?: string;
  getSearchResult?: (val: any) => void;
  selectedItem?: (val: any) => void;
  showSuggestion?: boolean;
  listDisplayKey?: string;
}
const Search: React.FC<SearchProps> = ({
  placeholder,
  searching,
  searchResult,
  searchNameKey,
  getSearchResult,
  selectedItem,
  showSuggestion = false,
  listDisplayKey = "full_name",
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchTimeout = useRef<any>();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      clearTimeout(searchTimeout.current);
    } catch (e) {
      console.log(e);
    }
    searchTimeout.current = setTimeout(() => {
      if (getSearchResult) {
        getSearchResult(searchInput);
      }
    }, 1000);
  }, [searchInput]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name == "search") {
      setSearchInput(value);
    }
  };

  const searchSelect = (item: any) => {
    if (searchNameKey) {
      setSearchInput(item[searchNameKey]);
    }
    if (selectedItem) {
      selectedItem(item);
    }
    setShowSearch(false);
  };

  return (
    <div className={classes.search} ref={searchRef}>
      <input
        type="text"
        name="search"
        placeholder={placeholder}
        value={searchInput}
        onChange={handleChange}
        onFocus={() => {
          setShowSearch(true);
        }}
      />
      {showSearch && showSuggestion && (
        <div className={classes.searchSuggestion}>
          <div className={classes.searchItemWrap}>
            {searching && (
              <div className={classes.searchItem}>Searching...</div>
            )}
            {!searching &&
              searchResult &&
              searchResult.map((item: any, index: any) => (
                <div
                  className={classes.searchItem}
                  key={item[listDisplayKey] + index}
                  onClick={() => {
                    searchSelect(item);
                  }}
                >
                  {item[listDisplayKey]}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;

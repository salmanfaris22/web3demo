import React, { FC, useState, useEffect, useRef } from "react";
import styles from "./DropdownWithPagination.module.scss";

interface Item {
  id: string;
  name: string;
}

interface ReusableDropdownPaginationProps {
  items: Item[];
  totalPages: number;
  onViewMore: () => void;
  isLoading: boolean;
  keyName?: string;
  onSelect?: (item: Item) => void;
  clear?: boolean;
  selectFirst?: boolean;
  placeholder?: string;
  currentPage: number;
}

const ReusableDropdownPagination: FC<ReusableDropdownPaginationProps> = ({
  items,
  totalPages,
  onViewMore,
  isLoading,
  keyName = "name",
  onSelect,
  clear,
  selectFirst,
  currentPage,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredItems = items.filter((item) =>
    item[keyName as keyof Item]
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (items.length && selectFirst && isFirst) {
      setSelectedItem(items[0]);
      onSelect && onSelect(items[0]);
      setIsFirst(false);
    }
  }, [items]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (clear) {
      setSelectedItem(null);
    }
  }, [clear]);

  const handleSelect = (item: Item) => {
    setSelectedItem(item);
    setIsOpen(false);
    setSearchTerm("");
    onSelect && onSelect(item);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.filterWrapDrp} ref={dropdownRef}>
      <div
        className={styles.dropdownSelected}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {selectedItem ? selectedItem[keyName as keyof Item] : placeholder}
        </span>
      </div>

      {isOpen && (
        <div className={styles.dropdownContent}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search..."
              onClick={(e) => e.stopPropagation()}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.optionsContainer}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`${styles.dropdownItem} ${
                    selectedItem?.id === item.id ? styles.selected : ""
                  }`}
                  onClick={() => handleSelect(item)}
                >
                  {item[keyName as keyof Item]}
                </div>
              ))
            ) : (
              <div className={styles.noResults}>No results found</div>
            )}

            {currentPage < totalPages &&
              !isLoading &&
              filteredItems.length > 0 && (
                <div
                  className={styles.viewMoreOption}
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewMore();
                  }}
                >
                  View More
                </div>
              )}

            {isLoading && (
              <div className={styles.loadingOption}>Loading...</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReusableDropdownPagination;

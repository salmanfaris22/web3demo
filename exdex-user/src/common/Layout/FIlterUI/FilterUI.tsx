import React, { ReactNode, useEffect, useState } from "react";
import styles from "./FilterUI.module.scss";
import Checkbox from "../../Components/Checkbox/Checkbox";
import Button from "../../Components/Button/Button";
import Settings from "../../Components/Icons/Settings";
import CloseIcon from "../../Components/Icons/CloseIcon";
import SelectInput from "../../SelectInput/SelectInput";

export interface ISubCategoryFilters {
  name: string;
  id: string;
  selected: boolean;
}

export interface IFilters  {
  category: string;
  id: string;
  filterKey?: string,
  subCategory: ISubCategoryFilters[];
}

export interface IFilterUI {
  title: string;
  description: string;
  children: ReactNode;
  filteredByCount : number;
  filters:IFilters[];
  onFilterChange: ({
    categoryId,
    subCategoryId,
    state,
  }: {
    categoryId: string;
    subCategoryId: string;
    state: boolean;
  }) => void;
  apiLoading : boolean
}

const FilterUI = ({
  title,
  description,
  filters,
  onFilterChange,
  children,
  filteredByCount,
  apiLoading
}: IFilterUI) => {
  const [selectedFilters, setSelectedFilters] = useState(filters);
  const [showMobileFilters, toggleMobileFilters] = useState(false);

  useEffect(() => {
    setSelectedFilters(filters);
  }, [filters]);

  console.log(selectedFilters);

  const generateIptions = (items: ISubCategoryFilters[]) => {
    return items.map((x) => ({ name: x.name, value: x.id }));
  };

  const findSubCategory = (categoryId: string) => {
    const category = selectedFilters.find((cat) => cat.id === categoryId);

    if (category) {
      return category.subCategory.find((sub) => sub.selected) || null;
    }

    return null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className={styles.filterBy}>
        <span>
          FilterBy <span className={styles.filterByCount}>{filteredByCount} Smart Card</span>
        </span>
      </div>
      <div className={styles.itemsSection}>
        <div className={styles.filtersSection}>
          {selectedFilters.map((filter) => {
            return (
              <div className={styles.filter}>
                <div className={styles.filterCategory}>{filter.category}</div>
                {filter.subCategory.map((subF) => {
                  return (
                    <div className={styles.filterSubCat} key={`check-${subF.id}`}>
                      <Checkbox
                        checked={subF.selected}
                        theme="square"
                        disabled={apiLoading}
                        onChange={(e) => {
                          onFilterChange({
                            categoryId: filter.id,
                            subCategoryId: subF?.id,
                            state: e.target.checked,
                          });
                          //   handleChange("check" , e.target.checked)
                        }}
                        label={subF.name}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className={styles.contentSection}>
          <div className={styles.selectedFilters}>
            {selectedFilters.map((c) =>
              c.subCategory.map((s) =>
                s.selected ? (
                  <div
                    className={styles.selectedFilter}
                    key={`selected-${s.id}`}
                  >
                    {s.name}
                    <Button
                      onClick={() => {
                        onFilterChange({
                          categoryId: c.id,
                          subCategoryId: s.id,
                          state: false,
                        });
                      }}
                      theme="icon"
                    >
                      <CloseIcon />
                    </Button>
                  </div>
                ) : null
              )
            )}
          </div>
          <div className={styles.childWrapper}>
          {children}

          </div>
        </div>
      </div>
      {!showMobileFilters && (
        <div className={styles.mobileFiltrerTrigger}>
          <Button
            theme="icon"
            onClick={() => toggleMobileFilters(!showMobileFilters)}
          >
            <Settings />
          </Button>
        </div>
      )}
      {showMobileFilters && (
        <div className={styles.mobileFilters}>
          <div className={styles.mobileFilterOverLay}></div>
          <div className={styles.filterContainer}>
            <div className={styles.filterClose}>
              {" "}
              <Button
                theme="icon"
                onClick={() => toggleMobileFilters(!showMobileFilters)}
              >
                <CloseIcon />
              </Button>{" "}
            </div>
            {selectedFilters.map((sfd) => {
              const value = findSubCategory(sfd.id);

              return (
                <div className={styles.filterSelectionWrap}>
                  {" "}
                  <SelectInput
                    label={`Select ${sfd.category}`}
                    labelKey="name"
                    value={value}
                    onChange={(e) => {
                      //@ts-ignore
                      onFilterChange({
                        categoryId: sfd.id,
                        //@ts-ignore
                        subCategoryId: e?.value as string,
                        state: true,
                      });
                    }}
                    options={generateIptions(sfd.subCategory)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterUI;

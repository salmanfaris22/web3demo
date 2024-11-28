import React from "react";
import styles from "./BlogsLists.module.scss";
import Tabs, { ITabs } from "../../../common/Components/Tabs/Tabs";
import PageWrapper from "../../../common/Components/PageWrapper/PageWrapper";
import Search from "../../../common/Components/Search/Search";
import BlogCard, { IBlogCard } from "../BlogCard/BlogCard";
import NoDataFound from "../../../common/UI/NoDataFound/NoDataFound";
import BlogCardLoader from "../BlogCard/BlogCardLoader";

const BlogsLists = ({
  blogList,
  onActiveIndex,
  activeIndex,
  tabList,
  isListLoading,
  onSearchChange
}: { blogList: IBlogCard[] } & ITabs & {
    isTabLoading: boolean;
    isListLoading: boolean;
    isError: boolean;
    onSearchChange : (v:string)=>void
  }) => {
  return (
    <PageWrapper className={styles.listPageWrapper}>
      <div className={styles.container}>
        <div className={styles.tabsContainer}>
          <Tabs
            classNames={{ tabClass: styles.tabClass }}
            activeIndex={activeIndex}
            disabled={false}
            tabList={tabList}
            onActiveIndex={onActiveIndex}
          />
          <Search cssClass={styles.search} fireOnOnChange handleOnChange={onSearchChange} placeholder="Search" />
        </div>

        <div className={styles.blogRow}>
          {!isListLoading &&
            blogList &&
            blogList.length > 0 &&
            blogList.map((bl) => {
              return (
                <div className={styles.blogCardWrapper} key={bl.id}>
                  <BlogCard {...bl} />
                </div>
              );
            })}
          {isListLoading &&
            Array.from({ length: 6 }).map((_, idx) => {
              return (
                <div className={styles.blogCardWrapper} key={idx}>
                  {" "}
                  <BlogCardLoader />
                </div>
              );
            })}
        </div>

        {!isListLoading && tabList[activeIndex] &&  blogList.length === 0 && (
          <NoDataFound
            title={`No Blogs found under category : ${tabList[activeIndex]}, \n please try changing the category`}
          />
        )}
      </div>
    </PageWrapper>
  );
};

export default BlogsLists;

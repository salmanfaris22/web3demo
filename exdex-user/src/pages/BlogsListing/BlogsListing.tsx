import { useEffect, useState } from "react";
import MaxScreen from "../../common/Layout/MaxScreen/MaxScreen";
import useApi from "../../hooks/useAPI";
import {
  getAllBlogs,
  getBlogCategories,
  getBlogsByCategory,
  IgetBlogByCatParams,
} from "../../services/blogs";
import BlogBanner from "./BlogBanner/BlogBanner";
import styles from "./BlogsListing.module.scss";
import BlogsLists from "./BlogsLists/BlogsLists";
import { IBlogCard } from "./BlogCard/BlogCard";
import Pagination from "../../common/Components/Pagination/Pagination";
import { getPageDetails } from "../../utils/commonutils";
import useDebounce from "../../hooks/useDebounce";

const bannerData = [
  {
    image: "assets/images/remove/blogBanner.png",
    heading: "Blog New Latest",
    description: `Blog-New -test Standard C1. Delivery date and settlement date
              given for search, listing others alsostandard C1. Delivery date
              and settlemnt date given for search, listing others aldo...`,
    date: "Apr 12.2022",
  },
  {
    image: "assets/images/remove/blogBanner.png",
    heading: "Blog New Latest2",
    description: `Blog-New -test Standard C1. Delivery date and settlement date
              given for search, listing others alsostandard C1. Delivery date
              and settlemnt date given for search, listing others aldo...`,
    date: "Apr 12.2022",
  },
  {
    image: "assets/images/remove/blogBanner.png",
    heading: "Blog New Latest3",
    description: `Blog-New -test Standard C1. Delivery date and settlement date
              given for search, listing others alsostandard C1. Delivery date
              and settlemnt date given for search, listing others aldo...`,
    date: "Apr 12.2022",
  },
];

const blogList = [
  {
    image: "assets/images/remove/blog1.png",
    type: "Article",
    date: "Apr 12.2022",
    description: "5 Must-haves before embarking on interior",
    id: "1111",
  },
  {
    image: "assets/images/remove/blog2.png",
    type: "Article",
    date: "Apr 12.2022",
    description: "5 Must-haves before embarking on interior",
    id: "1111",
  },
  {
    image: "assets/images/remove/blog3.png",
    type: "Article",
    date: "Apr 12.2022",
    description: "5 Must-haves before embarking on interior",
    id: "1111",
  },
];

interface Category {
  id: number;
  name: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface Blog {
  id: number;
  name: string;
  status: "active" | "inactive"; // Use union type for status
  heading: string;
  description: string;
  liked: boolean;
  like_count : number;
  thumbnail_url: string;
  banner_url: string;
  hashtags: string[] | null; // Optional array of strings
  category_id: number;
  Category: Category; // Nested object for category
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

interface BlogsResponse {
  blogs: Blog[];
  total: number;
  page: number;
  page_size: number;
}

const BlogsListing = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchConfig, setSearch] = useState<{
    categoryId: string;
    page: number;
    limit: number;
    search: string;
  }>({
    categoryId: "",
    limit: 20,
    page: 1,
    search: "",
  });

  const debouceSearch = useDebounce(searchConfig?.search , 500)

  const { data: bannerBlogs, executeApi: getBannerData , loading : bannerLoading } = useApi<{
    data: BlogsResponse;
  }>(getAllBlogs);

  const {
    data: categories,
    executeApi: getBlogCategoryData,
    loading: filtersLoading,
    error: filterError,
  } = useApi<{
    data: { id: string; name: string }[];
  }>(getBlogCategories, {
    onComplete: (data) => {
      if (data.data && data?.data.length > 0) {
        setSearch((p) => {
          return { ...p, categoryId: data?.data[0].id };
        });
      }
    },
  });

  const {
    data: blogByCategory,
    executeApi: getBlogByCatAPI,
    loading,
    error,
  } = useApi<
    {
      data: BlogsResponse;
    },
    IgetBlogByCatParams
  >(getBlogsByCategory);

  useEffect(() => {
    getBannerData();
    getBlogCategoryData();
  }, []);


  const filterKeys = ()=>{
    const {search , ...filters} = searchConfig;
    return filters
  }

  useEffect(() => {
    if (searchConfig.categoryId) {
      getBlogByCatAPI({
        search: debouceSearch,
        page: searchConfig.page,
        perPage: searchConfig.limit,
        id: searchConfig?.categoryId,
      });
    }
  }, [...Object.values(filterKeys()) , debouceSearch]);

  console.log(blogByCategory);

  const blogDataByCat: IBlogCard[] =
    blogByCategory?.data?.blogs?.map((bc) => {
      return {
        image: bc.thumbnail_url,
        description: bc.name,
        date: bc.updated_at,
        status: bc.status,
        id: bc.id,
      };
    }) || [];

  const { page: calcPage, pageCount: calcPageCount } = getPageDetails(
    blogByCategory?.data.total || 0,
    Number(searchConfig?.limit),
    Number(searchConfig?.page)
  );



  return (
    <>
      <MaxScreen>
        <div className={`${styles.container} `}>
          <BlogBanner isLoading={bannerLoading} bannerData={bannerBlogs?.data?.blogs || []} />
          <BlogsLists
            onSearchChange={(e)=>{
              console.log("ws",e)
              setSearch((prev)=>({...prev , search : e}))
            }}
            isTabLoading={filtersLoading}
            isListLoading={loading}
            isError={Boolean(error || filterError)}
            disabled={filtersLoading}
            activeIndex={activeIndex}
            onActiveIndex={(idx) => {
              const categoryId = categories?.data[idx]?.id;
              setActiveIndex(idx);
              if (categoryId) {
                setSearch((prec) => ({ ...prec, categoryId }));
              }
            }}
            tabList={
              categories?.data?.map((c) => {
                return c.name;
              }) || []
            }
            blogList={[...blogDataByCat]}
          />
          {blogDataByCat && blogDataByCat?.length > 0 && (
            <Pagination
              containerClassName="CustomPaginationSimple"
              pageCount={calcPageCount}
              initialPage={calcPage}
              onPageChange={(e) => {
                console.log(e);
                setSearch((prev) => ({ ...prev, page: e.selected + 1 }));
                // scrollToElementWithMargin("CryptoFeature");
              }}
            />
          )}
        </div>
      </MaxScreen>
      <div className="gradientBgFixed"></div>
    </>
  );
};

export default BlogsListing;

import DOMPurify from "dompurify";
import parse, { Element } from "html-react-parser";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GradientBg from "../../common/Components/GradientBg/GradientBg";
import { getblogHeadId } from "../../common/Components/HTMLParser/HTMLParser";
import PageWrapper from "../../common/Components/PageWrapper/PageWrapper";
import QlDescription from "../../common/Components/QlDescription/QlDescription";
import MaxScreen from "../../common/Layout/MaxScreen/MaxScreen";
import DataError from "../../common/UI/DataError/DataError";
import FadeComponent from "../../common/UI/Loader/Loader";
import useApi from "../../hooks/useAPI";
import { getBlogCount, getBlogsById, likeBlog } from "../../services/blogs";
import { convertISOToLongDateFormat } from "../../utils/date";
import { Blog } from "../BlogsListing/BlogsListing";
import styles from "./BlogDetails.module.scss";
import ContactCard from "./ContactCard/ContactCard";
import Like from "./Like/Like";
import SocialRow from "./SocialRow/SocialRow";

const BlogDetails = () => {
  const { id } = useParams();
  const [headings, setHeadings] = useState<string[]>([]);

  const {
    data,
    executeApi: getBlogsByIdAPI,
    loading: blogDetailsLoading,
    error: detailsError,
  } = useApi<{ data: Blog }, string>(getBlogsById, { keepBeforeRefresh: true });

  const {
    executeApi: likeBlogAPI,
    loading: likeAPILoading,
    error: likeAPIError,
  } = useApi<{ data: Blog }, { blogId: string; liked: boolean }>(likeBlog, {
    onComplete: () => {
      getBlogsByIdAPI(String(id));
    },
  });

  const {data : blogCount , executeApi : getCountAPI} = useApi<{data : number}>(getBlogCount);

  useEffect(() => {
    if (id) {
      getBlogsByIdAPI(id);
      getCountAPI()
    }
  }, [id]);



  const blogDetails = data?.data;



  useEffect(() => {
    if (data?.data?.description) {
      const newHeadings: string[] = [];
      parse(DOMPurify.sanitize(data.data?.description), {
        replace: (domNode) => {
          const tempNode = domNode as Element;
          if (
            tempNode?.attribs?.class?.includes("ql-size-huge") ||
            tempNode?.attribs?.class?.includes("ql-size-large")
          ) {
            //@ts-ignore
            const textContent = tempNode?.children
            //@ts-ignore
              ?.map((child) => (child.data ? child.data : ""))
              .join("")
              .trim();

            if (textContent) {
              newHeadings.push(textContent);
            }
          }
        },
      });

      // Update the state with the collected headings
      setHeadings([ data?.data?.name , ...newHeadings]);
    }
  }, [data?.data?.description]);

 
  if(blogDetailsLoading && !blogDetails) {
    return  <FadeComponent/>
  }

  if(detailsError && !blogDetails){
    return <DataError title="Something went wrong"  btnLabel="reload" btnProps={{onClick : ()=>{
      getBlogsByIdAPI(String(id))
    }}}  />
  }

  return (
    <>
      <MaxScreen>
        <PageWrapper>
          <div className={`${styles.container} `}>
            <div className={styles.detailCard}>
              <h1 id={getblogHeadId(0)}>{blogDetails?.name}</h1>
              <div className={styles.date}>
                {convertISOToLongDateFormat(blogDetails?.updated_at || "")}
              </div>
              <div className={styles.tagWrap}>
                {blogDetails?.hashtags?.map((h) => {
                  return (
                    <div key={h} className={styles.tag}>
                      {h}
                    </div>
                  );
                })}
              </div>
              <div className={styles.imageBanner}>
                {blogDetails?.banner_url && (
                  <img src={blogDetails?.banner_url} alt="Banner" />
                )}
              </div>

              <QlDescription description={blogDetails?.description || ""} />
            </div>
            <div className={styles.shareCard}>
              <h2 className={styles.sharePost}>Share Post</h2>
              <SocialRow />
              <div className={styles.likeWrap}>
                <Like
                 likes={blogDetails?.like_count || 0}
                  onLike={() => {
                    if(!likeAPILoading){
                      likeBlogAPI({
                        blogId: String(id),
                        liked: !blogDetails?.liked,
                      });
                    }
              
                  }}
                  liked={blogDetails?.liked || false}
                />
              </div>
              <div className={styles.register}>
                <ContactCard count={blogCount?.data|| 0} heading={headings || []} />
              </div>
            </div>
          </div>
        </PageWrapper>
      </MaxScreen>
      <GradientBg />
    </>
  );
};

export default BlogDetails;

import style from "./BlogCard.module.scss";



const BlogCardLoader = () => {
  return (
    <div className={style.blogCardWrap}>
      <div className={style.blogInner}>
        <div style={{opacity : 0.3}}  className={`skeleton  ${style.blogImage}`}>
         
        </div>
        <div style={{opacity : 0.3 , width : "70%"}} className={`skeleton  ${style.dateTypeWrap}`}>
        </div>
        <div style={{opacity : 0.3 ,  width : "40%"}} className={`skeleton  ${style.description}`}></div>
        <div style={{opacity : 0.3 ,  width : "90%"}} className={`skeleton  ${style.description}`}></div>
      </div>
    </div>
  );
};

export default BlogCardLoader;

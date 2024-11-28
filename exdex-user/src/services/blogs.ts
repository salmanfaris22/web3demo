import api from "./api";

export const getAllBlogs = () => {
  return api.get("/public/blogs/get-all?page=1&page_size=3&search=");
};

export const getBlogCategories = () => {
  return api.get("/public/blogs/get-all-category");
};

export interface IgetBlogByCatParams {
  id: string;
  page: number;
  perPage: number;
  search: string;
}

export const getBlogsByCategory = ({
  id,
  page,
  perPage,
  search,
}: IgetBlogByCatParams) => {
  let blogUrl = `/public/blogs/category/${id}?page=${page}&pageSize=${perPage}`;
  if (search) {
    blogUrl = blogUrl + `&search=${search}`;
  }

  return api.get(blogUrl);
};


export const getBlogsById = (blogId : string)=>{
    return api.get(`/blogs/get-by-id/${blogId}`)
  }
  
  export const likeBlog = (data:{blogId : string , liked : boolean})=>{
    return api.post(`/blog/${data.blogId}/like` , {liked : data.liked})
  }

export const getBlogCount = ()=>{
    return api.get("/blogs/total-user-count")
}  
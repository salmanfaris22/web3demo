import api from "./api";
import { PageParams } from "./tickets";

export const getBlogCategories = () => {
  return api.get("/blogs/get-all-category");
};

export const addBlog = (blogData: FormData) => {
  return api.post("/admin/blogs/create", blogData);
};

export const getAllBlogs = ({ ...qnData }: PageParams) => {
  const queryParams = new URLSearchParams();

  if (qnData.page) {
    queryParams.append("page", qnData.page.toString());
  }

  if (qnData.limit) {
    queryParams.append("page_size", qnData.limit.toString());
  }
  if (qnData.search && qnData.search.trim() !== "") {
    queryParams.append("search", qnData.search);
  }
  return api.get(`admin/blogs/get-all?${queryParams.toString()}`);
};

export const deleteBlog = (blogId: string) => {
  return api.delete(`/admin/blogs/delete/${blogId}`);
};

export const getBlogsById = (blogId : string)=>{
  return api.get(`/admin/blogs/get-by-id/${blogId}`)
}


export const updateBlogsById = ({blogId , blogData} : {blogId : string, blogData : FormData})=>{
  return api.put(`/admin/blogs/update-by-id/${blogId}` , blogData)
}

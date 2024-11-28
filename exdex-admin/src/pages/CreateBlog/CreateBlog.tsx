import React, { useEffect } from "react";
import styles from "./CreateBlog.module.scss";
import TablePageWrapper from "../../common/Layout/TableWrapper/TableWrapper";
import MainWrapper from "../../common/Layout/PageWrapper/PageWrapper";
import MainSectionTitle from "../../common/Components/MainSectionTitle/MainSectionTitle";
import FormWrapper from "../../common/Components/FormWrapper/FormWrapper";
import TextInput from "../../common/Components/TextInput/TextInput";
import useCustomForm from "../../hooks/useForms";
import {
  addBlog,
  getBlogCategories,
  getBlogsById,
  updateBlogsById,
} from "../../services/blog";
import useApi from "../../hooks/useAPI";
import SelectInput, {
  ISelect,
} from "../../common/Components/SelectInput/SelectInput";
import TagInput from "../../common/Components/TagInput/TagInput";
import BlogImageInput from "../../common/Components/BlogImageInput/BlogImageInput";
import { QuilEditor } from "../../common/Components/QuilEditor/QuilEditor";
import FormSubmitBtns from "../../common/Components/FormSubmitBtns/FormSubmitBtns";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../constants/routes";
import useToast from "../../hooks/useToast";
import { Blog } from "../BlogListing/BlogListing";
import FadeComponent from "../../common/UI/Loader/Loader";
import DataError from "../../common/UI/DataError/DataError";

interface IBlogAddFrom {
  name: string;
  category: (ISelect & { id: number }) | null;
  status: ISelect | null;
  heading: string;
  tags: string[];
  thumbNail: File | null;
  banner: File | null;
  description: string;
  bannerPreview?: string | null;
  thumbNailPreview?: string | null;
}

const BlogStatus = [
  {
    name: "Active",
    value: "active",
  },
  {
    name: "Inactive",
    value: "inactive",
  },
];

const CreateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { handleChange, values, isValid, handleSubmit, setValue, hasTouched } =
    useCustomForm<IBlogAddFrom>({
      initialValues: {
        name: "",
        category: null,
        status: null,
        heading: "",
        tags: [],
        thumbNail: null,
        banner: null,
        description: "",
      },
      validators: {
        name: { required: "Name is required" },
        heading: { required: "Heading is required" },
        description: { required: "Description is required" },
        category: { required: "Category is required" },
        status: { required: "Status is required" },
        thumbNail: (v) => {
          console.log(v, id);
          return id ? undefined : v ? undefined : "thumbnail required";
        },
        banner: (v) => {
          return id ? undefined : v ? undefined : "thumbnail required";
        },
        tags: {
          custom: (tagval) => {
            return tagval?.length > 0 ? "required" : undefined;
          },
        },
      },
      onSubmit: (v, e) => {
        console.log(v);
        const formData = new FormData();
        formData.append("name", v.name);
        formData.append("heading", v.heading);
        formData.append("status", v.status?.value as string);
        formData.append("description", v.description);
        if (v.thumbNail) {
          formData.append("thumbnail", v.thumbNail as Blob);
        }
        if (v.banner) {
          formData.append("banner", v.banner as Blob);
        }
        if (!id) {
          formData.append("category_id", String(v.category?.id));
        }

        formData.append("hashtags", JSON.stringify(v.tags));
        if (id) {
          updateBlog({ blogData: formData, blogId: id });
        } else {
          addBlogAPI(formData);
        }
      },
    });

  const {
    data: categoryData,
    executeApi: getCategories,
    loading,
  } = useApi<{ data: { id: string; name: string }[] }>(getBlogCategories);

  const {
    data: blogDetails,
    executeApi: getBlogsByIdAPI,
    loading: blogDetailsLoading,
    error: detailsError,
  } = useApi<{ data: Blog }, string>(getBlogsById);

  useEffect(() => {
    if (blogDetails) {
      const blogData = blogDetails?.data;
      setValue("name", blogData?.name);
      setValue("tags", blogData.hashtags);
      setValue("heading", blogData?.heading);
      setValue("description", blogData?.description);
      setValue("bannerPreview", blogData?.banner_url);
      setValue("thumbNailPreview", blogData?.thumbnail_url);
      const statusData = BlogStatus.find(
        ({ value }) => value === blogData?.status
      );
      if (statusData) {
        setValue("status", statusData);
      }
      const category = categoryData?.data?.find((c) => {
        return String(c.id) === String(blogData?.category_id);
      });
      if (category) {
        setValue("category", { name: category.name, value: category.id });
      }
    }
  }, [blogDetails, categoryData]);

  const { triggerToast } = useToast();

  const { executeApi: addBlogAPI, loading: addblogLoading } = useApi<
    any,
    FormData
  >(addBlog, {
    onComplete: () => {
      navigate(routes.blogListing);
    },
    onError: (e) => {
      triggerToast(e, "error");
    },
  });

  const { executeApi: updateBlog, loading: updateAPILoading } = useApi<
    any,
    { blogId: string; blogData: FormData }
  >(updateBlogsById, {
    onComplete: () => {
      navigate(routes.blogListing);
    },
    onError: (e) => {
      triggerToast(e, "error");
    },
  });

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (id) {
      getBlogsByIdAPI(id);
    }
  }, [id]);

  return (
    <div className={styles.container}>
      <MainWrapper>
        <TablePageWrapper title={null}>
          <MainSectionTitle>
            {id ? "Edit Blog" : " Create Blog"}
          </MainSectionTitle>
          <div className={styles.subSectionTitle}>
            {!id && "Create new blog and publish it for users"}
          </div>
          {blogDetailsLoading ? (
            <FadeComponent />
          ) : (
            <>
              {detailsError && id && (
                <DataError
                  btnLabel="Refetch"
                  btnProps={{
                    onClick: () => {
                      getBlogsByIdAPI(id);
                    },
                  }}
                />
              )}

              {!detailsError  && (
                <>
                  {" "}
                  <div className={styles.formWrap}>
                    <div className={styles.formElement}>
                      <FormWrapper id="name" label="Name">
                        <TextInput
                          placeholder="Add name to your blog"
                          type="text"
                          value={values?.name}
                          onChange={(e) => {
                            handleChange("name", e.target.value);
                          }}
                        />
                      </FormWrapper>
                    </div>
                    <div className={styles.formElement}>
                      <FormWrapper id="status" label="Status">
                        <SelectInput
                          value={values?.status}
                          options={BlogStatus || []}
                          labelKey="name"
                          label="Choose status for blog"
                          optionKey="name"
                          onChange={(selecetdStatus) => {
                            handleChange("status", selecetdStatus as ISelect);
                          }}
                        />
                      </FormWrapper>
                    </div>
                    <div className={styles.formElement}>
                      <FormWrapper id="category" label="Category">
                        <SelectInput
                          value={values?.category}
                          options={categoryData?.data || []}
                          labelKey="name"
                          label="Category"
                          disabled={Boolean(id)}
                          optionKey="name"
                          onChange={(categorySelected) => {
                            handleChange(
                              "category",
                              categorySelected as ISelect
                            );
                          }}
                        />
                      </FormWrapper>
                    </div>
                    <div className={styles.formElement}>
                      <FormWrapper id="tags" label="Hashtag">
                        <TagInput
                          tagValues={values.tags}
                          onTagsChange={(tags) => {
                            handleChange("tags", tags);
                          }}
                        />
                      </FormWrapper>
                    </div>
                    <div className={styles.formElement}>
                      <FormWrapper id="thumbnail" label="Thumbnail">
                        <BlogImageInput
                          onUpload={(f) => {
                            handleChange("thumbNail", f);
                          }}
                          imagePreviewData={values.thumbNailPreview}
                          placeholder="Browse thumbnail"
                        />
                        {/* <TextInput
                  placeholder="Enter heading"
                  value={values?.heading}
                  onChange={(e) => {
                    handleChange("heading", e.target.value);
                  }}
                /> */}
                      </FormWrapper>
                    </div>
                    <div className={styles.formElement}>
                      <FormWrapper id="banner" label="Banner">
                        <BlogImageInput
                          onUpload={(f) => {
                            handleChange("banner", f);
                          }}
                          imagePreviewData={values.bannerPreview}
                          placeholder="Browse banner"
                        />
                      </FormWrapper>
                    </div>
                    <div className={styles.formElement}>
                      <FormWrapper id="banner" label="Heading">
                        <div className={styles.editor}>
                          <QuilEditor
                            placeholder="Enter heading"
                            theme="small"
                            value={values?.heading}
                            handleOnChange={(heading) => {
                              handleChange("heading", heading);
                            }}
                          />
                        </div>
                      </FormWrapper>
                    </div>
                    <div className={styles.formElement}>
                      <FormWrapper id="description" label="Description">
                        <div className={styles.editor}>
                          <QuilEditor
                            placeholder="Enter Description"
                            theme="small"
                            modules={["image"]}
                            value={values?.description}
                            handleOnChange={(description) => {
                              handleChange("description", description);
                            }}
                          />
                        </div>
                      </FormWrapper>
                    </div>
                  </div>
                  <FormSubmitBtns
                    submitProps={{
                      children: id ? "Update" : "Create",
                      onClick: handleSubmit,
                      disabled:
                        loading || !isValid || addblogLoading || !hasTouched,
                      isLoading: loading || updateAPILoading || addblogLoading,
                    }}
                    cancelProps={{
                      children: "Cancel",
                      disabled: addblogLoading,
                      onClick: () => {
                        navigate(routes.blogListing);
                      },
                    }}
                  />
                </>
              )}
            </>
          )}
        </TablePageWrapper>
      </MainWrapper>
    </div>
  );
};

export default CreateBlog;

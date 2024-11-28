import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogImageInput from "../../common/Components/BlogImageInput/BlogImageInput";
import FormSubmitBtns from "../../common/Components/FormSubmitBtns/FormSubmitBtns";
import FormWrapper from "../../common/Components/FormWrapper/FormWrapper";
import MainSectionTitle from "../../common/Components/MainSectionTitle/MainSectionTitle";
import { QuilEditor } from "../../common/Components/QuilEditor/QuilEditor";
import SelectInput, {
  ISelect,
} from "../../common/Components/SelectInput/SelectInput";
import TextInput from "../../common/Components/TextInput/TextInput";
import MainWrapper from "../../common/Layout/PageWrapper/PageWrapper";
import TablePageWrapper from "../../common/Layout/TableWrapper/TableWrapper";
import { routes } from "../../constants/routes";
import useApi from "../../hooks/useAPI";
import useCustomForm from "../../hooks/useForms";
import useToast from "../../hooks/useToast";
import {
  addAnnoucement,
  getAnnoucementsById,
  updateAnnoucementsById,
} from "../../services/announcements";
import styles from "./CreateAnnouncements.module.scss";
import { Announcement } from "../Announcements/Announcements";
import FadeComponent from "../../common/UI/Loader/Loader";
import DataError from "../../common/UI/DataError/DataError";

interface IAnnouncemnetFrom {
  name: string;
  status: ISelect | null;
  heading: string;
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
    useCustomForm<IAnnouncemnetFrom>({
      initialValues: {
        name: "",
        status: null,
        heading: "",
        thumbNail: null,
        banner: null,
        description: "",
      },
      validators: {
        name: { required: "Name is required" },
        heading: { required: "Heading is required" },
        description: { required: "Description is required" },
        status: { required: "Status is required" },
        thumbNail: (v) => {
          console.log(v, id);
          return id ? undefined : v ? undefined : "thumbnail required";
        },
        banner: (v) => {
          return id ? undefined : v ? undefined : "thumbnail required";
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

        if (id) {
          updateAnnounce({ AnnoucementData: formData, AnnoucementId: id });
        } else {
          addAnnoucementAPI(formData);
        }
      },
    });

  const {
    data: blogDetails,
    executeApi: geAnnouncementsByIdAPI,
    loading: blogDetailsLoading,
    error: detailsError,
  } = useApi<{ data: Announcement }, string>(getAnnoucementsById);

  useEffect(() => {
    if (blogDetails) {
      const blogData = blogDetails?.data;
      setValue("name", blogData?.name);
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
    }
  }, [blogDetails]);

  const { triggerToast } = useToast();

  const { executeApi: addAnnoucementAPI, loading: addblogLoading } = useApi<
    any,
    FormData
  >(addAnnoucement, {
    onComplete: () => {
      navigate(routes.announcement);
    },
    onError: (e) => {
      triggerToast(e, "error");
    },
  });

  const { executeApi: updateAnnounce, loading: updateAPILoading } = useApi<
    any,
    { AnnoucementId: string; AnnoucementData: FormData }
  >(updateAnnoucementsById, {
    onComplete: () => {
      navigate(routes.announcement);
    },
    onError: (e) => {
      triggerToast(e, "error");
    },
  });

  useEffect(() => {
    if (id) {
      geAnnouncementsByIdAPI(id);
    }
  }, [id]);

  return (
    <div className={styles.container}>
      <MainWrapper>
        <TablePageWrapper title={null}>
          <MainSectionTitle>
            {id ? "Edit Announcement" : " Create Announcement"}
          </MainSectionTitle>
          <div className={styles.subSectionTitle}>
            {!id && "Create new announcement and publish it for users"}
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
                      getAnnoucementsById(id);
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
                          placeholder="Add name "
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
                      <FormWrapper id="thumbnail" label="Thumbnail">
                        <BlogImageInput
                          onUpload={(f) => {
                            handleChange("thumbNail", f);
                          }}
                          imagePreviewData={values.thumbNailPreview}
                          placeholder="Browse thumbnail"
                        />
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
                      disabled: !isValid || addblogLoading || !hasTouched,
                      isLoading: updateAPILoading,
                    }}
                    cancelProps={{
                      children: "Cancel",
                      disabled: addblogLoading,
                      onClick: () => {
                        navigate(routes.announcement);
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

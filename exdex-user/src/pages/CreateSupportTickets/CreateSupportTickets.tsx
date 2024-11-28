import { useEffect, useState } from "react";
import BackBtn from "../../common/Components/BackBtn/BackBtn";
import Button from "../../common/Components/Button/Button";
import Checkbox from "../../common/Components/Checkbox/Checkbox";
import FormSubmitBtns from "../../common/Components/FormSubmitBtns/FormSubmitBtns";
import FormWrapper from "../../common/Components/FormWrapper/FormWrapper";
import PageWrapper from "../../common/Components/PageWrapper/PageWrapper";
import TextArea from "../../common/Components/TextArea/TextArea";
import TextInput from "../../common/Components/TextInput/TextInput";
import { routers } from "../../common/Constants";
import SelectInput, { ISelect } from "../../common/SelectInput/SelectInput";
import useApi from "../../hooks/useAPI";
import useCustomForm from "../../hooks/useForms";
import useToast from "../../hooks/useToast";
import { createTicket, getTicketCategories } from "../../services/helpcenter";
import MainSectionTitle from "../Forex/MainSectionTitle/MainSectionTitle";
import styles from "./CreateSupportTickets.module.scss";
import HelpBreadCrumb from "./HelpBreadCrumb/HelpBreadCrumb";
import HelpSearch from "./HelpSearch/HelpSearch";
import { useNavigate } from "react-router-dom";

const CreateSupportTickets = () => {
  const maxFiles = 5; // Set maximum number of files
  const maxFileSize = 2 * 1024 * 1024; // 2MB in bytes
  const navigate = useNavigate()
  const { loading: createTicketLoading, executeApi: executeCreateTicket } =
    useApi<any, FormData>(createTicket, {
      onComplete: () => {
        triggerToast("Added Ticket", "success");
        navigate(routers.tickets)
        
      },
      onError: () => {
        triggerToast("Something went wrong , please try again", "error");
      },
    });

  const { values, handleChange, isValid, handleSubmit } = useCustomForm<{
    category: ISelect | null;
    subject: string;
    description: string;
    check: boolean;
  }>({
    initialValues: {
      category: null,
      description: "",
      subject: "",
      check: false,
    },
    onSubmit: (v, e) => {
      const apidata = new FormData();
      apidata.append("title", v.subject);
      apidata.append("description", v.description);
      apidata.append("status", "open");
      apidata.append("category", v.category?.name || "");
      //@ts-ignore
      uploadedFiles.map((f) => {
        apidata.append("attachments", f);
      });
      executeCreateTicket(apidata);
    },
    validators: {
      category: { required: "category is required" },
      check: { required: "tersm" },
      subject: { required: "subject is required" },
      description: { required: "description is required" },
    },
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { triggerToast } = useToast();
  const {
    data: categoryData,
    loading,
    executeApi,
  } = useApi<{ data: string[] }>(getTicketCategories);

  useEffect(() => {
    executeApi();
  }, []);

  console.log(values, isValid);

  const suggestions =
    categoryData?.data?.map((c) => {
      return { name: c, value: c };
    }) || [];

  console.log(categoryData);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    let validFiles: File[] = [];
    for (let file of chosenFiles) {
      if (file.size > maxFileSize) {
        triggerToast(
          `${file.name} exceeds the maximum size of 2MB. please select a maxium of 2MB file`,
          "error"
        );
        return;
      }
      validFiles.push(file);
    }

    if (uploadedFiles.length + validFiles.length > maxFiles) {
      triggerToast(`please select a maximum of ${maxFiles} files.`, "error");
    } else {
      setUploadedFiles([...uploadedFiles, ...validFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    const filteredFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(filteredFiles);
  };

  return (
    <PageWrapper type="narrow">
      <div className={styles.container}>
        <BackBtn />
        <div className={styles.mainContainer}>
          <div className={styles.formContainer}>
            <div className={styles.topSection}>
              <HelpSearch />
              <div style={{ margin: "40px 0px 0px 0px" }}>
                <HelpBreadCrumb
                  breadCrumbs={[
                    {
                      name: "Help Center",
                      url: routers.helpCenter,
                    },
                    {
                      name: "Support  Tickets",
                      url: routers.tickets,
                    },
                    {
                      name: "Open support ticket",
                      url: "",
                    },
                  ]}
                />
              </div>
              <div style={{ margin: "10px 0px 20px 0px" }}>
                <MainSectionTitle title="Open support ticket" />
              </div>
            </div>

            <div className={styles.formWrap}>
              <div className={styles.formElementWrapper}>
                <FormWrapper label="Name" id={"category"}>
                  <SelectInput
                    //@ts-ignore
                    labelKey="name"
                    value={values["category"]}
                    onChange={(selectedCountry) => {
                      handleChange("category", selectedCountry as ISelect);
                    }}
                    options={suggestions}
                  />
                </FormWrapper>
              </div>
              <div className={styles.formElementWrapper}>
                <FormWrapper label="Subject" id={"subject"}>
                  <TextInput
                    placeholder="Enter Subject"
                    type="text"
                    value={values.subject}
                    onChange={(e) => {
                      handleChange("subject", e.target.value);
                    }}
                  />
                </FormWrapper>
              </div>
              <div className={styles.textAreaWrap}>
                <TextArea
                  infoText="Describe the problem in detail. Don’t restart or delete this
                  alert until the issue is completely resolved"
                  rows={15}
                  onChange={(e) => {
                    handleChange("description", e.target.value);
                  }}
                />
              </div>
            </div>
            <div className={styles.formFooter}>
              <div className={styles.chooseFile}>
                <input onChange={handleFileChange} type="file" multiple />
                <span>
                  <img src="/assets/images/fileClip.png" alt="File upload " />{" "}
                  Choose Files
                </span>
              </div>

              {uploadedFiles.length > 0 && (
                <div className={styles.chosenFiles}>
                  {uploadedFiles.map((f, index) => (
                    <div key={index}>
                      {f.name}
                      <Button
                        onClick={() => handleRemoveFile(index)}
                        theme="icon"
                      >
                        <img
                          src="/assets/images/delete.png"
                          alt="remove file"
                        />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <div className={styles.checkBoxWrap}>
                <Checkbox
                  checked={values.check}
                  theme="square"
                  onChange={(e) => {
                    handleChange("check" , e.target.checked)
                  }}
                  label="It’s okey to attach a snapshot of your Trading View so our Lovely staff can investigate further"
                />
              </div>
            </div>
          </div>
        </div>
        <FormSubmitBtns
          submitProps={{
            children:  createTicketLoading ? "Submitting" : "Raise Ticket",
            disabled: !isValid || createTicketLoading,
            onClick: handleSubmit,
            isLoading : createTicketLoading
          }}
          cancelProps={{
            children: "Cancel",
            disabled: !createTicketLoading,
            onClick : ()=>{
              navigate(-1)
            }
          }}
        />
      </div>
    </PageWrapper>
  );
};

export default CreateSupportTickets;

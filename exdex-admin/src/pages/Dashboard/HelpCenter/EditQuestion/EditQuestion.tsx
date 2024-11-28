import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button, {
  BtnSpinner,
} from "../../../../common/Components/Button/Button";
import { QuilEditor } from "../../../../common/Components/QuilEditor/QuilEditor";
import MainWrapper from "../../../../common/Layout/PageWrapper/PageWrapper";
import Loader from "../../../../common/UI/Loader/Loader";
import { routes } from "../../../../constants/routes";
import useApi from "../../../../hooks/useAPI";
import useCustomForm from "../../../../hooks/useForms";
import useMutate from "../../../../hooks/useMutate";
import useToast from "../../../../hooks/useToast";
import { addQns, getQnByQnId, updateQn } from "../../../../services/helpCenter";
import {
  jsonToFormData,
  replacePlaceholders,
} from "../../../../utils/commonUtils";
import PageWrapper from "../../../../common/Layout/TableWrapper/TableWrapper";
import styles from "./EditQuestion.module.scss";
import usePopUp from "../../../../common/Components/PopuUp/usePopUp";
import DeleteQn from "../PrimarySectionQns/DeleteQn/DeleteQn";
import PageAnimation from "../../../../common/Components/PageAnimation/PageAnimation";

const EditQuestion = ({ title }: { title: string }) => {
  const { triggerToast } = useToast();
  const [deleteData, setDeleteQn] = useState<any>(null);
  const { subCategoryId, category, subCategory, type, qnId } = useParams();
  const route = useNavigate();

  const { handleChange, isValid, handleSubmit, values } = useCustomForm<{
    title: string;
    body: string;
  }>({
    initialValues: { title: "", body: "" },
    onSubmit: (value, error) => {
      if (type === "add") {
        const apiData = { ...value, subcategory_id: subCategoryId };
        const frmData = jsonToFormData(apiData);
        createQn(frmData);
      } else {
        updateQnAPI({ ...value, qnId });
      }
    },
    validators: {
      title: { required: "Enter Question" },
      body: { required: "Enter Body" },
    },
  });

  const { loading: mutateLoading, executeApi: createQn } = useMutate(addQns, {
    onComplete: () => {
      triggerToast("Added Question", "success");
      route(-1);
    },
    onError: (errorMessage) => {
      triggerToast(errorMessage, "error");
    },
  });

  const {
    executeApi,
    loading,
    data: qnData,
  } = useApi(getQnByQnId, {
    onComplete: (data) => {
      handleChange("title", data?.data?.title);
      handleChange("body", data?.data?.body);
    },
  });

  console.log(qnData);

  const { executeApi: updateQnAPI, loading: updateLoading } = useApi(updateQn, {
    onComplete: () => {
      triggerToast("Updated Question", "success");
      route(-1);
    },
  });

  useEffect(() => {
    if (qnId) executeApi(qnId);
  }, [qnId]);

  const getBtnText = () =>
    mutateLoading || updateLoading
      ? "Submitting"
      : type === "add"
      ? "Submit Answer"
      : "Update";

  const {
    isOpen: isDeleteOpen,
    openPopUp: openDeletePopup,
    closePopUp: closeDeletePopup,
  } = usePopUp();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <DeleteQn
        qn={deleteData}
        isDeleteOpen={isDeleteOpen}
        closeDeletePopUp={(hasDone) => {
          if (hasDone) {
            const url = replacePlaceholders(routes.primarySectionQns, {
              category: category as string,
              subCategory: subCategory as string,
              subCategoryId: subCategoryId as string,
            });
            route(url);
          }
          closeDeletePopup();
        }}
      />
      <PageAnimation>
        <MainWrapper>
          <PageWrapper
            title={title}
            actiontemplate={
              type === "edit" && (
                <Button
                  onClick={() => {
                    setDeleteQn(qnData.data);
                    openDeletePopup();
                  }}
                  theme="material-danger"
                >
                  Delete
                </Button>
              )
            }
          >
            <div className={styles.heading}>Question</div>
            <div className={styles.qnInput}>
              <input
                value={values.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter question"
              />
            </div>
            <div className={styles.heading}>Reply</div>
            <div className={styles.editorWrap}>
              <QuilEditor
                value={values.body}
                theme={"normal"}
                handleOnChange={(e: any) => handleChange("body", e)}
                modules={["image", "video"]}
              />
            </div>
            <div className={styles.btnWrap}>
              <button onClick={() => route(-1)}>Cancel</button>
              <button disabled={!isValid} onClick={handleSubmit}>
                {getBtnText()}
                {(mutateLoading || updateLoading) && <BtnSpinner />}
              </button>
            </div>
          </PageWrapper>
        </MainWrapper>
      </PageAnimation>
    </div>
  );
};

export default EditQuestion;

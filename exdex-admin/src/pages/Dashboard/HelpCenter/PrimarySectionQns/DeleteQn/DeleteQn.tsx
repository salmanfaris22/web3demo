import { useState } from "react";
import Button from "../../../../../common/Components/Button/Button";
import PopUp from "../../../../../common/Components/PopuUp/PopuUp";
import useMutate from "../../../../../hooks/useMutate";
import useToast from "../../../../../hooks/useToast";
import { deleteQn } from "../../../../../services/helpCenter";
import { Question } from "../PrimarySectionQns";

export default function DeleteQn({
  qn,
  isDeleteOpen,
  closeDeletePopUp,
}: {
  qn: Question;
  isDeleteOpen: boolean;
  closeDeletePopUp: (hasDone:boolean) => void;
}) {
  const { triggerToast } = useToast();

  const { loading: deleteAPILoading, executeApi: deleteQnAPI } = useMutate(
    deleteQn,
    {
      onComplete: (result) => {
        triggerToast("Question  deleted successfully", "success");
        closeDeletePopUp(true);
      },
      onError: (errorMessage) => {
        triggerToast(errorMessage, "error");
        console.log("Error deleting category:", errorMessage);
      },
    }
  );

  return (
    <PopUp
      header={`Delete Category`}
      isOpen={isDeleteOpen}
      onClose={() => {
        closeDeletePopUp(false);
      }}
    >
      <h2>
        Are you sure you want to delete <br/>
      </h2>
      <p style={{color: "var(--color-green)" , marginTop : `10px` , fontSize : "1.3rem"}}>{qn?.title}</p>
      <div className="submitBtns">
        <Button
          onClick={() => {
            deleteQnAPI(String(qn.ID));
          }}
          theme="neon"
          disabled={!qn || deleteAPILoading}
        >
          {deleteAPILoading ? "Submitting..." : "Delete"}
        </Button>
        <Button
          onClick={(e) => {
            closeDeletePopUp(false);
          }}
          theme="danger"
        >
          Cancel
        </Button>
      </div>
    </PopUp>
  );
}

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../../common/Components/Button/Button";
import FilterDetails from "../../../common/Components/FilterDetails/FilterDetails";
import FormWrapper from "../../../common/Components/FormWrapper/FormWrapper";
import PageAnimation from "../../../common/Components/PageAnimation/PageAnimation";
import PopUp from "../../../common/Components/PopuUp/PopuUp";
import usePopUp from "../../../common/Components/PopuUp/usePopUp";
import SelectInput, {
  ISelect,
} from "../../../common/Components/SelectInput/SelectInput";
import TextInput from "../../../common/Components/TextInput/TextInput";
import PageWrapper from "../../../common/Layout/PageWrapper/PageWrapper";
import DataError from "../../../common/UI/DataError/DataError";
import Loader from "../../../common/UI/Loader/Loader";
import NoDataFound from "../../../common/UI/NoDataFound/NoDataFound";
import { routes } from "../../../constants/routes";
import { cardType } from "../../../constants/values";
import useApi from "../../../hooks/useAPI";
import useCustomForm from "../../../hooks/useForms";
import useMutate from "../../../hooks/useMutate";
import useToast from "../../../hooks/useToast";
import {
  createHelpCenterCategory,
  deleteHelpCenterCategory,
  getHelpCenterCategories,
} from "../../../services/helpCenter";
import {
  ICategory,
  selectCategories,
  setCategories,
} from "../../../store/helpCenter";
import classes from "./HelpCenter.module.scss";
import Modal from "../../../common/Components/Modal/Modal";
import LabelInput from "../../../common/Components/LabelInput/LabelInput";

export const tabs = [
  {
    name: "Overview",
    action: "trigger",
    type: "button",
  },
  {
    name: "Manage",
  },
  {
    name: "Add",
    hasImage: true,
    Imgurl: "/assets/images/add.png",
    action: "trigger",
    type: "button",
  },
];

const HelpCenter = () => {
  const {
    values: formState,
    handleChange,
    handleSubmit,
    resetForm,
  } = useCustomForm<{ category_name: string; card_type: ISelect | null }>({
    initialValues: {
      category_name: "",
      card_type: null,
    },
    validators: {
      category_name: { required: "Enter category name" },
      card_type: { required: "Select card type" },
    },

    onSubmit: (values, error) => {
      const formData = new FormData();
      formData.append("category_name", values.category_name);
      formData.append("card_type", String(values.card_type?.value));
      createCategory(formData);
    },
  });

  const dispatch = useDispatch();
  // const categoriesResponse: any = useSelector(selectCategories);
  const categories = useSelector(selectCategories)
  const { triggerToast } = useToast();
  const [deleteData, setDeleteCategory] = useState<null | ICategory>(null);

  const { isOpen, openPopUp, closePopUp } = usePopUp();
  const {
    isOpen: isDeleteOpen,
    openPopUp: OpenDeletePoPup,
    closePopUp: closeDeletePopup,
  } = usePopUp();

  const { executeApi, loading, data, error } = useApi(getHelpCenterCategories, {
    onComplete: (data) => {
      dispatch(setCategories(data.data));
    },
  });
  const { loading: mutateLoading, executeApi: createCategory } = useMutate(
    createHelpCenterCategory,
    {
      onComplete: (result) => {
        triggerToast("Category created successfully", "success");
        closePopUp();
        executeApi();
        resetForm();
      },
      onError: (errorMessage) => {
        triggerToast(errorMessage, "error");
        console.log("Error creating category:", errorMessage);
      },
    }
  );

  const { loading: deleteAPILoading, executeApi: deleteCategoryAPI } =
    useMutate(deleteHelpCenterCategory, {
      onComplete: (result) => {
        triggerToast("Category  deleted successfully", "success");
        setDeleteCategory(null);
        closeDeletePopup();
        executeApi();
      },
      onError: (errorMessage) => {
        triggerToast(errorMessage, "error");
        console.log("Error deleting category:", errorMessage);
      },
    });

  const handleDeleteAPI = () => {
    if (deleteData) {
      deleteCategoryAPI(String(deleteData.ID));
    }
  };

  useEffect(() => {
    executeApi();
  }, []);

  const route = useNavigate();

  if (loading) {
    return <Loader text="Loading help center categories ..." />;
  }

  if (error) {
    return (
      <DataError
        btnLabel="Reload Categories"
        btnProps={{
          onClick: () => {
            executeApi();
          },
        }}
      />
    );
  }

  return (
    <>
      <Modal show={isDeleteOpen} closeBtn={true} closeMethod={closeDeletePopup}>
        <div className={classes.modalBody}>
          <div className={classes.popHead}>Delete Category</div>
          <div className={classes.description}>
            Are you sure you want to delete {deleteData?.name}
          </div>
          <div className={`${classes.btnOuter}`}>
            <Button
              onClick={(e) => {
                closeDeletePopup();
              }}
              theme="danger"
            >
              <div className={classes.dangerBtn}>Cancel</div>
            </Button>
            <Button onClick={handleDeleteAPI} disabled={deleteAPILoading}>
              <div className={classes.authBtn}>
                {deleteAPILoading ? "Submitting..." : "Delete"}
              </div>
            </Button>
          </div>
        </div>
      </Modal>
      {/* <PopUp
        header={`Delete Category`}
        isOpen={isDeleteOpen}
        onClose={() => {
          closeDeletePopup();
        }}
      >
        <h2>Are you sure you want to delete {deleteData?.name}</h2>
        <div className="submitBtns">
          <Button
            onClick={handleDeleteAPI}
            theme="neon"
            disabled={!deleteData || deleteAPILoading}
          >
            {deleteAPILoading ? "Submitting..." : "Delete"}
          </Button>
          <Button
            onClick={(e) => {
              closeDeletePopup();
            }}
            theme="danger"
          >
            Cancel
          </Button>
        </div>
      </PopUp> */}

      <PopUp
        header={`Add Category`}
        isOpen={isOpen}
        onClose={() => {
          closePopUp();
        }}
      >
        <FormWrapper
          wrapperClass={classes.category}
          label="Category Name"
          id="Category name"
        >
          <TextInput
            value={formState.category_name}
            placeholder="Enter category Name"
            onChange={(e) => {
              handleChange("category_name", e.target.value);
            }}
          />
        </FormWrapper>
        <FormWrapper label="Card type" id={"marketingCountry"}>
          <SelectInput
            label="Select card type"
            value={formState.card_type}
            labelKey="name"
            onChange={(selectedCard) => {
              handleChange("card_type", selectedCard as ISelect);
            }}
            options={cardType}
          />
        </FormWrapper>
        <div className="submitBtns">
          <Button
            onClick={handleSubmit}
            theme="neon"
            disabled={!formState.category_name || mutateLoading}
          >
            {mutateLoading ? "Submitting..." : "Submit"}
          </Button>
          <Button
            onClick={(e) => {
              resetForm();
              closePopUp();
            }}
            theme="danger"
          >
            Cancel
          </Button>
        </div>
      </PopUp>
      <div className={classes.container}>
        <PageAnimation>
          <PageWrapper>
            <div className={classes.filterOut}>
              <FilterDetails
                enableSearch={false}
                enableDate={false}
                tabsArr={tabs}
                activeIndex={1}
                triggerAction={(e) => {
                  if (e === tabs[0].name) {
                    route(routes.helpCenter);
                  }
                  if (e === tabs[2].name) {
                    openPopUp();
                  }
                }}
              />
            </div>
            <div className={classes.helpSectionWrapper}>
              {categories && categories.length > 0 ? (
                categories.map((x:any) => (
                  <div
                    key={x.name}
                    className={classes.helpCard}
                    onClick={() => {
                      route(
                        `/help-center/manage/${x.name}/${x.ID}/${x.card_type}`
                      );
                    }}
                  >
                    <div className={classes.helpCardInner}>
                      <div className={classes.delete}>
                        {x.name}
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteCategory(x);
                            OpenDeletePoPup();
                          }}
                          theme="icon"
                        >
                          <img
                            src="/assets/images/deleteWhite.png"
                            alt="Delete"
                          />
                        </Button>
                      </div>

                      <img src="/assets/images/goArrow.png" alt="Go Icon" />
                    </div>
                  </div>
                ))
              ) : (
                <NoDataFound title="No help center categories found" />
              )}
            </div>
          </PageWrapper>
        </PageAnimation>
      </div>
    </>
  );
};

export default HelpCenter;

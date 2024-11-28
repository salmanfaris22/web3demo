import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb, {
  BreadcrumbSection,
} from "../../../../common/Components/Breadcrumb/Breadcrumb";
import Button from "../../../../common/Components/Button/Button";
import FilterDetails from "../../../../common/Components/FilterDetails/FilterDetails";
import FormWrapper from "../../../../common/Components/FormWrapper/FormWrapper";
import IconUploader from "../../../../common/Components/IconUploader/IconUploader";
import InfoText from "../../../../common/Components/InfoText/InfoText";
import PopUp from "../../../../common/Components/PopuUp/PopuUp";
import usePopUp from "../../../../common/Components/PopuUp/usePopUp";
import TextInput from "../../../../common/Components/TextInput/TextInput";
import MainWrapper from "../../../../common/Layout/PageWrapper/PageWrapper";
import DataError from "../../../../common/UI/DataError/DataError";
import Loader from "../../../../common/UI/Loader/Loader";
import NoDataFound from "../../../../common/UI/NoDataFound/NoDataFound";
import { IMAGE_URL } from "../../../../config";
import { routes } from "../../../../constants/routes";
import useCustomForm from "../../../../hooks/useForms";
import useMutate from "../../../../hooks/useMutate";
import useToast from "../../../../hooks/useToast";
import {
  createHelpCenterSubCategory,
  deleteHelpCenterSubcategory,
  getSubcategoryByCategory,
} from "../../../../services/helpCenter";
import { replacePlaceholders } from "../../../../utils/commonUtils";
import LookingForSomethingElse from "../LookingForSomethingElse/LookingForSomethingElse";
import PageWrapper from "../../../../common/Layout/TableWrapper/TableWrapper";
import classes from "./SubCategorySection.module.scss";
import TicketCards, { TTicketCard } from "./TicketCards/TicketCards";

// export const tickets: TTicketCard[] = [
//   { type: TicketTypes.SignalCard, count: 30 },
//   { type: TicketTypes.Metamask, count: 30 },
//   { type: TicketTypes.Affiliate, count: 0 },
//   { type: TicketTypes.BinanceSmarkChain, count: 30 },
//   { type: TicketTypes.TenCoins, count: 30 },
//   { type: TicketTypes.DepositAndWithDraw, count: 30 },
//   { type: TicketTypes.Swap, count: 30 },
//   { type: TicketTypes.Settings, count: 30 },
// ];


const tabs = [
  {
    name: "Overview",
  },
  {
    name: "Add",
    hasImage: true,
    type: "button",
    Imgurl: "/assets/images/add.png",
    action: "trigger",
  },
];

const SubCategorySection = () => {
  const [deleteData, setDeleteCategory] = useState<null | TTicketCard>(null);

  const { cardType, category, categoryId } = useParams();

  const sections: BreadcrumbSection[] = [
    { label: "Help Centre", link:  routes.helpCenter },
    { label:category as string , link: routes.helpCenterManage },
  ];
  
  const nav = useNavigate();

  const {
    isOpen: isDeleteOpen,
    openPopUp: OpenDeletePoPup,
    closePopUp: closeDeletePopup,
  } = usePopUp();

  const { loading: mutateLoading, executeApi: creaetSubCategory } = useMutate(
    createHelpCenterSubCategory,
    {
      onComplete: (result) => {
        triggerToast("Category subcategory successfully", "success");
        closePopUp();
        getSubCategory(String(categoryId));
        resetForm();
      },
      onError: (errorMessage) => {
        triggerToast(errorMessage, "error");
        console.log("Error creating subcategory:", errorMessage);
      },
    }
  );

  const {
    values: formState,
    handleChange,
    handleSubmit,
    resetForm,
  } = useCustomForm<{ subcategory_name: string; logo: File | null }>({
    initialValues: {
      subcategory_name: "",
      logo: null,
    },
    validators: {
      subcategory_name: { required: "Enter category name" },
      logo: { required: "Enter logo " },
    },

    onSubmit: (values, error) => {
      const formData = new FormData();
      console.log(values);
      formData.append("subcategory_name", values.subcategory_name);
      formData.append("logo", values.logo as Blob);
      formData.append("category_id", String(categoryId));
      creaetSubCategory(formData);
    },
  });


  const { triggerToast } = useToast();

  const {
    data,
    loading,
    executeApi: getSubCategory,
    error,
  } = useMutate(getSubcategoryByCategory, {
    onComplete: (result) => {},
    onError: (errorMessage) => {
      // triggerToast(errorMessage, "error");
      // console.log("Error creating category:", errorMessage);
    },
  });

  useEffect(() => {
    getSubCategory(categoryId as string);
  }, []);

  const subCategory = data?.data.map((x: any) => {
    return {
      name: x.name,
      count: x.question_count,
      logo: IMAGE_URL + "/" + x.logo_path,
      id: x.ID,
    };
  });

  const { loading: deleteAPILoading, executeApi: deleteSubCategory } =
    useMutate(deleteHelpCenterSubcategory, {
      onComplete: (result) => {
        triggerToast("Sub category  deleted successfully", "success");
        setDeleteCategory(null);
        closeDeletePopup();
        getSubCategory(String(categoryId));
      },
      onError: (errorMessage) => {
        triggerToast(errorMessage, "error");
        console.log("Error deleting S:", errorMessage);
      },
    });

  const handleDeleteAPI = () => {
    if (deleteData) {
      deleteSubCategory(String(deleteData.id));
    }
  };

  const handleCardNavigation = (subCategory: string, subCategoryId: string ) => {
    const url = replacePlaceholders(routes.primarySectionQns, {
      category: category as string,
      categoryId : categoryId as string,
      subCategory,
      subCategoryId,
      cardType : cardType as string
    });

    nav(url);
  };

  const { isOpen, openPopUp, closePopUp } = usePopUp();

  if (loading) {
    return <Loader text="Loading help center sub categories ..." />;
  }

  if (error) {
    return (
      <DataError
        btnLabel="Reload sub categories"
        btnProps={{
          onClick: () => {
            getSubCategory(String(categoryId));
          },
        }}
      />
    );
  }

  return (
    <div className={classes.container}>
      <PopUp
        header={`Delete Sub Category`}
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
      </PopUp>
      <PopUp
        header={`Add  Sub Category`}
        isOpen={isOpen}
        onClose={() => {
          closePopUp();
        }}
      >
        <FormWrapper
          wrapperClass={classes.category}
          label="Sub Category Name"
          id="Category name"
        >
          <TextInput
            value={formState.subcategory_name}
            placeholder="Enter Sub category name"
            onChange={(e) => {
              handleChange("subcategory_name", e.target.value);
            }}
          />
        </FormWrapper>
        <FormWrapper label="Logo" id={"marketingCountry"}>
          <IconUploader
            placeholder="Click here to upload logo"
            onUpload={(file) => {
              handleChange("logo", file);
            }}
          />
        </FormWrapper>
        <InfoText
          text={`Please select an image under 1MB, with a preferred size of ${
            cardType === "1" ? "40x40 pixels" : "80*80 pixels"
          }.`}
        />

        <div className="submitBtns">
          <Button
            onClick={handleSubmit}
            theme="neon"
            disabled={!formState.subcategory_name || mutateLoading}
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
      <MainWrapper>
        <div className={classes.filterOut}>
          <FilterDetails
            enableSearch={false}
            enableDate={false}
            tabsArr={tabs}
            activeIndex={1}
            triggerAction={(e) => {
              if (e === tabs[1].name) {
                openPopUp();
              }
            }}
          />
        </div>
        <div className={classes.breadCrumb}>
          <Breadcrumb sections={[...sections, { label:  cardType === "1" ? `Primary Section` : `Looking for Something Else` }]} />
        </div>
        <PageWrapper
          title={
            cardType === "1" ? `Primary Section` : `Looking for Something Else`
          }
        >
          {subCategory && subCategory.length > 0 ? (
            cardType === "1" ? (
              <div className={classes.ticketCardWrapper}>
                <TicketCards
                  handleOnclick={(x) => {
                    setDeleteCategory(x);
                    OpenDeletePoPup();
                  }}
                  ticketCard={subCategory || []}
                  handleNavigation={({ subCategory, subCategoryId }) => {
                    handleCardNavigation(subCategory, subCategoryId);
                  }}
                />
              </div>
            ) : (
              <LookingForSomethingElse
                ticketCard={subCategory}
                handleOnclick={(x) => {
                  setDeleteCategory(x);
                  OpenDeletePoPup();
                }}
                handleNavigation={({ subCategory, subCategoryId }) => {
                  handleCardNavigation(subCategory, subCategoryId);
                }}
              />
            )
          ) : (
            <NoDataFound title={`No sub catgory found under ${category} `} />
          )}
        </PageWrapper>
      </MainWrapper>
    </div>
  );
};

export default SubCategorySection;

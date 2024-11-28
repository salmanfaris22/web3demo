import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Autocomplete from "../../common/Components/Autocomplete/Autocomplete";
import Button from "../../common/Components/Button/Button";
import FileUploader from "../../common/Components/FileUploader/FileUploader";
import FormWrapper from "../../common/Components/FormWrapper/FormWrapper";
import NumberInput from "../../common/Components/NumberInput/NumberInput";
import NumOnlyInput from "../../common/Components/NumOnlyInput/NumOnlyInput";
import RadioButtonGroup from "../../common/Components/RadioButtonGroup/RadioButtonGroup";
import TextInput from "../../common/Components/TextInput/TextInput";
import {
  routers
} from "../../common/Constants";
import SelectInput, { ISelect } from "../../common/SelectInput/SelectInput";
import useApi from "../../hooks/useAPI";
import useCustomForm from "../../hooks/useForms";
import {
  getContentType,
  getCountry,
  getLanguages,
  getMarketerType,
  getSocialMedia,
  submitAffForm,
} from "../../services/common";
import { setHasFormSubmitted } from "../../store/authSlice";
import { showToast } from "../../store/toastSlice";
import {
  formatRadioOptions,
  scrollToElementWithMargin,
} from "../../utils/commonutils";
import styles from "./SignupForm.module.scss";


interface IFormState {
  name: string;
  country:  {code:string , id:number , name:string} | null;
  email: string;
  phone: string;
  language: null | ISelect;
  social: ISelect | null;
  username: string;
  marketingCountry: null | {code:string , id:number , name:string};
  affiliateMarketerType: string;
  affiliateType: string;
  intro: string;
  promotingPlatform: ISelect | null;
  platFormUrl: string;
  followCount: number | undefined;
  typeOfContent: ISelect | null;
  remarks: string;
  file: File | null;
}

function SignupForm() {
  const dispatch = useDispatch();
  const [basedCountry, setBasedCountry] = useState([]);
  const [marketingCountry, setMarketingCountry] = useState([]);
  const hasFilled =JSON.parse(sessionStorage.getItem("form_submitted") as string);

  const {
    data: countryData,
    loading,
    executeApi: getCountryAPI,
  } = useApi(getCountry, {
    onComplete: (data, key) => {
      if (!key) {
        setBasedCountry(data?.data || []);
        setMarketingCountry(data?.data || []);
      }
      if (key === "baseCountry") {
        setBasedCountry(data?.data || []);
      }
      if (key === "marketingCountry") {
        setMarketingCountry(data?.data || []);
      }
    },
  });
  const {
    data: socialMediaData,
    loading: socialMediaLoading,
    executeApi: getSocialAPI,
  } = useApi(getSocialMedia);
  const {
    data: languagesData,
    loading: languageLoading,
    executeApi: getLanguagesAPI,
  } = useApi(getLanguages);
  const {
    data: marketerType,
    loading: marketerTypeLoading,
    executeApi: getMarketerTypeAPI,
  } = useApi(getMarketerType);

  const {
    data: contentTypeData,
    loading: contentTypeLoaiding,
    executeApi: getContentTypeAPI,
  } = useApi(getContentType);

  const router = useNavigate()

  const {executeApi: submitForm , loading : isSubmitLoading} = useApi(submitAffForm , {onComplete:(s)=>{
    dispatch(
      showToast({
        message: s.status,
        type: "success",
        timeout: 5000,
      })
    );
    dispatch(setHasFormSubmitted(true))
    router(-1)

  }, onError:(e)=>{
    dispatch(
      showToast({
        message: e,
        type: "error",
        timeout: 5000,
      })
    );
  }})

 

  useEffect(() => {
    if(!hasFilled){
    getCountryAPI("");
    getSocialAPI();
    getLanguagesAPI("");
    getMarketerTypeAPI();
    getContentTypeAPI()
    }else{
      router(routers.overview)
    }
  }, [hasFilled]);

  const socialMediaList = socialMediaData?.data;
  const languagesList = languagesData?.data;
  const countryList = countryData?.data;
  const marketerTypesList = marketerType?.data;
  const contentTypeList  = contentTypeData?.data;
  const listAPILoading =
    loading || marketerTypeLoading || languageLoading || socialMediaLoading;
 const affmarketType = formatRadioOptions(
  marketerTypesList?.affiliate_marketer_data,
  "name",
  "id"
) || []   

const affType =  formatRadioOptions(
  marketerTypesList?.affiliate_types,
  "name",
  "id"
) || []

  const {
    values: formState,
    handleChange,
    handleSubmit,
    resetForm,
  } = useCustomForm<IFormState>({
    initialValues: {
      name: "",
      country: null,
      email: "",
      phone: "",
      language: null,
      username: "",
      social: null,
      marketingCountry: null,
      affiliateMarketerType: "",
      affiliateType: "",
      intro: "",
      promotingPlatform: null,
      platFormUrl: "",
      followCount: undefined,
      typeOfContent: null,
      remarks: "",
      file: null,
    },
    validators: {
      name: { required: "Enter name" },
      country: { required: "Enter country" },
      language: { required: "Select a language" },
      email: (value) =>
        /\S+@\S+\.\S+/.test(value) ? undefined : "Enter valid email address",

      phone: {
        required: "Enter phone number",
        custom: (value: string) =>
          /^\d{10}$/.test(value)
            ? undefined
            : "Enter a valid 10-digit phone number",
      },
      social: { required: "Enter social media handle" },

      username: { required: "Enter username" },

      marketingCountry: { required: "Enter marketing country" },
      affiliateMarketerType: { required: "Select affiliate marketer type" },
      affiliateType: { required: "Select affiliate type" },
      intro: { required: "Provide an introduction" },
      promotingPlatform: { required: "Select a promo  ting platform" },
      platFormUrl: {
        required: "Enter valid platform URL",
        custom: (value: string) =>
          /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value)
            ? undefined
            : "Enter a valid URL",
      },
      followCount: {
        custom: (value: number | undefined) =>
          value !== undefined && value > 0
            ? undefined
            : "Enter a valid follower count",
      },
      file: { required: "Select a screenshot" },

      typeOfContent: { required: "Select type of content" },
      remarks: {
        custom: (value: string) =>
          value.length <= 200
            ? undefined
            : "Remarks should be less than 200 characters",
      },
    },
    onSubmit: (values, error) => {
      console.log(values, error);
      if (error ) {
        const errKey = Object.keys(error);
        if (errKey.length > 0) {
          //@ts-ignore
          const message = error[errKey[0]];
          scrollToElementWithMargin(errKey[0]);
          dispatch(
            showToast({
              message: message,
              type: "error",
              timeout: 5000,
            })
          );
        } 
      }else{
        console.log(formState , "frms")
        const affMarketType = affmarketType.find((am)=>am.value === formState.affiliateMarketerType)
        const afftype = affType.find((am)=>am.value === formState.affiliateType)
        const apiData = new FormData();
        apiData.append("social_media_id", String(formState.social?.value));
        apiData.append("social_media_username", String(formState?.username));
        apiData.append(
          "marketing_country_id",
          String(formState?.marketingCountry?.id)
        );
        apiData.append("marketer_type" ,affMarketType.label);
        apiData.append("affiliate_type" ,afftype.label);
        apiData.append("content_type" , String(formState.typeOfContent?.name))
        apiData.append("platform_description" , formState.intro);
        //@ts-ignore
        apiData.append("promoting_social_media_id" , formState.promotingPlatform?.id);
        apiData.append("promotion_link" , formState.platFormUrl)
        apiData.append("followers_count" , String(formState.followCount))
        apiData.append("performance_screenshot" , formState.file as Blob)
        apiData.append("additional_info" , formState.remarks)
        apiData.append("username" , formState.username)
        apiData.append("email" , formState.email)

        submitForm(apiData)
      }
      // Handle form submission
    },
  });

  useEffect(() => {
    console.log(formState.country, "country");
  }, [formState.country]);

  return (
    <div className={styles.container}>
      <div>
        <form>
          <div className={styles.formContainer}>
            <div className={styles.formElementWrapper}>
              <FormWrapper label="Name" id={"name"}>
                <TextInput
                  placeholder="Enter Name"
                  type="text"
                  value={formState.name}
                  onChange={(e) => {
                    handleChange("name", e.target.value);
                  }}
                />
              </FormWrapper>
            </div>
            <div className={styles.formElementWrapper}>
              <FormWrapper label="Which Country You Are  Base In" id="country">
                <Autocomplete
                  isSearchig={loading}
                  options={basedCountry}
                  placeholder="Select Country"
                  optionKey="name"
                  value={formState["country"]}
                  onChange={(selectedCountry: any) => {
                    
                    handleChange("country", selectedCountry as ISelect);
                  }}
                  completeMethod={(e) => {
                    console.log(e , "es")
                    getCountryAPI(e, "baseCountry");
                  }}
                />
                {/* <SelectInput
                  //@ts-ignore
                  labelKey="name"
                  value={formState["country"]}
                  onChange={(selectedCountry) => {
                    handleChange("country", selectedCountry as ISelect);
                  }}
                  options={countryList}
                /> */}
              </FormWrapper>
            </div>
            <div className={styles.formElementWrapper}>
              <FormWrapper label="Language" id="language">
                <Autocomplete
                  isSearchig={loading}
                  options={languagesList}
                  placeholder="Select Language"
                  optionKey="name"
                  value={formState["language"]}
                  onChange={(selectedCountry: any) => {
                    handleChange("language", selectedCountry as ISelect);
                  }}
                  completeMethod={(e) => {
                    getLanguagesAPI(e);
                  }}
                />
              </FormWrapper>
            </div>
            <div className={styles.formElementWrapper}>
              <FormWrapper label="Email" id={"email"}>
                <TextInput
                  value={formState.email}
                  placeholder="Email"
                  type="email"
                  onChange={(e) => {
                    handleChange("email", e.target.value);
                  }}
                />
              </FormWrapper>
            </div>
            <div className={styles.formElementWrapper}>
              <FormWrapper label="Phone number" id={"phone"}>
                <NumOnlyInput
                  value={formState.phone}
                  placeholder="Enter the phone number"
                  type="text"
                  onChange={(e) => {
                    handleChange("phone", e.target.value);
                  }}
                />
              </FormWrapper>
            </div>
            <div className={styles.formElementWrapper}>
              <FormWrapper
                label="How do we contact you? (through Social Media)"
                id={"social"}
              >
                <SelectInput
                  //@ts-ignore
                  labelKey="name"
                  value={formState.social}
                  onChange={(selectedSocialMedia) => {
                    console.log(selectedSocialMedia);
                    handleChange("social", selectedSocialMedia as ISelect);
                  }}
                  options={socialMediaList}
                />
              </FormWrapper>
            </div>
            <div className={styles.formElementWrapper}>
              <FormWrapper
                label="Username (to contact you on Social Media)"
                id={"username"}
              >
                <TextInput
                  value={formState.username}
                  placeholder="Enter username"
                  type="text"
                  onChange={(e) => {
                    handleChange("username", e.target.value);
                  }}
                />
              </FormWrapper>
            </div>
            <div className={styles.formElementWrapper}>
              <FormWrapper
                label="What country or region do you plan on marketing in?"
                id={"marketingCountry"}
              >
                <Autocomplete
                  isSearchig={loading}
                  options={marketingCountry}
                  placeholder="Select Country"
                  optionKey="name"
                  value={formState["marketingCountry"]}
                  onChange={(selectedCountry: any) => {
                    handleChange(
                      "marketingCountry",
                      selectedCountry as ISelect
                    );
                  }}
                  completeMethod={(e) => {
                    getCountryAPI(e, "marketingCountry");
                  }}
                />
              </FormWrapper>
            </div>
            <div className={styles.formFull}>
              <FormWrapper
                label="What type of affiliate marketer are you?"
                id={"affiliateMarketerType"}
              >
                <p className={styles.subQn}>
                  To become an affiliate and promote our AI-driven insights,
                  it’s essential that you first subscribe to or participate in
                  our products and services.
                </p>
                <RadioButtonGroup<string>
                  id="affiliateMarketer"
                  options={
                    affmarketType
                  }
                  name="affiliateMarket"
                  className={styles.affiliateMarketer}
                  selectedValue={formState.affiliateMarketerType}
                  onChange={(value) => {
                    handleChange("affiliateMarketerType", value);
                  }}
                />
              </FormWrapper>
            </div>
            <div className={styles.formFull}>
              <FormWrapper
                label="Select your Affiliate type"
                id={"affiliateType"}
              >
                <RadioButtonGroup<string>
                  id="affiliateType"
                  options={
                   affType
                  }
                  name="affiliateType"
                  className={styles.affiliateType}
                  selectedValue={formState.affiliateType}
                  onChange={(value) => {
                    handleChange("affiliateType", value);
                  }}
                />
              </FormWrapper>
            </div>
            <div className={`${styles.formFull}`}>
              <FormWrapper
                label="Please share a brief introduction about yourself and your respective platform/community."
                id={"intro"}
                fullWidth={false}
              >
                <TextInput
                  value={formState.intro}
                  placeholder="Enter describtion and number of followers"
                  type="text"
                  onChange={(e) => {
                    handleChange("intro", e.target.value);
                  }}
                />
              </FormWrapper>
            </div>
            <div className={styles.formElementWrapper}>
              <FormWrapper
                label="Primary Platform/Channel for promoting"
                id={"promotingPlatform"}
              >
                <SelectInput
                  //@ts-ignore
                  labelKey="name"
                  value={formState.promotingPlatform}
                  onChange={(selectedSocialMedia) => {
                    console.log(selectedSocialMedia);
                    handleChange(
                      "promotingPlatform",
                      selectedSocialMedia as ISelect
                    );
                  }}
                  options={socialMediaList}
                />
              </FormWrapper>
            </div>
            <div className={styles.formElementWrapper}>
              <FormWrapper label="Platform URL" id={"platFormUrl"}>
                <TextInput
                  value={formState.platFormUrl}
                  placeholder="Enter username"
                  type="text"
                  onChange={(e) => {
                    handleChange("platFormUrl", e.target.value);
                  }}
                />
              </FormWrapper>
            </div>
            <div className={styles.formElementWrapper}>
              <FormWrapper
                label="How many followers/members/users do you have on your primary platform?"
                id={"followCount"}
                fullWidth
              >
                <div className={styles.numSelector}>
                  <NumberInput
                    label=""
                    type="number"
                    placeholder="Select"
                    value={formState.followCount}
                    updated={(e) => {
                      handleChange("followCount", e);
                    }}
                  />
                </div>
              </FormWrapper>
            </div>
            <div className={`${styles.formFull}`}>
              <FormWrapper
                label="Screenshot of performance metrics on your platforms"
                id={"file"}
              >
                <div className={styles.uploader}>
                  <FileUploader
                    onUpload={(file) => {
                      handleChange("file", file);
                    }}
                  />
                </div>
              </FormWrapper>
            </div>
            <div className={styles.formFull}>
              <FormWrapper
                label="What kind of content do you create in your platform/for your community?"
                id={"typeOfContent"}
                fullWidth={false}
              >
                <SelectInput
                  //@ts-ignore
                  labelKey="name"
                  value={formState.typeOfContent}
                  onChange={(typeofContent) => {
                    console.log(typeofContent);
                    handleChange("typeOfContent", typeofContent as ISelect);
                  }}
                  options={contentTypeList?.map((x:any)=>{
                    return {name : x}
                  })}
                />
              </FormWrapper>
            </div>
            <div className={styles.formFull}>
              <FormWrapper
                label="Is there anything else that you would like to share?"
                id={"remarks"}
                fullWidth={false}
              >
                <TextInput
                  value={formState.remarks}
                  placeholder="Your answer"
                  type="text"
                  onChange={(e) => {
                    handleChange("remarks", e.target.value);
                  }}
                />
              </FormWrapper>
            </div>
          </div>
        </form>
        <p className={styles.tandc}>
          By submitting this application, I acknowledge to have read and agree
          to the Exdex Affiliate Program Standard Terms and
          Conditions.
        </p>
        <p
          className={styles.infoTandC}
          onClick={() => {
            window.open(routers.termsOfService, "_blank");
          }}
        >
          You can find Exdex Affiliate Program Standard Terms and Conditions
        </p>
      </div>
      <div className={styles.btnGroup}>
        <button onClick={resetForm} disabled={isSubmitLoading}>Reset</button>
        <Button isLoading={isSubmitLoading} onClick={handleSubmit} disabled={isSubmitLoading} >Submit</Button>
      </div>
    </div>
  );
}

export default SignupForm;

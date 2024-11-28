import PageWrapper from "../../common/Components/PageWrapper/PageWrapper";
import SignupForm from "./SignupForm";
import styles from "./SignupFormPage.module.scss";

const SignupFormPage = () => {
  return (
    <div className={styles.container}>
        <div>
          <h1>Tell Us About Yourself</h1>
          <p>
            Thank you for joining the Exdex Affiliate Program! To help us get to
            know you better, please take a moment to fill out the form below.
            Your information will help us tailor our support and resources to
            best suit your needs. We’re excited to partner with you and look
            forward to building a successful collaboration!
          </p>
        </div>
        <SignupForm/>
    </div>
  );
};

export default SignupFormPage;

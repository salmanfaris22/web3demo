import React, { useEffect, useRef, useState } from "react";
import styles from "./ParticipationAgreement.module.scss";
import PageWrapper from "../../common/Components/PageWrapper/PageWrapper";
import Signature from "../../common/Components/Signature/Signature";
import SignaturePad from "react-signature-pad-wrapper";
import Button from "../../common/Components/Button/Button";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { hideToastById, showToast } from "../../store/toastSlice";
import { useNavigate } from "react-router-dom";
import { signAgreement } from "../../services/plan";
import { selectPlanStatus, setPlanStatus } from "../../store/authSlice";
import { getUserPlanStatus } from "../../services/user";

const ParticipationAgreement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signatureRef = useRef<SignaturePad>(null);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);
  const [btnText, setBtnText] = useState("I Agree");
  const planStatus = useSelector(selectPlanStatus);

  useEffect(() => {
    if (planStatus == "PLAN_NOT_PURCHASED") {
      navigate("/autotrade");
    }
    if (planStatus == "CONTRACT_SIGNED") {
      navigate("/dashboard");
    }
  }, [planStatus]);

  const dataURLToBlob = (dataURL: string) => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const redirect = (url: any) => {
    navigate(url);
  };

  const getPlanStatus = async () => {
    try {
      const response = await getUserPlanStatus();
      if (response.status) {
        dispatch(setPlanStatus(response.data));
        navigate(`/dashboard`);
      }
    } catch (err: any) {
      try {
        if (err.response.data.error) {
          dispatch(
            showToast({
              message: err.response.data.error,
              type: "error",
              timeout: 5000,
            })
          );
        }
      } catch (e) {
        console.log(e);
      }
    } finally {
    }
  };

  const handleClearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
  };

  const signatureImage = async (user_plan_id: any) => {
    if (signatureRef.current && signatureRef.current.isEmpty()) {
      dispatch(
        showToast({
          message: "Invalid Signature",
          type: "error",
          timeout: 5000,
        })
      );
      return;
    }
    if (signatureRef.current) {
      const png = signatureRef.current.toDataURL();
      const blob = dataURLToBlob(png);
      const formData = new FormData();
      formData.append("signature", blob);
      setBtnText("Signing...");
      try {
        const response = await signAgreement(formData);
        if (response.status) {
          setBtnText("I Agree");
          dispatch(hideToastById(10));
          dispatch(
            showToast({
              message: response.message,
              type: "success",
              timeout: 5000,
            })
          );
          getPlanStatus();
        }
      } catch (err) {
        console.log(err);
        setBtnText("I Agree");
        dispatch(hideToastById(10));
      } finally {
        setBtnText("I Agree");
        dispatch(hideToastById(10));
        setLoading(false);
      }
    } else {
      dispatch(
        showToast({
          message: "Invalid Signature",
          type: "error",
          timeout: 5000,
        })
      );
    }
  };

  return (
    <PageWrapper type="narrow">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        animate="once"
        viewport={{ once: true }}
        transition={{
          ease: "easeIn",
          duration: 0.3,
          delay: 0.1,
        }}
        className={styles.pageWrap}
      >
        <div className={`maxScreen ${styles.container}`}>
          <div className={styles.headerWrap}>
            <div className={styles.agreementHeader}>
              <span>Affiliate Marketing Participation Agreement</span>
              <img src="/assets/images/logo.png" alt="logo" />
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.contetnt}>
              <p>
                {" "}
                Welcome to Exdex’s Affiliate Marketing Program! We’re excited to
                offer you a unique opportunity to earn rewards by sharing your
                referral link with others and inviting them to explore our
                platform’s features and benefits. This program allows affiliates
                to introduce others to Exdex, providing access to a range of
                financial tools, trading insights, and educational resources
                while earning competitive commissions.
              </p>
              <p className={styles.strong}>
                Your Responsibilities as an Exdex Affiliate
              </p>
              <p>
                As an affiliate, your role is to share your personalized
                referral link with potential users who may be interested in
                Exdex’s offerings. To ensure transparency and compliance, please
                keep the following requirements and best practices in mind:
              </p>
              <ul>
                <li>
                  <div>1.⁠ ⁠Legal Compliance: </div>
                  Each affiliate must ensure that their promotional activities
                  are in full compliance with the laws, regulations, and
                  guidelines of their respective country. This includes, but is
                  not limited to, adherence to marketing standards, data
                  protection laws, and all applicable advertising requirements.
                  Before engaging in any marketing or promotional efforts,
                  please verify that your activities comply with local
                  regulations.{" "}
                </li>

                <li>
                  <div>2.⁠ ⁠Due Diligence: </div>
                  It is essential that affiliates practice due diligence when
                  inviting others to join Exdex. You are responsible for making
                  honest and accurate representations about our platform,
                  including its potential benefits and associated risks.
                  Misleading or false claims are strictly prohibited and may
                  result in termination of your participation in the affiliate
                  program.
                </li>

                <li>
                  <div>3.⁠ ⁠Marketing Materials: </div>
                  Exdex may provide you with certain promotional materials and
                  content guidelines to help you promote our platform. It is
                  your responsibility to use only approved content and ensure
                  that all materials are used in a manner consistent with
                  Exdex’s standards and brand integrity.
                </li>

                <li>
                  <div>4.⁠ ⁠Ethical Marketing Practices: </div>
                  We expect all affiliates to maintain ethical standards in
                  their promotional activities. This includes respecting user
                  privacy, providing truthful information, and refraining from
                  any activities that could be perceived as spam, harassment, or
                  misrepresentation. Engaging in unethical marketing practices
                  can lead to the suspension or termination of your affiliate
                  privileges.
                </li>
              </ul>
              <p className={styles.strong}> Digital Signature Requirement</p>
              <p>
                {" "}
                By proceeding, you acknowledge that you have carefully reviewed
                all terms and conditions of the Exdex Affiliate Marketing
                Program. You confirm that you have conducted the necessary due
                diligence to comply with your country’s legal standards for
                affiliate marketing. To finalize your participation, we require
                a digital signature as your confirmation of acceptance and
                understanding of these terms.
              </p>
              <p>
                {" "}
                Please sign digitally below to confirm that you have read,
                understood, and agreed to these terms. By signing, you also
                accept full responsibility for ensuring that your marketing
                efforts remain lawful and compliant at all times.
              </p>
            </div>

            <div className={styles.logoBg}>
              <img src="/assets/images/logoLg.png" alt="Logo background" />
            </div>
          </div>
          <div className={styles.signature}>
            <div className={styles.signatureWrap}>
              <div className={styles.signatureContainer}>
                <Signature
                  ref={signatureRef}
                  width={innerWidth > 900 ? 500 : undefined}
                  height={100}
                  options={{
                    backgroundColor: "rgba(217, 217, 217, 1)",
                    penColor: "rgba(31, 69, 79, 1)",
                    minWidth: 3,
                    maxWidth: 5,
                  }}
                />
              </div>

              <div className={styles.signatureBtn}>
                <Button
                  theme="material-danger"
                  onClick={() => {
                    redirect("-1");
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleClearSignature}>Clear Signature</Button>
                <Button
                  theme="neon"
                  onClick={signatureImage}
                  disabled={btnText != "I Agree"}
                >
                  {btnText}
                </Button>
              </div>
            </div>
            <div className={styles.terms}>
              <h3>Affiliate Program Terms and Platform Rights</h3>
              <p>
                Exdex is committed to providing an effective and rewarding
                affiliate program, and we continually assess and adapt our
                strategies to maintain an optimal experience for both our
                affiliates and users. As part of this commitment, Exdex reserves
                the right to modify, update, or amend any aspect of the
                Affiliate Marketing Program when necessary. These changes may
                include adjustments to commission structures, program rules,
                marketing guidelines, or any other component deemed essential
                for the program’s integrity and effectiveness. These adjustments
                are made solely with the goal of enhancing user experience,
                ensuring compliance with industry standards, and supporting the
                long-term success of our affiliates. Exdex will notify
                affiliates of significant changes, and it is each affiliate’s
                responsibility to stay informed about any updates to the
                program’s terms. By participating in the Affiliate Marketing
                Program, you agree to abide by any modifications made by Exdex
                and understand that these changes are made in the best interest
                of both the platform and its users.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </PageWrapper>
  );
};

export default ParticipationAgreement;

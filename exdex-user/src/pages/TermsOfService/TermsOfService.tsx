import React, { useEffect, useState } from "react";
import styles from "./TermsOfService.module.scss";
import PageWrapper from "../../common/Components/PageWrapper/PageWrapper";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToElementWithMargin } from "../../utils/commonutils";
import { HEADER } from "../../common/Layout/Header/Header";
import SelectInput from "../../common/SelectInput/SelectInput";

const termsMenus = [
  {
    name: "Terms of service",
    id: "terms",
  },
  {
    name: "Privacy Policy",
    id: "privacy-policy",
  },
  {
    name: "Legal and Regulatory",
    id: "legal-and-regulatory",
  },
  {
    name: "KYC and AML Compliance",
    id: "kyc-and-aml-compliance",
  },
  {
    name: "Data protection",
    id: "data-protection",
  },
  {
    name: "Risk Disclosure",
    id: "risk-disclosure",
  },
];

const TermsOfService = () => {
  const [selectedMenu, setSelected] = useState(termsMenus[0]);

  const [termId, setTermId] = useState<string | null>(null);

  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section");
    if (section) {
      setTermId(section);
    }
  }, [location]);

  const handleMenuClick = (id: string) => {
    scrollToElementWithMargin(HEADER);
    setTermId(id);
    history(`?section=${id}`);
  };

  return (
    <PageWrapper>
      <SelectInput
        options={termsMenus}
        labelKey="name"
        value={selectedMenu}
        className={styles.selectMenu}
        onChange={(e) => {
          //@ts-ignore
          setSelected(e);
          //@ts-ignore
          setTermId(e.id);
        }}
      />
      <div className={styles.container}>
        <div className={styles.menuPicker}>
          {termsMenus.map((x) => {
            return (
              <button
                key={x.id}
                className={styles.menuItems}
                onClick={() => handleMenuClick(x.id)}
              >
                {x.name}
              </button>
            );
          })}
        </div>
        <div className={styles.termsDetails}>
          <div
            className={styles.termDescription}
            style={{ display: termId == termsMenus[0].id ? "block" : "none" }}
            id={termsMenus[0].id}
          >
            <h2>Terms of Service</h2>
            <h3> 1. Introduction</h3>
            <p>
              Welcome to Exdex.com. By accessing or using our website, products,
              and services, you agree to comply with and be bound by the
              following Terms of Service. If you do not agree to these terms,
              please do not use our services.
            </p>
            <h3>2. Eligibility</h3>
            <p>
              To use our platform, you must be at least 18 years old and legally
              capable of entering into binding contracts. By using Exdex, you
              represent that you meet these requirements.
            </p>
            <h3>3. Account Registration</h3>
            <p>
              You may be required to create an account to access certain
              features of our platform. You agree to provide accurate and
              complete information during registration and to update your
              information as necessary. You are responsible for maintaining the
              confidentiality of your account and password.
            </p>
            <h3>4. Use of Services</h3>
            <p>
              Exdex offers various financial products and services, including
              AI-driven insights, automated trading, and educational resources.
              You agree to use these services for lawful purposes only and in
              accordance with these Terms.
            </p>
            <h3>5. Subscription and Payment</h3>
            <p>
              Certain features of Exdex require a subscription. By subscribing,
              you agree to pay the applicable fees and abide by the payment
              terms. Subscription fees are non-refundable unless otherwise
              stated.
            </p>
            <h3>6. Affiliate Marketing Program</h3>
            <p>
              Our affiliate marketing program allows you to earn commissions by
              referring others to Exdex. To participate, you must subscribe to
              one of our products or services. Commissions are paid according to
              the structure outlined in our affiliate program details. We
              reserve the right to modify or terminate the program at any time.
            </p>
            <h3>7. Intellectual Property</h3>
            <p>
              All content, trademarks, and intellectual property on Exdex.com
              are owned by Exdex or its licensors. You may not reproduce,
              distribute, or create derivative works from any content on our
              platform without prior written permission.
            </p>
            <h3>8. Limitation of Liability</h3>
            <p>
              xdex is not liable for any damages resulting from your use of our
              platform, including but not limited to losses, financial or
              otherwise, resulting from trading activities or reliance on
              AI-generated insights.
            </p>
            <h3>9. Termination</h3>
            <p>
              We reserve the right to suspend or terminate your account and
              access to our services at our discretion, without prior notice, if
              you violate these Terms.
            </p>
            <h3>10. Changes to the Terms</h3>
            <p>
              We may update these Terms of Service from time to time. Any
              changes will be effective immediately upon posting on our website.
              Your continued use of our services constitutes acceptance of the
              new Terms.
            </p>
            <h3>11. Contact Information</h3>
            <p>
              For any questions or concerns regarding these Terms, please
              contact us at:
            </p>
            <p>Email: info@exdex.com</p>
          </div>
          <div
            className={styles.termDescription}
            style={{ display: termId === termsMenus[1].id ? "block" : "none" }}
            id={termsMenus[1].id}
          >
            <h2>Privacy Policy</h2>
            <h3>1. Introduction</h3>
            <p>
              Exdex is committed to protecting your privacy. This Privacy Policy
              outlines how we collect, use, and safeguard your personal
              information when you use our website and services.
            </p>
            <h3>2. Information We Collect</h3>
            We collect information that you provide directly to us when you
            register, subscribe, or use our services. This may include your
            name, email address, payment information, and other details
            necessary to provide our services.
            <p>
              We may also collect information automatically through cookies and
              other tracking technologies, such as your IP address, browser
              type, and usage data.
            </p>
            <h3>3. How We Use Your Information</h3>
            <p>We use your information to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and manage your account</li>
              <li>
                Communicate with you, including sending marketing communications
              </li>
              <li>Analyze usage patterns to improve our platform</li>
            </ul>
            <h3>4. Sharing Your Information</h3>
            <p>
              We do not sell or rent your personal information to third parties.
              We may share your information with trusted partners who assist us
              in operating our website and services, provided they agree to keep
              this information confidential.
            </p>
            We may also disclose your information if required by law or in
            response to legal requests.
            <h3>5. Cookies and Tracking Technologies</h3>
            <p>
              Exdex uses cookies and similar technologies to enhance your
              experience on our platform. You can control the use of cookies
              through your browser settings, but please note that disabling
              cookies may affect the functionality of our services.
            </p>
            <h3>6. Data Security</h3>
            <p>
              We implement a variety of security measures to protect your
              personal information. However, no method of transmission over the
              internet is 100% secure, and we cannot guarantee the absolute
              security of your data.
            </p>
            <h3>7. Your Rights</h3>
            <p>
              You have the right to access, correct, or delete your personal
              information. You may also opt-out of receiving marketing
              communications from us by following the unsubscribe instructions
              in our emails or contacting us directly.
            </p>
            <h3>8. Changes to the Privacy Policy</h3>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be effective immediately upon posting on our website. Your
              continued use of our services constitutes acceptance of the new
              Privacy Policy.
            </p>
            <h3>9. Contact Information</h3>
            <p>
              For any questions or concerns regarding this Privacy Policy,
              please contact us at:
            </p>
            <p> Email: info@exdex.com </p>
            <p> Marketing Inquiries: marketing@exdex.com </p>
            <p> General Inquiries: james@exdex.com</p>
          </div>
          <div
            className={styles.termDescription}
            style={{ display: termId === termsMenus[2].id ? "block" : "none" }}
            id={termsMenus[2].id}
          >
            <h2>Legal and Regulatory</h2>
            <h3>1. Licenses and Registration</h3>
            <p>
              Exdex operates in full compliance with applicable financial
              regulations and holds the necessary licenses and registrations to
              provide trading and investment services. We adhere to the highest
              standards in the financial industry, ensuring that our platform
              meets all legal requirements in the jurisdictions in which we
              operate.
            </p>
          </div>
          <div
            className={styles.termDescription}
            style={{ display: termId === termsMenus[3].id ? "block" : "none" }}
            id={termsMenus[3].id}
          >
            <h2> 2. KYC and AML Compliance </h2>{" "}
            <p>
              {" "}
              To maintain the integrity of our platform and comply with global
              financial regulations, Exdex follows strict Know Your Customer
              (KYC) and Anti-Money Laundering (AML) policies. All users are
              required to verify their identity before accessing certain
              services. These measures help prevent fraud, money laundering, and
              other illicit activities, ensuring a secure and trustworthy
              environment for all users.
            </p>
          </div>
          <div
            className={styles.termDescription}
            style={{ display: termId === termsMenus[4].id ? "block" : "none" }}
            id={termsMenus[4].id}
          >
            <h2> 3. Data Protection</h2>{" "}
            <p>
              At Exdex, protecting your personal information is a top priority.
              We are committed to safeguarding your data through robust security
              measures and strict adherence to data protection laws. Our
              platform employs advanced encryption and security protocols to
              ensure that your personal and financial information remains
              confidential and secure at all times.
            </p>
          </div>
          <div
            className={styles.termDescription}
            style={{ display: termId === termsMenus[5].id ? "block" : "none" }}
            id={termsMenus[5].id}
          >
            <h2> 4. Risk Disclosure </h2>{" "}
            <p>
              Trading and investing in financial markets involve risks,
              including the potential loss of capital. The AI-driven insights
              and tools provided by Exdex are designed to assist in making
              informed decisions, but they do not guarantee profits. We
              encourage all users to fully understand the risks involved in
              trading and to seek independent financial advice if necessary. It
              is important to trade only with funds that you can afford to lose.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default TermsOfService;

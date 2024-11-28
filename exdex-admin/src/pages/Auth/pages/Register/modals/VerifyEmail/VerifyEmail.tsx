import React from "react";
import classes from "./VerifyEmail.module.scss";
import Modal from "../../../../../../common/Components/Modal/Modal";
import Button from "../../../../../../common/Components/Button/Button";

interface VerifyEmailModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
const VerifyEmailModal: React.FC<VerifyEmailModalProps> = ({
  show,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal show={show} closeBtn={false} closeMethod={onClose}>
      <div className={classes.modalBody}>
        <div className={classes.topImage}>
          <img src="/assets/images/login/tick.png" alt="tick" />
        </div>
        <div className={classes.popHead}>Thank you for Signing Up !</div>
        <div className={classes.description}>
          To continue, please verify the email address you have used to register
          into our platform
        </div>
        <div className={`${classes.btnOuter}`}>
          <Button onClick={onConfirm}>
            <div className={classes.authBtn}>Verify Email</div>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default VerifyEmailModal;

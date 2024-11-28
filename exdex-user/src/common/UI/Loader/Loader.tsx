import styles from "./Loader.module.scss";

const FadeComponent = ({ text = "Loading" , classProps }: { text?: string , classProps? : {text : string} }) => {
  return (
      <div className={styles.fadeWrapper}>
        <div className={styles.fadeContinuous}>
          <img src="/assets/images/loader/logo.png" alt="Logo" />
          <div className={classProps?.text}>{text}</div>
        </div>
      </div>
  );
};

export default FadeComponent;

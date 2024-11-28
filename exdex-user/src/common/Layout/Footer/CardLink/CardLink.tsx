import { LinkProps, NavLink } from "react-router-dom";
import styles from "./CardLink.module.scss";

export interface ICardLink extends LinkProps {
  title: string;
  links: { text: string; to: string; disabled?: boolean; id?: string }[];
}

const CardLink = ({ links, title }: ICardLink) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      {links.map(({ text, to, disabled, id }) =>
        disabled ? (
          <span key={to + text} className="disabledLink">
            {text}
          </span>
        ) : (
          <NavLink key={to + text} to={id ? `${to}?id=${id}` : to}>
            {text}
          </NavLink>
        )
      )}
    </div>
  );
};

export default CardLink;

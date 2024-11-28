import React from "react";
import styles from "./Breadcrumb.module.scss";
import { useNavigate } from "react-router-dom";

export interface BreadcrumbSection {
  label: string;
  link?: string;
}

interface BreadcrumbProps {
  sections: BreadcrumbSection[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ sections }) => {

  const nav = useNavigate()

  return (
    <nav aria-label="breadcrumb">
      <ol className={styles.breadcrumb}>
        {sections.map((section, index) => (
          <li
            key={index}
            className={`${styles.breadcrumbItem} ${
              index === sections.length - 1 ? styles.active : ""
            }`}
          >
            {index === sections.length - 1 || !section.link ? (
               section.label
            ) : (
              <div onClick={()=>{
                nav(section.link as string)
              }} className={styles.link}>{section.label} <span>&gt;</span></div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

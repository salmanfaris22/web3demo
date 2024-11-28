import React from "react";
import styles from "./HelpBreadCrumb.module.scss";
import { useNavigate } from "react-router-dom";

const HelpBreadCrumb = ({
  breadCrumbs,
  className,
}: {
  breadCrumbs: { name: string; url: string }[];
  className?: string;
}) => {
  const navigate = useNavigate();

  return (
    <div className={` ${styles.container} ${className}`}>
      {breadCrumbs.map((c) => {
        return (
          <div
            className={`${styles.links} ${c.url && "cursor"} `}
            onClick={() => {
              if (c.url) {
                navigate(c.url);
              }
            }}
          >
            {c.name}
          </div>
        );
      })}
    </div>
  );
};

export default HelpBreadCrumb;

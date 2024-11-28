import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";

const PaginateIcon = ({ isLeft }: { isLeft?: boolean }) => {
  return (
    <div
      className="page-item"
      style={{ transform: isLeft ? "rotate(180deg)" : "" }}
    >
      <img src="/assets/images/chevron-left.png" alt="Navigation" />
    </div>
  );
};

interface PaginationProps extends ReactPaginateProps {
  containerClassName?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  containerClassName = "CustomPagination",
  ...res
}) => {
  return (
    <>
      {res.pageCount > 1 && (
        <div>
          <ReactPaginate
            containerClassName={containerClassName}
            pageClassName={"page-item"}
            activeClassName={"active"}
            breakClassName="break"
            previousLabel={<PaginateIcon />}
            nextLabel={<PaginateIcon isLeft />}
            breakLabel="..."
            onPageChange={(s) => {
              if (res.onPageChange) res.onPageChange(s);
            }}
            {...res}
          />
        </div>
      )}
    </>
  );
};

export default Pagination;

import { ReactPaginateProps } from "react-paginate";
import Pagination from "../Pagination/Pagination";
import classes from "./Table2.module.scss";
interface TableProps {
  children: React.ReactNode;
  pageProps?: ReactPaginateProps;
  hasPagination?: boolean;
  isFixed?: boolean;
}
const Table2: React.FC<TableProps> = ({
  children,
  pageProps,
  hasPagination = false,
  isFixed = false,
}) => {
  return (
    <>
      <table className={`${classes.table2} ${isFixed && classes.isFixed}`}>
        {children}
      </table>
      {hasPagination && (
        <div className={classes.tablePag}>
          <Pagination {...(pageProps as ReactPaginateProps)} />
        </div>
      )}
    </>
  );
};

export default Table2;

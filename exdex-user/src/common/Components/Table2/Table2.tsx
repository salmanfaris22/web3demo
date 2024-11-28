import classes from "./Table2.module.scss";
interface TableProps {
  children: React.ReactNode;
  theme?: string;
}
const Table2: React.FC<TableProps> = ({ children, theme }) => {
  return (
   <div className={classes.tableOut}>
     <table className={`${classes.table2} ${theme ? classes[theme] : ""}`}>
      {children}
    </table>
   </div>
  );
};

export default Table2;

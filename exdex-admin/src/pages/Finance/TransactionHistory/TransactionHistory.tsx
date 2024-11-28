import React, { useEffect } from "react";
import styles from "./TransactionHistory.module.scss";
import FInanceWrapper from "../FinanceWrapper/FInanceWrapper";
import useApi from "../../../hooks/useAPI";
import { getTxnHistory } from "../../../services/finance";
import Table2 from "../../../common/Components/Table2/Table2";
import { convertISOToCustomFormat, formatDate } from "../../../utils/date";
import DataError from "../../../common/UI/DataError/DataError";
import Loader from "../../../common/UI/Loader/Loader";
import NoDataFound from "../../../common/UI/NoDataFound/NoDataFound";
import { formatCurrency } from "../../../utils/currencyFormatter";

const TransactionHistory = ({
  data,
  error,
  loading,
  onReload,
}: {
  data: any[];
  loading: boolean;
  error: boolean;
  onReload: () => void;
}) => {
  const getStatusClass = (status: "PENDING" | "FAILED" | "SUCCESSFUL") => {
    if (status === "FAILED") {
      return styles.failed;
    }
    if (status === "PENDING") {
      return styles.pending;
    }
    if (status === "SUCCESSFUL") {
      return styles.success;
    }
  };

  return (
    <FInanceWrapper>
      <div className={styles.container}>
        {loading && <Loader />}
        {error && (
          <DataError
            btnProps={{
              onClick: () => {
                onReload();
              },
            }}
            title="Something went wrong"
            btnLabel="Reload Transactions"
          />
        )}
        {!loading && !error && (
          <Table2 isFixed={true}>
            {" "}
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Account No.</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Team</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((x: any, i: number) => {
                return (
                  <tr key={x.id}>
                    <td>{i + 1}</td>
                    <td>{x?.to_user_name}</td>
                    <td>{x.to_account}</td>
                    <td>{convertISOToCustomFormat(x.date)}</td>
                    <td title={x.amount}>{formatCurrency(x.amount)}</td>
                    <td>{x.team}</td>
                    <td>
                      <div
                        className={`${styles.status} ${getStatusClass(
                          x.status
                        )} `}
                      >
                        {x.status.charAt(0).toUpperCase() +
                          x.status.slice(1).toLowerCase()}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {data?.length === 0 && (
                <tr>
                  <td colSpan={3}>
                    <NoDataFound title={`Sorry No Transactions`} />
                  </td>
                </tr>
              )}
            </tbody>
          </Table2>
        )}
      </div>
    </FInanceWrapper>
  );
};

export default TransactionHistory;

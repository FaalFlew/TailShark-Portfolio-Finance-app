import { Result } from "@/Types/apiTypes";
import { getIncomeStatement } from "../../Api/companyDataApi";
import { CompanyIncomeStatement } from "../../Types/company";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { handleApiResponse } from "../../Utils/apiResponseHandler";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";
import { incomeStatementConfig } from "../../Utils/companyTableConfigs";
import { fetchData, incomeStatementStore, saveData } from "../../Utils/DB/DB";
import { filterPropsObjArr } from "../../Utils/DB/DataMethods";
import { incomeStatementProperties } from "../../Utils/DB/DataProperties";

type Props = {};

const IncomeStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [incomeStatement, setIncomeStatement] = useState<CompanyIncomeStatement[]>();
  const [serverError, setServerError] = useState<string>("");

  useEffect(() => {
    const incomeStatementFetch = async () => {
      try {
        const cachedData = await fetchData<CompanyIncomeStatement[]>(incomeStatementStore, ticker);
        if (cachedData) {
          setIncomeStatement(cachedData);
        } else {
          const response = await getIncomeStatement(ticker);
          const result = handleApiResponse(response);
          if (result.error) {
            setServerError(result.error);
          } else if (result.data) {
            const data = result.data;
            const storeData = filterPropsObjArr(incomeStatementProperties, data);

            setIncomeStatement(data);
            await saveData(incomeStatementStore, ticker,storeData);
          }
        }
      } catch (error) {
        console.error("Error fetching balance sheet:", error);
        setServerError("Error fetching balance sheet.");
      }
    };

    incomeStatementFetch();
  }, [ticker]);

  return (
    <div>
      <h2>Income statement</h2>

      {incomeStatement ? (
        <>
          <Table config={incomeStatementConfig} data={incomeStatement} />
        </>
      ) : (
        <>
          <p>{serverError}</p>
          <Spinner isLoading={true} />
        </>
      )}
    </div>
  );
};

export default IncomeStatement;

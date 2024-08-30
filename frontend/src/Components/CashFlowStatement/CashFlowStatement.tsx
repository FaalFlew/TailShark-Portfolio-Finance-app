import { handleApiResponse } from "../../Utils/apiResponseHandler";
import { getCashFlowStatement } from "../../Api/companyDataApi";
import { CompanyCashFlow } from "../../Types/company";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";
import { cashFlowConfig } from "../../Utils/companyTableConfigs";
import { cashFlowStore, fetchData, saveData } from "../../Utils/DB/DB";
import { cashFlowProperties } from "../../Utils/DB/DataProperties";
import { filterPropsObjArr } from "../../Utils/DB/DataMethods";
import { CustomError } from "../../Helpers/AxiosErrorHandler";

type Props = {};

const CashFlowStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [serverError, setServerError] = useState<CustomError>();
  const [cashFlowData, setCashFlowData] = useState<CompanyCashFlow[]>();

  useEffect(() => {
    const getCompanyCashFlow = async () => {
      try {
        const cachedData = await fetchData<CompanyCashFlow[]>(cashFlowStore, ticker);
        if (cachedData) {
          setCashFlowData(cachedData);
        } else {
          const response = await getCashFlowStatement(ticker);
          const result = handleApiResponse(response);
          if (result instanceof CustomError) {
            setServerError(result);
          } else if (result.data) {
            const data = result.data;
            const storeData = filterPropsObjArr(cashFlowProperties, data);
            console.log(storeData)
            setCashFlowData(data);
            await saveData(cashFlowStore, ticker,storeData);
          }
        }
      } catch (error) {
        console.error("Error fetching balance sheet:", error);
      }
    };
    getCompanyCashFlow();
  }, [ticker]);

  return (
    <>
      <h2>Cash flow</h2>

      {cashFlowData ? (
        <div>
          <Table config={cashFlowConfig} data={cashFlowData} />
        </div>
      ) : (
        <>
          <p>{serverError?.message}</p>
          <Spinner isLoading={true} />
        </>
      )}
    </>
  );
};

export default CashFlowStatement;

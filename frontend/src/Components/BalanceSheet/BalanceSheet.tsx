import { useOutletContext } from "react-router-dom";
import { CompanyBalanceSheet } from "../../Types/company";
import React, { useEffect, useState } from "react";
import { getBalanceSheet } from "../../Api/companyDataApi";
import { handleApiResponse } from "../../Utils/apiResponseHandler";
import RatioList from "../RatioList/RatioList";
import Spinner from "../Spinner/Spinner";
import { balanceSheetConfig } from "../../Utils/companyTableConfigs";
import { filterPropsObj} from "../../Utils/DB/DataMethods";
import { balanceSheetProperties} from "../../Utils/DB/DataProperties";

import { fetchData, saveData, balanceSheetStore } from "../../Utils/DB/DB";

type Props = {};



const BalanceSheet = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [serverError, setServerError] = useState<string>("");
  const [balanceSheet, setBalanceSheetData] = useState<CompanyBalanceSheet>();

  useEffect(() => {
    const getCompanyBalanceSheet = async () => {
      try {
        const cachedData = await fetchData<CompanyBalanceSheet>(balanceSheetStore, ticker);
        if (cachedData) {
          setBalanceSheetData(cachedData);
        } else {
          const response = await getBalanceSheet(ticker);
          const result = handleApiResponse(response);
          if (result.error) {
            setServerError(result.error);
          } else if (result.data) {
            const data = result.data[0];
            const storeData = filterPropsObj(balanceSheetProperties, data)
            setBalanceSheetData(data);
            await saveData(balanceSheetStore, ticker,storeData);
          }
        }
      } catch (error) {
        console.error("Error fetching balance sheet:", error);
        setServerError("Error fetching balance sheet.");
      }
    };
    getCompanyBalanceSheet();
  }, [ticker]);

  return (
    <>      
    <h2>Balance sheet</h2>
      {balanceSheet ? (
        <RatioList config={balanceSheetConfig} data={balanceSheet} />
      ) : (
        <>
          <p>{serverError}</p>
          <Spinner isLoading={true} />
        </>
      )}
    </>
  );
};

export default BalanceSheet;

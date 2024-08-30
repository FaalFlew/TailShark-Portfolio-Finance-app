import { CompanyTenK } from "../../Types/company";
import React, { useEffect, useState } from "react";
import { getTenK } from "../../Api/companyDataApi";
import { handleApiResponse } from "../../Utils/apiResponseHandler";
import TenKFinderItem from "./TenKFinderItem/TenKFinderItem";
import Spinner from "../Spinner/Spinner";
import "./TenKFinder.css"
import { companyTenKStore, fetchData, saveData } from "../../Utils/DB/DB";
import { CustomError } from "../../Helpers/AxiosErrorHandler";
type Props = {
  ticker: string | undefined;
};

const TenKFinder = ({ ticker }: Props) => {
  const [serverError, setServerError] = useState<CustomError>();
  const [companyTenK, setCompanyTenK] = useState<CompanyTenK[]>([]);
  useEffect(() => {
    const getTenKData = async () => {
      try {
        const cachedData = await fetchData<CompanyTenK[]>(companyTenKStore, ticker!);
        if (cachedData) {
          setCompanyTenK(cachedData);
          console.log(companyTenK)
        } else {
          const response = await getTenK(ticker!);
          const result = handleApiResponse(response);
          if (result instanceof CustomError) {
            setServerError(result);
          } else if (result.data) {
            const data = result.data;
            const storeData = data.slice(0,4);
            setCompanyTenK(data);
            await saveData(companyTenKStore, ticker!,storeData);

          }
        }
      } catch (error) {
        console.error("Error fetching balance sheet:", error);
      }
    };
    getTenKData();
  }, [ticker]);
  return (
    <div className="tenkfinder-container">
      {companyTenK ? (
        companyTenK?.slice(0, 4).map((tenK: CompanyTenK) => {
          return <TenKFinderItem tenK={tenK} />;
        })
      ) : (
        <>
          <p>{serverError?.message}</p>
          <Spinner isLoading={true} />
        </>
      )}
    </div>
  );
};

export default TenKFinder;

import { CompanyTenK } from "../../Types/company";
import React, { useEffect, useState } from "react";
import { getTenK } from "../../Api/companyDataApi";
import { handleApiResponse } from "../../Utils/apiResponseHandler";
import TenKFinderItem from "./TenKFinderItem/TenKFinderItem";
import Spinner from "../Spinner/Spinner";
import "./TenKFinder.css"
type Props = {
  ticker: string;
};

const TenKFinder = ({ ticker }: Props) => {
  const [serverError, setServerError] = useState<string>("");
  const [companyTenK, setCompanyTenK] = useState<CompanyTenK[]>([]);
  useEffect(() => {
    const getTenKData = async () => {
      const cachedData = localStorage.getItem(`tenKData_${ticker}`);
      if (cachedData) {
        setCompanyTenK(JSON.parse(cachedData));
      } else {
        const response = await getTenK(ticker);
        const result = handleApiResponse(response);
        if (result.error) {
          setServerError(result.error);
        } else if (result.data) {
          setCompanyTenK(result.data);
          localStorage.setItem(
            `tenKData_${ticker}`,
            JSON.stringify(result.data)
          );
        }
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
          <p>{serverError}</p>
          <Spinner isLoading={true} />
        </>
      )}
    </div>
  );
};

export default TenKFinder;

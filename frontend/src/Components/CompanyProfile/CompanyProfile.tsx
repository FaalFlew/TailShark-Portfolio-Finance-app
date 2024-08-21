import { getKeyMetrics } from "../../Api/companyDataApi";
import { CompanyKeyMetrics } from "../../Types/company";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import RatioList from "../RatioList/RatioList";
import { handleApiResponse } from "../../Utils/apiResponseHandler";
import Spinner from "../Spinner/Spinner";
import { profileConfig } from "../../Utils/companyTableConfigs";
import { companyKeyMetricStore, fetchData, saveData } from "../../Utils/DB/DB";
import { filterPropsObj } from "../../Utils/DB/DataMethods";
import { profileProperties } from "../../Utils/DB/DataProperties";

type Props = {};

const CompanyProfile = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [serverError, setServerError] = useState<string>("");
  const [companyKeyMetrics, setCompanyKeyMetrics] = useState<CompanyKeyMetrics>();

  useEffect(() => {
    const getCompanyKeyMetrics = async () => {
      try {
        const cachedData = await fetchData<CompanyKeyMetrics>(companyKeyMetricStore, ticker);
        if (cachedData) {
          setCompanyKeyMetrics(cachedData);
        } else {
          const response = await getKeyMetrics(ticker);
          const result = handleApiResponse(response);
          if (result.error) {
            setServerError(result.error);
          } else if (result.data) {
            const data = result.data[0];
            data.symbol = ticker
            const storeData = filterPropsObj(profileProperties, data)
            setCompanyKeyMetrics(data);
            await saveData(companyKeyMetricStore, ticker,storeData);
          }
        }
      } catch (error) {
        console.error("Error fetching companyKeyMetricStore:", error);
        setServerError("Error fetching companyKeyMetricStore.");
      }
    };

    getCompanyKeyMetrics();
  }, [ticker]);

  return (
    <>
      <h2>Company profile</h2>

      {companyKeyMetrics ? (
        <>
          <RatioList data={companyKeyMetrics} config={profileConfig} />
        </>
      ) : (
        <>
          <p>{serverError}</p>
          <Spinner isLoading={true} />
        </>
      )}
    </>
  );
};

export default CompanyProfile;

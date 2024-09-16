import "../../Shared/Css/Global.css";
import "./CompanyPage.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CompanyProfile } from "../../Types/company";
import { getCompanyProfile } from "../../Api/companyDataApi";
import SideBar from "../../Components/SideBar/SideBar";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Tile from "../../Components/Tile/Tile";
import { handleApiResponse } from "../../Utils/apiResponseHandler";
import TenKFinder from "../../Components/TenKFinder/TenKFinder";
import TileContainer from "../../Components/TileContainer/TileContainer";
import { CustomError } from "../../Helpers/AxiosErrorHandler";

interface Props {}

const CompanyPage = (props: Props) => {
  let { ticker } = useParams();
  const [serverError, setServerError] = useState<CustomError>();
  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    const getProfileInit = async () => {
      const response = await getCompanyProfile(ticker!);
      const result = handleApiResponse(response);
      if (result instanceof CustomError) {
        setServerError(result);
      } else if (result.data) {
        setCompany(result.data[0]);
      }
    };

    getProfileInit();
  }, [ticker]);

  return (
    <>
      <SideBar />
      <main id="main">
        <div>
          {company ? (
            <div className="company-container">
              <CompanyDashboard ticker={ticker!}>
                <TileContainer>
                  <Tile
                    title={company.companyName}
                    subTitle={company.price}
                    priceChange={company.changes}
                  />
                  <Tile title="Mkt Cap" subTitle={company.mktCap} />
                  <Tile title="Sector" subTitle={company.sector} />
                </TileContainer>
                <TenKFinder ticker={company.symbol} />
              </CompanyDashboard>
            </div>
          ) : (serverError instanceof CustomError) && (serverError?.code===1000) ? (
            <div className="company-container">
              <CompanyDashboard ticker={ticker!}>
                <TileContainer>
                  <Tile title="Company" subTitle={ticker!} />
                  <Tile title="Sector" />
                  <Tile title="Mkt Cap" />
                </TileContainer>
                <TenKFinder ticker={ticker} />
              </CompanyDashboard>
            </div>
          ) : (
            <h1>Company Data Not Found{`${company}`}</h1>
          )}
        </div>
      </main>
    </>
  );
};

export default CompanyPage;

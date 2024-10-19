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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getProfileInit = async () => {
      setIsLoading(true);
      try {
        const response = await getCompanyProfile(ticker!);
        const result = handleApiResponse(response);
        if (result instanceof CustomError) {
          setServerError(result);
        } else if (result.data) {
          setCompany(result.data[0]);
        }
      } catch (error) {
        console.error("Error fetching balance sheet:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getProfileInit();
  }, [ticker]);
  //if loading
  return (
    <>
      <SideBar />
      <main id="main">
        <div>
          <div className="company-container">
            {isLoading ? (
              <CompanyDashboard ticker={ticker!}>
                <h3>Loading</h3>
                <TileContainer loading={isLoading}>
                  <Tile title="Company" subTitle={ticker!} />
                  <Tile title="Sector" />
                  <Tile title="Mkt Cap" />
                </TileContainer>
                <TenKFinder ticker={ticker} />
              </CompanyDashboard>
            ) : company ? (
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
            ) : serverError instanceof CustomError ? (
              <CompanyDashboard ticker={ticker!}>
                <h3>{serverError.message}</h3>
                <TileContainer>
                  <Tile title="Company" subTitle={ticker!} />
                  <Tile title="Sector" />
                  <Tile title="Mkt Cap" />
                </TileContainer>
                <TenKFinder ticker={ticker} />
              </CompanyDashboard>
            ) : (
              <h3>Company Data Not Found {`${company}`}, please enter a valid symbol from the supported stock exchange's</h3>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default CompanyPage;

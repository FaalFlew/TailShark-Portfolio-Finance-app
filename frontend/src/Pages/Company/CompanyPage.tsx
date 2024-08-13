import "../../Shared/Css/Global.css";
import "./CompanyPage.css"
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

interface Props {}

const CompanyPage = (props: Props) => {
  let { ticker } = useParams();
  const [serverError, setServerError] = useState<string>("");
  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    const getProfileInit = async () => {
      const cachedData = localStorage.getItem(`companyProfile_${ticker}`);
      if (cachedData) {
        setCompany(JSON.parse(cachedData));
      } else {
        const response = await getCompanyProfile(ticker!);
        const result = handleApiResponse(response);
        if (result.error) {
          setServerError(result.error);
        } else if (result.data) {
          setCompany(result.data[0]);
          localStorage.setItem(
            `companyProfile_${ticker}`,
            JSON.stringify(result.data[0])
          );
          console.log(result.data[0]);
        }
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
                <Tile title="Company" subTitle={company.companyName} />
                <Tile title="Price" subTitle={company.price} />
                <Tile title="Sector" subTitle={company.sector} />
                <Tile title="Mkt Cap" subTitle={company.mktCap} />
              </TileContainer>
              <TenKFinder ticker={company.symbol} />
            </CompanyDashboard>
          </div>
        ) : (
          <div> Company not found! {serverError}</div>
        )}{" "}
      </div>
    </main>
    </>
  );
};

export default CompanyPage;

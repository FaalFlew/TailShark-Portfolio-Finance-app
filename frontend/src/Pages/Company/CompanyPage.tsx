import "../../Shared/Css/Global.css";
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
      const response = await getCompanyProfile(ticker!);
      const result = handleApiResponse(response);
      if (result.error) {
        setServerError(result.error);
        console.log(result.error, "sererr");
      } else if (result.data) {
        setCompany(result.data[0]);
        console.log(result.data);
      }
    };

    getProfileInit();
  }, []);

  return (
    <main>
      <div>
        {company ? (
          <div>
            {company.companyName}
            <SideBar />
            <CompanyDashboard ticker={ticker!}>
              <TileContainer>
                <Tile title="Company title" subTitle={company.companyName} />
                <Tile title="Price" subTitle={company.price} />
                <Tile title="Sector" subTitle={company.sector} />
                <Tile title="Market Cap" subTitle={company.mktCap} />
              </TileContainer>
              <TenKFinder ticker={company.symbol} />
            </CompanyDashboard>
          </div>
        ) : (
          <div> Company not found! {serverError}</div>
        )}{" "}
      </div>
    </main>
  );
};

export default CompanyPage;

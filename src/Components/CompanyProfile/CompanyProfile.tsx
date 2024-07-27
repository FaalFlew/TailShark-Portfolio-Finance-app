import { getKeyMetrics } from '../../Api/api';
import { CompanyKeyMetrics } from '../../Types/company';
import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import RatioList from '../RatioList/RatioList';
import { handleApiResponse } from '../../Utils/apiResponseHandler';

type Props = {}

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) => company.marketCapTTM,
    subTitle: "Total value of all a company's shares of stock",
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) => company.currentRatioTTM,
    subTitle:
      "Measures the companies ability to pay short term debt obligations",
  },
  {
    label: "Return On Equity",
    render: (company: CompanyKeyMetrics) => company.roeTTM,
    subTitle:
      "Return on equity is the measure of a company's net income divided by its shareholder's equity",
  },
  {
    label: "Return On Assets",
    render: (company: CompanyKeyMetrics) => company.returnOnTangibleAssetsTTM,
    subTitle:
      "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Free Cashflow Per Share",
    render: (company: CompanyKeyMetrics) => company.freeCashFlowPerShareTTM,
    subTitle:
      "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Book Value Per Share TTM",
    render: (company: CompanyKeyMetrics) => company.bookValuePerShareTTM,
    subTitle:
      "Book value per share indicates a firm's net asset value (total assets - total liabilities) on per share basis",
  },
  {
    label: "Divdend Yield TTM",
    render: (company: CompanyKeyMetrics) => company.dividendYieldTTM,
    subTitle: "Shows how much a company pays each year relative to stock price",
  },
  {
    label: "Capex Per Share TTM",
    render: (company: CompanyKeyMetrics) => company.capexPerShareTTM,
    subTitle:
      "Capex is used by a company to aquire, upgrade, and maintain physical assets",
  },
  {
    label: "Graham Number",
    render: (company: CompanyKeyMetrics) => company.grahamNumberTTM,
    subTitle:
      "This is the upperbouind of the price range that a defensive investor should pay for a stock",
  },
  {
    label: "PE Ratio",
    render: (company: CompanyKeyMetrics) => company.peRatioTTM,
    subTitle:
      "This is the upperbouind of the price range that a defensive investor should pay for a stock",
  },
];

const CompanyProfile = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [serverError, setServerError] = useState<string>('');
  const [companyData, setCompanyData] = useState<CompanyKeyMetrics>();


  useEffect(() => {
    const getCompanyKeyMetrics = async () => {
      const response = await getKeyMetrics(ticker);
      const result = handleApiResponse(response);
      if (result.error) {
        setServerError(result.error);
      } else if(result.data){
        setCompanyData(result.data[0]);
        console.log(result.data[0]);
      }
    };
    getCompanyKeyMetrics();
  }, []);

  return( <>

    {companyData ? (
      <>
      <RatioList data={companyData} config={tableConfig} /> 
      </>
    ) : 
    (
      <>{serverError}Loading...</>

     ) }  
  </>
  )
}

export default CompanyProfile
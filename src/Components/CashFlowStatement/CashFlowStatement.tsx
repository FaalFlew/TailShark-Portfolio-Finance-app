import { handleApiResponse } from '../../Utils/apiResponseHandler';
import { getCashFlowStatement } from '../../Api/api';
import { CompanyCashFlow } from '../../Types/company';
import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router';
import Table from '../Table/Table';
import Spinner from '../Spinner/Spinner';

type Props = {}


const config = [
    {
      label: "Date",
      render: (company: CompanyCashFlow) => company.date,
    },
    {
      label: "Operating Cashflow",
      render: (company: CompanyCashFlow) => company.operatingCashFlow,
    },
    {
      label: "Investing Cashflow",
      render: (company: CompanyCashFlow) =>
        company.netCashUsedForInvestingActivites,
    },
    {
      label: "Financing Cashflow",
      render: (company: CompanyCashFlow) =>
        company.netCashUsedProvidedByFinancingActivities,
    },
    {
      label: "Cash At End of Period",
      render: (company: CompanyCashFlow) => company.cashAtEndOfPeriod,
    },
    {
      label: "CapEX",
      render: (company: CompanyCashFlow) => company.capitalExpenditure,
    },
    {
      label: "Issuance Of Stock",
      render: (company: CompanyCashFlow) => company.commonStockIssued,
    },
    {
      label: "Free Cash Flow",
      render: (company: CompanyCashFlow) => company.freeCashFlow,
    },
  ];

const CashFlowStatement = (props: Props) => {
    const ticker = useOutletContext<string>()
    const [serverError,setServerError] = useState<string>();
    const [cashFlowData, setCashFlowData] = useState<CompanyCashFlow[]>()

    useEffect(() =>{
        const getCompanyCashFlow = async () => {
          const cachedData = localStorage.getItem(`cashFlow_${ticker}`);
          if (cachedData) {
            setCashFlowData(JSON.parse(cachedData));
          } else {
            const response = await getCashFlowStatement(ticker!);
            const result = handleApiResponse(response);
            if (result.error) {
                setServerError(result.error);
              } else if(result.data){
                setCashFlowData(result.data);
                localStorage.setItem(`cashFlow_${ticker}`, JSON.stringify(result.data));
              }
        }
      };
        getCompanyCashFlow();
    },[ticker]);
    return (<>
 {cashFlowData ? (<div><Table config={config} data={cashFlowData} /></div>) 
    : 
    (  <><p>{serverError}</p>
       <Spinner isLoading={true} /></>)
    }
    </>
  )
}

export default CashFlowStatement
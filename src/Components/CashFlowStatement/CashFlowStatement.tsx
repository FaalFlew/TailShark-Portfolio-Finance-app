import { handleApiResponse } from '../../Utils/apiResponseHandler';
import { getCashFlowStatement } from '../../Api/api';
import { CompanyCashFlow } from '../../Types/company';
import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router';
import Table from '../Table/Table';
import Spinner from '../Spinner/Spinner';
import { cashFlowConfig } from '../../Utils/companyTableConfigs';

type Props = {}

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
 {cashFlowData ? (<div><Table config={cashFlowConfig} data={cashFlowData} /></div>) 
    : 
    (  <><p>{serverError}</p>
       <Spinner isLoading={true} /></>)
    }
    </>
  )
}

export default CashFlowStatement